import { Resend } from "resend";
import { getBookingSettings } from "@/data/booking-settings";
import { getLandingPageByUserId } from "@/data/landing-pages";
import type { Booking, Employee } from "@/db/schema";
import { formatFullDateTime } from "@/lib/booking/format-datetime";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

async function resolveNotificationEmail(tenantId: string) {
  const settings = await getBookingSettings(tenantId);
  if (settings.notificationEmail.trim()) {
    return settings.notificationEmail.trim();
  }

  const landing = await getLandingPageByUserId(tenantId);
  if (landing?.cta?.email?.trim()) {
    return landing.cta.email.trim();
  }

  return null;
}

export async function sendBookingNotification(
  booking: Booking,
  employee: Employee,
  timezone: string,
) {
  const resend = getResendClient();
  const to = await resolveNotificationEmail(booking.tenantId);
  const from = process.env.RESEND_FROM_EMAIL ?? "reservas@landora.app";

  if (!resend || !to) {
    return;
  }

  const formattedDate = formatFullDateTime(booking.startsAt, timezone);

  await resend.emails.send({
    from,
    to,
    subject: `Nueva reserva: ${booking.customerName}`,
    html: `
      <h2>Nueva reserva</h2>
      <p><strong>Cliente:</strong> ${booking.customerName}</p>
      <p><strong>Teléfono:</strong> ${booking.customerPhone}</p>
      ${booking.customerEmail ? `<p><strong>Email:</strong> ${booking.customerEmail}</p>` : ""}
      <p><strong>Servicio:</strong> ${booking.serviceNameSnapshot}</p>
      <p><strong>Profesional:</strong> ${employee.name}</p>
      <p><strong>Fecha:</strong> ${formattedDate}</p>
      ${booking.notes ? `<p><strong>Notas:</strong> ${booking.notes}</p>` : ""}
    `,
  });
}
