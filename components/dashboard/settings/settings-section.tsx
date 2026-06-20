import type { SubscriptionStatus } from "@/db/schema";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { ManageSubscriptionButton } from "@/components/dashboard/settings/manage-subscription-button";
import { Panel } from "@/components/ui/primitives";
import { formatLongDate } from "@/lib/booking/format-datetime";

const STATUS_LABELS: Record<SubscriptionStatus, string> = {
  active: "Activa",
  trialing: "Periodo de prueba",
  past_due: "Pago pendiente",
  canceled: "Cancelada",
  unpaid: "Impagada",
};

export function SettingsSection({
  subscriptionStatus,
  subscriptionCurrentPeriodEnd,
  subscriptionCancelAtPeriodEnd,
}: {
  subscriptionStatus: SubscriptionStatus | null;
  subscriptionCurrentPeriodEnd: Date | null;
  subscriptionCancelAtPeriodEnd: boolean | null;
}) {
  const isCanceling = subscriptionCancelAtPeriodEnd === true;
  const renewalDate = formatLongDate(subscriptionCurrentPeriodEnd);
  const statusLabel = subscriptionStatus
    ? STATUS_LABELS[subscriptionStatus]
    : "Sin suscripcion";

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <DashboardPageHeader
        description="Consulta el estado de tu suscripcion y gestiona pagos en Stripe."
        title="Facturacion"
      />

      <div className="flex-1 overflow-auto p-unit-lg">
        <div className="mx-auto max-w-3xl space-y-6">
          <Panel className="space-y-6 p-6">
            <dl className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <dt className="font-body text-body-sm text-on-surface-variant">Plan</dt>
                <dd className="font-body text-body-md text-on-surface">Landora</dd>
              </div>
              <div className="space-y-1">
                <dt className="font-body text-body-sm text-on-surface-variant">Estado</dt>
                <dd className="font-body text-body-md text-on-surface">{statusLabel}</dd>
              </div>
              <div className="space-y-1">
                <dt className="font-body text-body-sm text-on-surface-variant">
                  {isCanceling ? "Acceso hasta" : "Proxima renovacion"}
                </dt>
                <dd className="font-body text-body-md text-on-surface">{renewalDate}</dd>
              </div>
            </dl>

            {isCanceling ? (
              <p className="font-body text-body-sm text-on-surface-variant">
                Tu suscripcion se cancelara el {renewalDate}. Puedes reactivarla desde el
                portal de Stripe.
              </p>
            ) : null}

            <ManageSubscriptionButton />
          </Panel>
        </div>
      </div>
    </div>
  );
}
