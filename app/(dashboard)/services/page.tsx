import { redirect } from "next/navigation";
import { ServicesSection } from "@/components/dashboard/sections/services-section";
import { requireBookingModuleAccessForCurrentUser } from "@/lib/require-booking-module-access";

export default async function ServicesPage() {
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) redirect("/booking-upgrade");

  return <ServicesSection />;
}
