import Link from "next/link";
import { DashboardSectionLoadingSkeleton } from "@/components/dashboard/dashboard-section-loading-skeleton";
import { Button } from "@/components/ui/button";

export default function BookingsLoading() {
  return (
    <DashboardSectionLoadingSkeleton
      title="Reservas"
      description="Consulta y gestiona las reservas de tu negocio."
      actions={
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/settings/booking">Ajustes</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/settings/blocked-periods">Bloqueos</Link>
          </Button>
        </div>
      }
    />
  );
}
