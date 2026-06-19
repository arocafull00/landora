"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createBookingServiceAction } from "@/app/actions/booking-services";

export function ServiceCreateDialog({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("30");
  const [bufferAfterMinutes, setBufferAfterMinutes] = useState("0");
  const [pending, startTransition] = useTransition();

  const submit = () => {
    startTransition(async () => {
      const result = await createBookingServiceAction({
        name,
        durationMinutes: Number(durationMinutes),
        bufferAfterMinutes: Number(bufferAfterMinutes),
      });
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      toast.success("Servicio creado");
      onCreated();
      router.refresh();
      setName("");
      setDurationMinutes("30");
      setBufferAfterMinutes("0");
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo servicio</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
          <Input
            type="number"
            placeholder="Duración (min)"
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Buffer posterior (min)"
            value={bufferAfterMinutes}
            onChange={(e) => setBufferAfterMinutes(e.target.value)}
          />
          <Button onClick={submit} disabled={pending || !name.trim()}>
            Crear
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
