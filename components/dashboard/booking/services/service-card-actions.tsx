"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import type { BookingService } from "@/lib/domain/dtos";
import { Button } from "@/components/ui/button";
import {
  deleteBookingServiceAction,
  duplicateBookingServiceAction,
  toggleBookingServiceActiveAction,
} from "@/app/actions/booking-services";
import { useBookingServicesStore } from "@/stores/booking-services-store";
import { ArrowDown, ArrowUp, Copy } from "lucide-react";

export function ServiceCardActions({
  service,
  disabled,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
}: {
  service: BookingService;
  disabled: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const router = useRouter();
  const setServiceActive = useBookingServicesStore((s) => s.setServiceActive);
  const removeService = useBookingServicesStore((s) => s.removeService);
  const closeEdit = useBookingServicesStore((s) => s.closeEdit);
  const [pending, startTransition] = useTransition();
  const actionDisabled = disabled || pending;

  const toggleActive = () => {
    const nextActive = !service.isActive;
    startTransition(async () => {
      const result = await toggleBookingServiceActiveAction(service.id, nextActive);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      setServiceActive(service.id, nextActive);
      toast.success(nextActive ? "Servicio activado" : "Servicio desactivado");
      router.refresh();
    });
  };

  const duplicate = () => {
    startTransition(async () => {
      const result = await duplicateBookingServiceAction(service.id);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      toast.success("Servicio duplicado");
      router.refresh();
    });
  };

  const remove = () => {
    startTransition(async () => {
      const result = await deleteBookingServiceAction(service.id);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      removeService(service.id);
      closeEdit();
      toast.success("Servicio eliminado");
      router.refresh();
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" disabled={actionDisabled} onClick={duplicate}>
        <Copy className="h-4 w-4" />
        Duplicar
      </Button>
      <Button variant="outline" size="sm" disabled={actionDisabled} onClick={toggleActive}>
        {service.isActive ? "Desactivar" : "Activar"}
      </Button>
      {canMoveUp ? (
        <Button variant="outline" size="sm" disabled={actionDisabled} onClick={onMoveUp}>
          <ArrowUp className="h-4 w-4" />
          Subir
        </Button>
      ) : null}
      {canMoveDown ? (
        <Button variant="outline" size="sm" disabled={actionDisabled} onClick={onMoveDown}>
          <ArrowDown className="h-4 w-4" />
          Bajar
        </Button>
      ) : null}
      <Button variant="destructive" size="sm" disabled={actionDisabled} onClick={remove}>
        Eliminar
      </Button>
    </div>
  );
}
