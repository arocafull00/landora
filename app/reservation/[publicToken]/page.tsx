import { notFound } from "next/navigation";
import { getBookingByPublicToken } from "@/data/bookings";
import { getBookingSettings } from "@/data/booking-settings";
import { ReservationDetails } from "@/components/booking/reservation-details";

export default async function ReservationPage({
  params,
}: {
  params: Promise<{ publicToken: string }>;
}) {
  const { publicToken } = await params;
  const booking = await getBookingByPublicToken(publicToken);

  if (!booking) {
    notFound();
  }

  const settings = await getBookingSettings(booking.tenantId);

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-bg p-4">
      <ReservationDetails booking={booking} timezone={settings.timezone} />
    </main>
  );
}
