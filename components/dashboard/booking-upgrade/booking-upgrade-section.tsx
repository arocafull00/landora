"use client";

import { Check } from "lucide-react";
import { toast } from "react-toastify";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/primitives";

const FEATURES = [
  "Reservas online 24/7",
  "Gestión de empleados",
  "Horarios personalizados",
  "Bloqueo de fechas",
  "Agenda centralizada",
] as const;

export function BookingUpgradeSection({ paymentLink }: { paymentLink: string | null }) {
  function handleActivate() {
    if (!paymentLink) {
      toast.error("No se pudo abrir el checkout de Stripe");
      return;
    }

    window.location.href = paymentLink;
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <DashboardPageHeader
        description="Activa el módulo de reservas para gestionar citas, servicios y empleados desde tu dashboard."
        title="Sistema de Reservas Online"
      />

      <div className="flex-1 overflow-auto p-unit-lg">
        <div className="mx-auto max-w-3xl">
          <Panel className="space-y-8 p-8">
            <ul className="space-y-4">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-4" aria-hidden="true" />
                  </span>
                  <span className="font-body text-body-md text-on-surface">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-start gap-4 border-t border-outline-variant pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-headline text-headline-md font-semibold text-on-surface">
                25€/mes
              </p>
              <Button disabled={!paymentLink} onClick={handleActivate} size="lg" type="button">
                Activar módulo
              </Button>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
