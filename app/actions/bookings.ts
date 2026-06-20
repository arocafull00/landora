"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { randomBytes } from "crypto";
import { z } from "zod";
import { db } from "@/db";
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
import { requireBookingModuleAccessForCurrentUser } from "@/lib/require-booking-module-access";
import type { BookingStatus } from "@/db/schema";

const createBookingSchema = z.object({
  slug: z.string().trim().min(1),
  serviceId: z.string().uuid(),
  employeeId: z.union([z.string().uuid(), z.literal("any")]),
  startsAt: z.string().datetime(),
  customerName: z.string().trim().min(1).max(120),
  customerPhone: z.string().trim().min(5).max(30),
  customerEmail: z.string().email().optional().or(z.literal("")),
  notes: z.string().max(500).optional(),
  turnstileToken: z.string().min(1),
  honeypot: z.string().optional(),
});

type ActionResult = { publicToken: string } | { error: string };

function getClientIp(headerStore: Headers) {
  return headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

export async function createBookingAction(
  input: z.infer<typeof createBookingSchema>,
): Promise<ActionResult> {
  try {
    if (input.honeypot?.trim()) {
      return { error: "Solicitud inválida" };
    }

    const parsed = createBookingSchema.safeParse(input);
    if (!parsed.success) {
      return { error: "Datos inválidos" };
    }

    const headerStore = await headers();
    const ip = getClientIp(headerStore);

    const tenant = await resolveTenantBySlug(parsed.data.slug);
    if (!tenant || !tenant.enabled) {
      return { error: "Reservas no disponibles" };
    }

    const rateLimit = await checkBookingRateLimit(ip, tenant.tenantId);
    if (!rateLimit.success) {
      return { error: "Demasiadas solicitudes. Inténtalo más tarde." };
    }

    const turnstileOk = await verifyTurnstileToken(parsed.data.turnstileToken, ip);
    if (!turnstileOk) {
      return { error: "Verificación de seguridad fallida" };
    }

    const service = await getBookingServiceById(tenant.tenantId, parsed.data.serviceId);
    if (!service || !service.isActive) {
      return { error: "Servicio no disponible" };
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
      return { error: "Horario no disponible" };
    }

    const employeeId = matchingSlot.employeeId;
    const employee = await getEmployeeById(tenant.tenantId, employeeId);
    if (!employee) {
      return { error: "Profesional no disponible" };
    }

    const endsAt = addMinutes(startsAt, service.durationMinutes);
    const publicToken = randomBytes(24).toString("base64url");
    const status: BookingStatus = settings.autoConfirmBookings ? "confirmed" : "pending";

    const booking = await db.transaction(async (tx) => {
      const recheckSlots = await getAvailableSlots({
        tenantId: tenant.tenantId,
        serviceId: parsed.data.serviceId,
        employeeId: parsed.data.employeeId,
        date,
        timezone: tenant.timezone,
      });

      const stillAvailable = recheckSlots.some(
        (slot) =>
          slot.startsAt.getTime() === startsAt.getTime() &&
          slot.employeeId === employeeId,
      );

      if (!stillAvailable) {
        throw new Error("slot_taken");
      }

      return createBookingRecord(tx, {
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
    });

    try {
      await sendBookingNotification(booking, employee, tenant.timezone);
    } catch {
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
    } catch {
    }

    return { publicToken: booking.publicToken };
  } catch (error) {
    if (error instanceof Error && error.message === "slot_taken") {
      return { error: "Ese horario acaba de ser reservado" };
    }
    if (error instanceof Error) {
      console.error("[booking] createBookingAction error:", error);
      return { error: `No se pudo crear la reserva: ${error.message}` };
    }
    console.error("[booking] createBookingAction error:", error);
    return { error: "No se pudo crear la reserva" };
  }
}

type StatusActionResult = { success: true } | { error: string };

const statusTransitions: Record<BookingStatus, BookingStatus[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
};

async function changeBookingStatus(
  tenantId: string,
  id: string,
  nextStatus: BookingStatus,
): Promise<StatusActionResult> {
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
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) return { error: access.error };
  return changeBookingStatus(access.tenantId, id, "confirmed");
}

export async function completeBookingAction(id: string): Promise<StatusActionResult> {
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) return { error: access.error };
  return changeBookingStatus(access.tenantId, id, "completed");
}

export async function cancelBookingAction(id: string): Promise<StatusActionResult> {
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) return { error: access.error };
  return changeBookingStatus(access.tenantId, id, "cancelled");
}
