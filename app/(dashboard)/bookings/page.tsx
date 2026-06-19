import { BookingsSection } from "@/components/dashboard/sections/bookings-section";

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <BookingsSection searchParams={searchParams} />;
}
