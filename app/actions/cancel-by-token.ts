"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { getBookingByPublicToken, updateBookingStatusByToken } from "@/data/bookings";
import { checkCancelRateLimit } from "@/lib/booking/rate-limit";
import { captureBookingEvent } from "@/lib/booking/capture-event";

type ActionResult = { success: true } | { error: string };

function getClientIp(headerStore: Headers) {
  return headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

export async function cancelBookingByTokenAction(publicToken: string): Promise<ActionResult> {
  const headerStore = await headers();
  const ip = getClientIp(headerStore);

  const rateLimit = await checkCancelRateLimit(ip);
  if (!rateLimit.success) {
    return { error: "Demasiadas solicitudes. Inténtalo más tarde." };
  }

  const booking = await getBookingByPublicToken(publicToken);
  if (!booking) {
    return { error: "Reserva no encontrada" };
  }

  if (booking.status === "cancelled") {
    return { error: "La reserva ya está cancelada" };
  }

  if (booking.status === "completed") {
    return { error: "No se puede cancelar una reserva completada" };
  }

  if (booking.startsAt.getTime() < Date.now()) {
    return { error: "No se puede cancelar una reserva pasada" };
  }

  try {
    await updateBookingStatusByToken(publicToken, "cancelled");
    revalidatePath(`/reservation/${publicToken}`);

    try {
      await captureBookingEvent("booking_cancelled_by_customer", booking.tenantId, {
        bookingId: booking.id,
      });
    } catch {
    }

    return { success: true };
  } catch {
    return { error: "No se pudo cancelar la reserva" };
  }
}
