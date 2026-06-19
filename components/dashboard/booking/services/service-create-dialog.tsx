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
import { Switch } from "@/components/ui/switch";
import { createBookingServiceAction } from "@/app/actions/booking-services";
import { parseEurosToPriceCents } from "@/lib/service-price";

export function ServiceCreateDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("30");
  const [priceEuros, setPriceEuros] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [pending, startTransition] = useTransition();

  const reset = () => {
    setName("");
    setDurationMinutes("30");
    setPriceEuros("");
    setIsActive(true);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      reset();
    }
    onOpenChange(nextOpen);
  };

  const submit = () => {
    const priceCents = parseEurosToPriceCents(priceEuros);
    if (priceCents === null) {
      toast.error("Precio inválido");
      return;
    }

    startTransition(async () => {
      const result = await createBookingServiceAction({
        name,
        durationMinutes: Number(durationMinutes),
        priceCents,
        bufferAfterMinutes: 0,
        isActive,
      });
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      toast.success("Servicio creado");
      handleOpenChange(false);
      router.refresh();
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Nuevo servicio</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="font-body text-body-sm font-medium text-on-surface" htmlFor="service-name">
              Nombre
            </label>
            <Input
              id="service-name"
              placeholder="Corte de pelo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={pending}
            />
          </div>

          <div className="space-y-2">
            <label className="font-body text-body-sm font-medium text-on-surface" htmlFor="service-duration">
              Duración
            </label>
            <div className="flex items-center gap-2">
              <Input
                id="service-duration"
                type="number"
                min={5}
                max={480}
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value)}
                disabled={pending}
                className="w-24"
              />
              <span className="font-body text-body-sm text-on-surface-variant">min</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-body text-body-sm font-medium text-on-surface" htmlFor="service-price">
              Precio
            </label>
            <div className="flex items-center gap-2">
              <Input
                id="service-price"
                inputMode="decimal"
                placeholder="15"
                value={priceEuros}
                onChange={(e) => setPriceEuros(e.target.value)}
                disabled={pending}
                className="w-24"
              />
              <span className="font-body text-body-sm text-on-surface-variant">€</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-body text-body-sm font-medium text-on-surface">Estado</span>
            <div className="flex items-center gap-2">
              <Switch checked={isActive} disabled={pending} onCheckedChange={setIsActive} />
              <span className="font-body text-body-sm text-on-surface-variant">
                {isActive ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>

          <Button onClick={submit} disabled={pending || !name.trim()} className="w-full">
            Crear
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
