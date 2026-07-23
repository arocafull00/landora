import { redirect } from "next/navigation";
import { getBlockedPeriods } from "@/data/blocked-periods";
import { getEmployees } from "@/data/employees";
import { BlockedPeriodsSectionClient } from "@/components/dashboard/booking/blocked-periods/blocked-periods-section-client";
import { requireBookingModuleAccessForCurrentUser } from "@/lib/require-booking-module-access";

export default async function BlockedPeriodsPage() {
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) redirect("/booking-upgrade");

  const [periods, employees] = await Promise.all([
    getBlockedPeriods(access.tenantId),
    getEmployees(access.tenantId),
  ]);

  return <BlockedPeriodsSectionClient periods={periods} employees={employees} />;
}
