import { DashboardSectionLoadingSkeleton } from "@/components/dashboard/dashboard-section-loading-skeleton";

export default function BlockedPeriodsLoading() {
  return (
    <DashboardSectionLoadingSkeleton
      title="Bloqueos"
      description="Bloquea horarios globalmente o por empleado."
    />
  );
}
