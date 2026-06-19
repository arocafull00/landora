"use client";

import { useTransition } from "react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateBookingServiceAction } from "@/app/actions/booking-services";
import { useBookingServicesStore } from "@/stores/booking-services-store";

export function ServiceEditDialog() {
  const editOpen = useBookingServicesStore((s) => s.editOpen);
  const editingServiceId = useBookingServicesStore((s) => s.editingServiceId);
  const editName = useBookingServicesStore((s) => s.editName);
  const editDurationMinutes = useBookingServicesStore((s) => s.editDurationMinutes);
  const editBufferAfterMinutes = useBookingServicesStore((s) => s.editBufferAfterMinutes);
  const services = useBookingServicesStore((s) => s.services);
  const closeEdit = useBookingServicesStore((s) => s.closeEdit);
  const setEditName = useBookingServicesStore((s) => s.setEditName);
  const setEditDurationMinutes = useBookingServicesStore((s) => s.setEditDurationMinutes);
  const setEditBufferAfterMinutes = useBookingServicesStore((s) => s.setEditBufferAfterMinutes);
  const updateService = useBookingServicesStore((s) => s.updateService);
  const [pending, startTransition] = useTransition();

  const service = services.find((s) => s.id === editingServiceId);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeEdit();
    }
  };

  const submit = () => {
    if (!service) {
      return;
    }

    startTransition(async () => {
      const result = await updateBookingServiceAction(service.id, {
        name: editName,
        durationMinutes: Number(editDurationMinutes),
        bufferAfterMinutes: Number(editBufferAfterMinutes),
      });
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      toast.success("Servicio actualizado");
      updateService({
        ...service,
        name: editName,
        durationMinutes: Number(editDurationMinutes),
        bufferAfterMinutes: Number(editBufferAfterMinutes),
        updatedAt: new Date(),
      });
      closeEdit();
    });
  };

  if (!service) {
    return null;
  }

  return (
    <Dialog open={editOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar servicio</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
          <Input
            type="number"
            value={editDurationMinutes}
            onChange={(e) => setEditDurationMinutes(e.target.value)}
          />
          <Input
            type="number"
            value={editBufferAfterMinutes}
            onChange={(e) => setEditBufferAfterMinutes(e.target.value)}
          />
          <Button onClick={submit} disabled={pending || !editName.trim()}>
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
