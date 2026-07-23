import { redirect } from "next/navigation";
import { EmployeesSection } from "@/components/dashboard/sections/employees-section";
import { requireBookingModuleAccessForCurrentUser } from "@/lib/require-booking-module-access";

export default async function EmployeesPage() {
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) redirect("/booking-upgrade");

  return <EmployeesSection />;
}
