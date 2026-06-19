"use client";

import { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";
import type { BookingService } from "@/db/schema";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/dashboard/booking/services/service-card";
import { ServiceCreateDialog } from "@/components/dashboard/booking/services/service-create-dialog";
import {
  reorderBookingServicesAction,
} from "@/app/actions/booking-services";
import { useBookingServicesStore } from "@/stores/booking-services-store";

export function ServicesSectionClient({ services }: { services: BookingService[] }) {
  const items = useBookingServicesStore((s) => s.services);
  const setServices = useBookingServicesStore((s) => s.setServices);
  const reorderServices = useBookingServicesStore((s) => s.reorderServices);
  const [createOpen, setCreateOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setServices(services);
  }, [services, setServices]);

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) {
      return;
    }

    const next = [...items];
    const temp = next[index];
    next[index] = next[target];
    next[target] = temp;
    reorderServices(next);

    startTransition(async () => {
      const result = await reorderBookingServicesAction(next.map((s) => s.id));
      if ("error" in result) {
        toast.error(result.error);
        setServices(services);
        return;
      }
      toast.success("Orden actualizado");
    });
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <DashboardPageHeader
        title="Servicios"
        description="Carta de servicios con precios, duraciones y disponibilidad."
        actions={
          <Button onClick={() => setCreateOpen(true)} disabled={pending}>
            Nuevo servicio
          </Button>
        }
      />
      <div className="flex-1 overflow-auto p-unit-lg">
        <div className="mx-auto max-w-3xl space-y-4">
          {items.length === 0 ? (
            <p className="font-body text-body-md text-on-surface-variant">
              No hay servicios todavía. Crea el primero para empezar.
            </p>
          ) : (
            items.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                total={items.length}
                disabled={pending}
                onMoveUp={() => move(index, -1)}
                onMoveDown={() => move(index, 1)}
              />
            ))
          )}
        </div>
      </div>
      <ServiceCreateDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}
