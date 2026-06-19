"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import type { BookingService } from "@/db/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  deleteBookingServiceAction,
  duplicateBookingServiceAction,
  toggleBookingServiceActiveAction,
} from "@/app/actions/booking-services";
import { useBookingServicesStore } from "@/stores/booking-services-store";
import { MoreHorizontal } from "lucide-react";

export function ServiceActionsMenu({
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={disabled || pending}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={duplicate}>Duplicar servicio</DropdownMenuItem>
        <DropdownMenuItem onClick={toggleActive}>
          {service.isActive ? "Desactivar" : "Activar"}
        </DropdownMenuItem>
        {canMoveUp ? <DropdownMenuItem onClick={onMoveUp}>Mover arriba</DropdownMenuItem> : null}
        {canMoveDown ? <DropdownMenuItem onClick={onMoveDown}>Mover abajo</DropdownMenuItem> : null}
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={remove}>
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
