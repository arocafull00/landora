import { redirect } from "next/navigation";
import { BookingsSection } from "@/components/dashboard/sections/bookings-section";
import { requireBookingModuleAccessForCurrentUser } from "@/lib/require-booking-module-access";

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) redirect("/booking-upgrade");

  return <BookingsSection searchParams={searchParams} />;
}
