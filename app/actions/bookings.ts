"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { randomBytes } from "crypto";
import { getBookingSettings } from "@/data/booking-settings";
import { getBookingServiceById } from "@/data/booking-services";
import { getEmployeeById } from "@/data/employees";
import { createBookingRecord, updateBookingStatus } from "@/data/bookings";
import { getAvailableSlots } from "@/lib/booking/availability";
import { resolveTenantBySlug } from "@/lib/booking/resolve-tenant";
import { checkBookingRateLimit } from "@/lib/booking/rate-limit";
import { verifyTurnstileToken } from "@/lib/booking/turnstile";
import { sendBookingNotification } from "@/lib/booking/send-notification";
import { captureBookingEvent } from "@/lib/booking/capture-event";
import { addMinutes } from "@/lib/booking/overlap";
import { formatDateInTimezone } from "@/lib/booking/timezone";
import { requireAuth } from "@/lib/auth";
import { requireBookingModuleAccessForCurrentUser } from "@/lib/require-booking-module-access";
import { logger } from "@/lib/logger";
import {
  bookingIdSchema,
  createBookingSchema,
} from "@/lib/schemas/booking";
import type { BookingStatus } from "@/lib/domain/dtos";

type ActionErrorStatus = "invalid_input" | "slot_taken" | "failed";

type ActionResult =
  | { status: "created"; publicToken: string }
  | { status: ActionErrorStatus; error: string };

function actionError(status: ActionErrorStatus, error: string): ActionResult {
  return { status, error };
}

function getClientIp(headerStore: Headers) {
  return headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

export async function createBookingAction(
  input: Parameters<typeof createBookingSchema.safeParse>[0],
): Promise<ActionResult> {
  try {
    const parsed = createBookingSchema.safeParse(input);
    if (!parsed.success) {
      return actionError("invalid_input", "Datos inválidos");
    }

    if (parsed.data.honeypot?.trim()) {
      return actionError("invalid_input", "Solicitud inválida");
    }

    const headerStore = await headers();
    const ip = getClientIp(headerStore);

    const tenant = await resolveTenantBySlug(parsed.data.slug);
    if (!tenant || !tenant.enabled) {
      return actionError("failed", "Reservas no disponibles");
    }

    const rateLimit = await checkBookingRateLimit(ip, tenant.tenantId);
    if (!rateLimit.success) {
      return actionError(
        "failed",
        "Demasiadas solicitudes. Inténtalo más tarde.",
      );
    }

    const turnstileResult = await verifyTurnstileToken(
      parsed.data.turnstileToken,
      ip,
    );
    if (!turnstileResult.valid) {
      return actionError("failed", "Verificación de seguridad fallida");
    }

    const service = await getBookingServiceById(tenant.tenantId, parsed.data.serviceId);
    if (!service || !service.isActive) {
      return actionError("invalid_input", "Servicio no disponible");
    }

    const settings = await getBookingSettings(tenant.tenantId);
    const startsAt = new Date(parsed.data.startsAt);
    const date = formatDateInTimezone(startsAt, tenant.timezone);

    const slots = await getAvailableSlots({
      tenantId: tenant.tenantId,
      serviceId: parsed.data.serviceId,
      employeeId: parsed.data.employeeId,
      date,
      timezone: tenant.timezone,
    });

    const matchingSlot = slots.find(
      (slot) => slot.startsAt.getTime() === startsAt.getTime(),
    );

    if (!matchingSlot) {
      return actionError("slot_taken", "Horario no disponible");
    }

    const employeeId = matchingSlot.employeeId;
    const employee = await getEmployeeById(tenant.tenantId, employeeId);
    if (!employee) {
      return actionError("invalid_input", "Profesional no disponible");
    }

    const endsAt = addMinutes(startsAt, service.durationMinutes);
    const publicToken = randomBytes(24).toString("base64url");
    const status: BookingStatus = settings.autoConfirmBookings ? "confirmed" : "pending";

    const createResult = await createBookingRecord({
      tenantId: tenant.tenantId,
      employeeId,
      serviceId: service.id,
      serviceNameSnapshot: service.name,
      durationMinutesSnapshot: service.durationMinutes,
      customerName: parsed.data.customerName,
      customerPhone: parsed.data.customerPhone,
      customerEmail: parsed.data.customerEmail?.trim() || null,
      notes: parsed.data.notes?.trim() ?? "",
      startsAt,
      endsAt,
      status,
      publicToken,
      wasAnyEmployee: parsed.data.employeeId === "any",
    });

    if (createResult.status === "slot_taken") {
      return actionError("slot_taken", "Ese horario acaba de ser reservado");
    }

    const booking = createResult.booking;

    try {
      await sendBookingNotification(booking, employee, tenant.timezone);
    } catch (error) {
      logger.captureException(error, {
        action: "send-booking-notification",
        tenantId: tenant.tenantId,
      });
    }

    try {
      await captureBookingEvent("booking_created", tenant.tenantId, {
        serviceId: service.id,
        employeeId,
        wasAnyEmployee: parsed.data.employeeId === "any",
        autoConfirm: settings.autoConfirmBookings,
        daysAhead: Math.floor(
          (startsAt.getTime() - Date.now()) / (24 * 60 * 60 * 1000),
        ),
      });
    } catch (error) {
      logger.captureException(error, {
        action: "capture-booking-created-event",
        tenantId: tenant.tenantId,
      });
    }

    return { status: "created", publicToken: booking.publicToken };
  } catch (error) {
    logger.captureException(error, { action: "create-booking" });
    return actionError("failed", "No se pudo crear la reserva");
  }
}

type StatusActionResult = { success: true } | { error: string };

async function changeBookingStatus(
  tenantId: string,
  id: string,
  nextStatus: BookingStatus,
): Promise<StatusActionResult> {
  const statusTransitions: Record<BookingStatus, BookingStatus[]> = {
    pending: ["confirmed", "cancelled"],
    confirmed: ["completed", "cancelled"],
    completed: [],
    cancelled: [],
  };

  const { getBookingById } = await import("@/data/bookings");
  const booking = await getBookingById(tenantId, id);
  if (!booking) {
    return { error: "Reserva no encontrada" };
  }

  const allowed = statusTransitions[booking.status];
  if (!allowed.includes(nextStatus)) {
    return { error: "Transición de estado no permitida" };
  }

  try {
    await updateBookingStatus(tenantId, id, nextStatus);
    revalidatePath("/bookings");

    const eventMap: Partial<Record<BookingStatus, string>> = {
      confirmed: "booking_confirmed",
      cancelled: "booking_cancelled",
      completed: "booking_completed",
    };
    const event = eventMap[nextStatus];
    if (event) {
      try {
        await captureBookingEvent(event, tenantId, { bookingId: id });
      } catch {
      }
    }

    return { success: true };
  } catch {
    return { error: "No se pudo actualizar la reserva" };
  }
}

export async function confirmBookingAction(id: string): Promise<StatusActionResult> {
  const parsedId = bookingIdSchema.safeParse(id);
  if (!parsedId.success) return { error: "Reserva no válida" };
  const authResult = await requireAuth();
  if ("error" in authResult) return { error: authResult.error };
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) return { error: access.error };
  return changeBookingStatus(access.tenantId, parsedId.data, "confirmed");
}

export async function completeBookingAction(id: string): Promise<StatusActionResult> {
  const parsedId = bookingIdSchema.safeParse(id);
  if (!parsedId.success) return { error: "Reserva no válida" };
  const authResult = await requireAuth();
  if ("error" in authResult) return { error: authResult.error };
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) return { error: access.error };
  return changeBookingStatus(access.tenantId, parsedId.data, "completed");
}

export async function cancelBookingAction(id: string): Promise<StatusActionResult> {
  const parsedId = bookingIdSchema.safeParse(id);
  if (!parsedId.success) return { error: "Reserva no válida" };
  const authResult = await requireAuth();
  if ("error" in authResult) return { error: authResult.error };
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) return { error: access.error };
  return changeBookingStatus(access.tenantId, parsedId.data, "cancelled");
}
