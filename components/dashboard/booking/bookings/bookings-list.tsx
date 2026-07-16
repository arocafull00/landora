import type { Booking, Employee } from "@/lib/domain/dtos";
import { BookingListRow } from "@/components/dashboard/booking/bookings/booking-list-row";

export function BookingsList({
  bookings,
  timezone,
}: {
  bookings: (Booking & { employee: Employee | null })[];
  timezone: string;
}) {
  if (bookings.length === 0) {
    return (
      <p className="font-body text-body-md text-on-surface-variant">
        No hay reservas con estos filtros.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {bookings.map((booking) => (
        <BookingListRow key={booking.id} booking={booking} timezone={timezone} />
      ))}
    </div>
  );
}
