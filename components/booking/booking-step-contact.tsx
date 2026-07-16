"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BookingStepHeader } from "@/components/booking/booking-step-header";
import { BookingTurnstileField } from "@/components/booking/booking-turnstile-field";
import { cn } from "@/lib/utils";

const textareaClassName = cn(
  "min-h-24 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
);

export function BookingStepContact({
  pending,
  submitDisabled,
  onSubmit,
  showTurnstile,
  onTurnstileSuccess,
  onTurnstileExpire,
  onTurnstileError,
}: {
  pending: boolean;
  submitDisabled: boolean;
  onSubmit: (data: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    notes: string;
    honeypot: string;
  }) => void;
  showTurnstile: boolean;
  onTurnstileSuccess: (token: string) => void;
  onTurnstileExpire: () => void;
  onTurnstileError: () => void;
}) {
  return (
    <form
      className="space-y-4"
      action={(formData) => {
        onSubmit({
          customerName: String(formData.get("customerName") ?? ""),
          customerPhone: String(formData.get("customerPhone") ?? ""),
          customerEmail: String(formData.get("customerEmail") ?? ""),
          notes: String(formData.get("notes") ?? ""),
          honeypot: String(formData.get("website") ?? ""),
        });
      }}
    >
      <BookingStepHeader
        title="Tus datos"
        description="Usaremos esta información para confirmar tu reserva."
      />
      <div className="space-y-2">
        <Label htmlFor="customerName">
          Nombre <span className="text-danger">*</span>
        </Label>
        <Input id="customerName" name="customerName" autoComplete="name" required aria-required="true" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="customerPhone">
          Teléfono <span className="text-danger">*</span>
        </Label>
        <Input
          id="customerPhone"
          name="customerPhone"
          type="tel"
          autoComplete="tel"
          required
          aria-required="true"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="customerEmail">Email</Label>
        <Input
          id="customerEmail"
          name="customerEmail"
          type="email"
          autoComplete="email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notas</Label>
        <textarea id="notes" name="notes" className={textareaClassName} />
      </div>
      <label className="sr-only" htmlFor="booking-website">
        Sitio web
      </label>
      <input
        id="booking-website"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      {showTurnstile ? (
        <div className="space-y-2">
          <Label htmlFor="booking-turnstile">Verificación de seguridad</Label>
          <div id="booking-turnstile">
            <BookingTurnstileField
              onSuccess={onTurnstileSuccess}
              onExpire={onTurnstileExpire}
              onError={onTurnstileError}
            />
          </div>
        </div>
      ) : null}
      <Button type="submit" className="w-full sm:w-auto" disabled={pending || submitDisabled}>
        Confirmar reserva
      </Button>
    </form>
  );
}
