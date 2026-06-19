import { redirect } from "next/navigation";
import { getEffectiveClientId } from "@/lib/auth";
import { getBlockedPeriods } from "@/data/blocked-periods";
import { getEmployees } from "@/data/employees";
import { BlockedPeriodsSectionClient } from "@/components/dashboard/booking/blocked-periods/blocked-periods-section-client";

export default async function BlockedPeriodsPage() {
  const clientId = await getEffectiveClientId();
  if (!clientId) redirect("/sign-in");

  const [periods, employees] = await Promise.all([
    getBlockedPeriods(clientId),
    getEmployees(clientId),
  ]);

  return <BlockedPeriodsSectionClient periods={periods} employees={employees} />;
}
