"use client";

import { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";
import type { BookingService } from "@/db/schema";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import { ServiceRow } from "@/components/dashboard/booking/services/service-row";
import { ServiceCreateDialog } from "@/components/dashboard/booking/services/service-create-dialog";
import {
  reorderBookingServicesAction,
  toggleBookingServiceActiveAction,
} from "@/app/actions/booking-services";

export function ServicesSectionClient({ services }: { services: BookingService[] }) {
  const [items, setItems] = useState(services);
  const [createOpen, setCreateOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setItems(services);
  }, [services]);

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) {
      return;
    }

    const next = [...items];
    const temp = next[index];
    next[index] = next[target];
    next[target] = temp;
    setItems(next);

    startTransition(async () => {
      const result = await reorderBookingServicesAction(next.map((s) => s.id));
      if ("error" in result) {
        toast.error(result.error);
        setItems(services);
        return;
      }
      toast.success("Orden actualizado");
    });
  };

  const toggleActive = (id: string, isActive: boolean) => {
    startTransition(async () => {
      const result = await toggleBookingServiceActiveAction(id, isActive);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      setItems((current) =>
        current.map((s) => (s.id === id ? { ...s, isActive } : s)),
      );
      toast.success(isActive ? "Servicio activado" : "Servicio desactivado");
    });
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <DashboardPageHeader
        title="Servicios"
        description="Gestiona los servicios disponibles para reservas."
        actions={
          <Button onClick={() => setCreateOpen(true)} disabled={pending}>
            Nuevo servicio
          </Button>
        }
      />
      <div className="flex-1 overflow-auto p-unit-lg">
        <div className="mx-auto max-w-3xl space-y-3">
          {items.length === 0 ? (
            <p className="font-body text-body-md text-on-surface-variant">
              No hay servicios todavía. Crea el primero para empezar.
            </p>
          ) : (
            items.map((service, index) => (
              <ServiceRow
                key={service.id}
                service={service}
                index={index}
                total={items.length}
                disabled={pending}
                onMoveUp={() => move(index, -1)}
                onMoveDown={() => move(index, 1)}
                onToggleActive={(active) => toggleActive(service.id, active)}
                onUpdated={(updated) =>
                  setItems((current) =>
                    current.map((s) => (s.id === updated.id ? updated : s)),
                  )
                }
              />
            ))
          )}
        </div>
      </div>
      <ServiceCreateDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={() => {
          setCreateOpen(false);
        }}
      />
    </div>
  );
}
