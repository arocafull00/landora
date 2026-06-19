import { BookingViewPage } from "@/components/dashboard/booking/booking-view-page";
import { BookingsSection } from "@/components/dashboard/sections/bookings-section";

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <BookingViewPage view="bookings">
      <BookingsSection searchParams={searchParams} />
    </BookingViewPage>
  );
}
