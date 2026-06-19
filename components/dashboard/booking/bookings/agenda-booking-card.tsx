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
  date,
  gridStartHour,
}: {
  booking: Booking;
  timezone: string;
  date: string;
  gridStartHour: number;
}) {
  const zonedStart = toZonedTime(booking.startsAt, timezone);
  const bookingDate = `${zonedStart.getFullYear()}-${String(zonedStart.getMonth() + 1).padStart(2, "0")}-${String(zonedStart.getDate()).padStart(2, "0")}`;

  if (bookingDate !== date) {
    return null;
  }

  const startMinutes = zonedStart.getHours() * 60 + zonedStart.getMinutes();
  const gridStartMinutes = gridStartHour * 60;
  const top = ((startMinutes - gridStartMinutes) / 60) * 64;
  const height = (booking.durationMinutesSnapshot / 60) * 64;

  if (top < 0) {
    return null;
  }

  return (
    <div
      className={`absolute inset-x-1 rounded border px-1 py-0.5 font-body text-body-xs ${STATUS_COLORS[booking.status as BookingStatus]}`}
      style={{ top: `${top}px`, height: `${Math.max(height, 24)}px` }}
    >
      {booking.customerName}
    </div>
  );
}
