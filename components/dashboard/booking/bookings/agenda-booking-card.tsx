import type { Booking, BookingStatus } from "@/db/schema";
import { toZonedTime } from "date-fns-tz";

const STATUS_COLORS: Record<BookingStatus, string> = {
  pending: "bg-amber-200 border-amber-400",
  confirmed: "bg-emerald-200 border-emerald-400",
  completed: "bg-slate-200 border-slate-400",
  cancelled: "bg-rose-200 border-rose-400",
};

export function AgendaBookingCard({
  booking,
  timezone,
}: {
  booking: Booking;
  timezone: string;
}) {
  const zonedStart = toZonedTime(booking.startsAt, timezone);

  const top = (zonedStart.getMinutes() / 60) * 64;
  const height = (booking.durationMinutesSnapshot / 60) * 64;

  return (
    <div
      className={`absolute inset-x-1 rounded border px-1 py-0.5 font-body text-body-xs ${STATUS_COLORS[booking.status as BookingStatus]}`}
      style={{ top: `${top}px`, height: `${Math.max(height, 24)}px` }}
    >
      {booking.customerName}
    </div>
  );
}
