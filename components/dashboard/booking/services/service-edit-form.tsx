"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { BookingCallout } from "@/components/dashboard/booking/booking-callout";
import { BookingCollapsibleSection } from "@/components/dashboard/booking/booking-collapsible-section";
import { BookingDurationField } from "@/components/dashboard/booking/booking-duration-field";
import { BookingEditModalFooter } from "@/components/dashboard/booking/booking-edit-modal-footer";
import { BookingFormField } from "@/components/dashboard/booking/booking-form-field";
import { BookingPriceField } from "@/components/dashboard/booking/booking-price-field";
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
    <div className="flex flex-col gap-6 pt-6">
      <BookingFormField label="Nombre del servicio" htmlFor="service-edit-name">
        <Input
          id="service-edit-name"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          disabled={pending}
        />
      </BookingFormField>

      <Separator />

      <BookingFormField
        label="Duración"
        htmlFor="service-edit-duration"
        description="Tiempo estimado del servicio"
      >
        <BookingDurationField
          id="service-edit-duration"
          value={editDurationMinutes}
          onChange={setEditDurationMinutes}
          disabled={pending}
          min={5}
        />
      </BookingFormField>

      <BookingFormField
        label="Precio"
        htmlFor="service-edit-price"
        description="Precio que paga el cliente"
      >
        <BookingPriceField
          id="service-edit-price"
          value={editPriceEuros}
          onChange={setEditPriceEuros}
          disabled={pending}
        />
      </BookingFormField>

      <Separator />

      <div className="space-y-3">
        <BookingFormField
          label="Estado del servicio"
          description="Activa o desactiva la disponibilidad del servicio"
        >
          <div className="flex items-center gap-2">
            <Switch checked={editIsActive} disabled={pending} onCheckedChange={setEditIsActive} />
            <span className="font-body text-body-sm text-on-surface">
              {editIsActive ? "Activo" : "Inactivo"}
            </span>
          </div>
        </BookingFormField>
        <BookingCallout variant="info">
          Los servicios inactivos no se mostrarán en el sistema de reservas.
        </BookingCallout>
      </div>

      <Separator />

      <BookingCollapsibleSection title="Opciones avanzadas" icon={Settings}>
        <div className="space-y-3">
          <BookingFormField
            label="Margen posterior (opcional)"
            htmlFor="service-edit-buffer"
            description="Tiempo adicional después del servicio antes de la siguiente cita"
          >
            <BookingDurationField
              id="service-edit-buffer"
              value={editBufferAfterMinutes}
              onChange={setEditBufferAfterMinutes}
              disabled={pending}
              max={120}
            />
          </BookingFormField>
          <BookingCallout variant="tip">
            Útil para limpieza, preparación o descanso entre citas.
          </BookingCallout>
        </div>
      </BookingCollapsibleSection>

      <BookingEditModalFooter
        deleteLabel="Eliminar servicio"
        onDelete={remove}
        onCancel={closeEdit}
        onSave={submit}
        pending={pending}
        saveDisabled={!editName.trim()}
      />
    </div>
  );
}
