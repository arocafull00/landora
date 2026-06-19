"use client";

import { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";
import type { BookingService } from "@/db/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateBookingServiceAction } from "@/app/actions/booking-services";

export function ServiceEditDialog({
  open,
  service,
  onOpenChange,
  onUpdated,
}: {
  open: boolean;
  service: BookingService;
  onOpenChange: (open: boolean) => void;
  onUpdated: (service: BookingService) => void;
}) {
  const [name, setName] = useState(service.name);
  const [durationMinutes, setDurationMinutes] = useState(String(service.durationMinutes));
  const [bufferAfterMinutes, setBufferAfterMinutes] = useState(String(service.bufferAfterMinutes));
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setName(service.name);
    setDurationMinutes(String(service.durationMinutes));
    setBufferAfterMinutes(String(service.bufferAfterMinutes));
  }, [service]);

  const submit = () => {
    startTransition(async () => {
      const result = await updateBookingServiceAction(service.id, {
        name,
        durationMinutes: Number(durationMinutes),
        bufferAfterMinutes: Number(bufferAfterMinutes),
      });
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      toast.success("Servicio actualizado");
      onUpdated({
        ...service,
        name,
        durationMinutes: Number(durationMinutes),
        bufferAfterMinutes: Number(bufferAfterMinutes),
        updatedAt: new Date(),
      });
      onOpenChange(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar servicio</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <Input
            type="number"
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(e.target.value)}
          />
          <Input
            type="number"
            value={bufferAfterMinutes}
            onChange={(e) => setBufferAfterMinutes(e.target.value)}
          />
          <Button onClick={submit} disabled={pending || !name.trim()}>
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
