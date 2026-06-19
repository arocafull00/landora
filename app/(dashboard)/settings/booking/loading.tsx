import { DashboardSectionLoadingSkeleton } from "@/components/dashboard/dashboard-section-loading-skeleton";

export default function BookingSettingsLoading() {
  return (
    <DashboardSectionLoadingSkeleton
      title="Ajustes de reservas"
      description="Configura disponibilidad, confirmación y notificaciones."
    />
  );
}
