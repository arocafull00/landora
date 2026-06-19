"use client";

import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function BookingStepContact({
  pending,
  onBack,
  onSubmit,
  turnstile,
}: {
  pending: boolean;
  onBack: () => void;
  onSubmit: (data: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    notes: string;
    honeypot: string;
  }) => void;
  turnstile: ReactNode;
}) {
  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        onSubmit({
          customerName: String(formData.get("customerName") ?? ""),
          customerPhone: String(formData.get("customerPhone") ?? ""),
          customerEmail: String(formData.get("customerEmail") ?? ""),
          notes: String(formData.get("notes") ?? ""),
          honeypot: String(formData.get("website") ?? ""),
        });
      }}
    >
      <h3 className="font-body text-body-md font-semibold">Tus datos</h3>
      <Input name="customerName" placeholder="Nombre" required />
      <Input name="customerPhone" placeholder="Teléfono" required />
      <Input name="customerEmail" type="email" placeholder="Email (opcional)" />
      <Input name="notes" placeholder="Notas (opcional)" />
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {turnstile}
      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={onBack}>
          Volver
        </Button>
        <Button type="submit" disabled={pending}>
          Confirmar reserva
        </Button>
      </div>
    </form>
  );
}
