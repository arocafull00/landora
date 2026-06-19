"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import type { BookingService } from "@/db/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  deleteBookingServiceAction,
  updateBookingServiceAction,
} from "@/app/actions/booking-services";
import { parseEurosToPriceCents } from "@/lib/service-price";
import { useBookingServicesStore } from "@/stores/booking-services-store";

export function ServiceEditForm() {
  const router = useRouter();
  const editingService = useBookingServicesStore((s) => s.editingService);
  const editName = useBookingServicesStore((s) => s.editName);
  const editDurationMinutes = useBookingServicesStore((s) => s.editDurationMinutes);
  const editPriceEuros = useBookingServicesStore((s) => s.editPriceEuros);
  const editBufferAfterMinutes = useBookingServicesStore((s) => s.editBufferAfterMinutes);
  const editIsActive = useBookingServicesStore((s) => s.editIsActive);
  const closeEdit = useBookingServicesStore((s) => s.closeEdit);
  const setEditName = useBookingServicesStore((s) => s.setEditName);
  const setEditDurationMinutes = useBookingServicesStore((s) => s.setEditDurationMinutes);
  const setEditPriceEuros = useBookingServicesStore((s) => s.setEditPriceEuros);
  const setEditBufferAfterMinutes = useBookingServicesStore((s) => s.setEditBufferAfterMinutes);
  const setEditIsActive = useBookingServicesStore((s) => s.setEditIsActive);
  const updateService = useBookingServicesStore((s) => s.updateService);
  const removeService = useBookingServicesStore((s) => s.removeService);
  const [pending, startTransition] = useTransition();

  if (!editingService) {
    return null;
  }

  const submit = () => {
    const priceCents = parseEurosToPriceCents(editPriceEuros);
    if (priceCents === null) {
      toast.error("Precio inválido");
      return;
    }

    startTransition(async () => {
      const result = await updateBookingServiceAction(editingService.id, {
        name: editName,
        durationMinutes: Number(editDurationMinutes),
        priceCents,
        bufferAfterMinutes: Number(editBufferAfterMinutes),
        isActive: editIsActive,
      });
      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      toast.success("Servicio actualizado");
      updateService({
        ...editingService,
        name: editName,
        durationMinutes: Number(editDurationMinutes),
        priceCents,
        bufferAfterMinutes: Number(editBufferAfterMinutes),
        isActive: editIsActive,
        updatedAt: new Date(),
      });
      closeEdit();
      router.refresh();
    });
  };

  const remove = () => {
    startTransition(async () => {
      const result = await deleteBookingServiceAction(editingService.id);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      removeService(editingService.id);
      toast.success("Servicio eliminado");
      closeEdit();
      router.refresh();
    });
  };

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label className="font-body text-body-sm font-medium text-on-surface" htmlFor="service-edit-name">
          Nombre
        </label>
        <Input
          id="service-edit-name"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          disabled={pending}
        />
      </div>

      <div className="space-y-2">
        <label className="font-body text-body-sm font-medium text-on-surface" htmlFor="service-edit-duration">
          Duración
        </label>
        <div className="flex items-center gap-2">
          <Input
            id="service-edit-duration"
            type="number"
            min={5}
            max={480}
            value={editDurationMinutes}
            onChange={(e) => setEditDurationMinutes(e.target.value)}
            disabled={pending}
            className="w-24"
          />
          <span className="font-body text-body-sm text-on-surface-variant">min</span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-body text-body-sm font-medium text-on-surface" htmlFor="service-edit-price">
          Precio
        </label>
        <div className="flex items-center gap-2">
          <Input
            id="service-edit-price"
            inputMode="decimal"
            placeholder="15"
            value={editPriceEuros}
            onChange={(e) => setEditPriceEuros(e.target.value)}
            disabled={pending}
            className="w-24"
          />
          <span className="font-body text-body-sm text-on-surface-variant">€</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="font-body text-body-sm font-medium text-on-surface">Estado</span>
        <div className="flex items-center gap-2">
          <Switch checked={editIsActive} disabled={pending} onCheckedChange={setEditIsActive} />
          <span className="font-body text-body-sm text-on-surface-variant">
            {editIsActive ? "Activo" : "Inactivo"}
          </span>
        </div>
      </div>

      <details className="group">
        <summary className="cursor-pointer font-body text-body-sm text-primary">
          Opciones avanzadas
        </summary>
        <div className="mt-3 space-y-2">
          <label
            className="font-body text-body-sm font-medium text-on-surface"
            htmlFor="service-edit-buffer"
          >
            Margen posterior
          </label>
          <div className="flex items-center gap-2">
            <Input
              id="service-edit-buffer"
              type="number"
              min={0}
              max={120}
              value={editBufferAfterMinutes}
              onChange={(e) => setEditBufferAfterMinutes(e.target.value)}
              disabled={pending}
              className="w-24"
            />
            <span className="font-body text-body-sm text-on-surface-variant">min</span>
          </div>
        </div>
      </details>

      <div className="space-y-2 border-t border-outline-variant pt-5">
        <Button onClick={submit} disabled={pending || !editName.trim()} className="w-full">
          Guardar
        </Button>
        <Button variant="destructive" onClick={remove} disabled={pending} className="w-full">
          Eliminar
        </Button>
      </div>
    </div>
  );
}
