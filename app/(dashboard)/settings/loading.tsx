import { DashboardSectionLoadingSkeleton } from "@/components/dashboard/dashboard-section-loading-skeleton";

export default function SettingsLoading() {
  return (
    <DashboardSectionLoadingSkeleton
      title="Facturacion"
      description="Consulta el estado de tu suscripcion y gestiona pagos en Stripe."
    />
  );
}
