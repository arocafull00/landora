"use client";

import { useReducer, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import type { BookingService } from "@/lib/domain/dtos";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { updateBookingServiceAction } from "@/app/actions/booking-services";
import {
  parseEurosToPriceCents,
  priceCentsToEurosInput,
} from "@/lib/service-price";
import { useBookingServicesStore } from "@/stores/booking-services-store";

type FormState = {
  name: string;
  durationMinutes: string;
  priceEuros: string;
  bufferAfterMinutes: string;
  isActive: boolean;
};

type FormAction =
  | { type: "setField"; field: keyof FormState; value: string | boolean }
  | { type: "reset"; service: BookingService };

function createInitialState(service: BookingService): FormState {
  return {
    name: service.name,
    durationMinutes: String(service.durationMinutes),
    priceEuros: priceCentsToEurosInput(service.priceCents),
    bufferAfterMinutes: String(service.bufferAfterMinutes),
    isActive: service.isActive,
  };
}

function formReducer(state: FormState, action: FormAction): FormState {
  if (action.type === "reset") {
    return createInitialState(action.service);
  }

  return { ...state, [action.field]: action.value };
}

export function ServiceQuickEdit({
  service,
  disabled,
  onSaved,
  actions,
}: {
  service: BookingService;
  disabled: boolean;
  onSaved: () => void;
  actions: ReactNode;
}) {
  const router = useRouter();
  const updateService = useBookingServicesStore((s) => s.updateService);
  const [form, dispatch] = useReducer(formReducer, service, createInitialState);
  const [pending, startTransition] = useTransition();

  const submit = () => {
    const priceCents = parseEurosToPriceCents(form.priceEuros);
    if (priceCents === null) {
      toast.error("Precio inválido");
      return;
    }

    startTransition(async () => {
      const result = await updateBookingServiceAction(service.id, {
        name: form.name,
        durationMinutes: Number(form.durationMinutes),
        priceCents,
        bufferAfterMinutes: Number(form.bufferAfterMinutes),
        isActive: form.isActive,
      });
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      toast.success("Servicio actualizado");
      updateService({
        ...service,
        name: form.name,
        durationMinutes: Number(form.durationMinutes),
        priceCents,
        bufferAfterMinutes: Number(form.bufferAfterMinutes),
        isActive: form.isActive,
        updatedAt: new Date(),
      });
      onSaved();
      router.refresh();
    });
  };

  return (
    <div className="space-y-4 border-t border-outline-variant pt-4">
      <div className="space-y-2">
        <label className="font-body text-body-sm text-on-surface-variant" htmlFor={`quick-name-${service.id}`}>
          Nombre
        </label>
        <Input
          id={`quick-name-${service.id}`}
          value={form.name}
          onChange={(e) => dispatch({ type: "setField", field: "name", value: e.target.value })}
          disabled={pending || disabled}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label
            className="font-body text-body-sm text-on-surface-variant"
            htmlFor={`quick-duration-${service.id}`}
          >
            Duración
          </label>
          <div className="flex items-center gap-2">
            <Input
              id={`quick-duration-${service.id}`}
              type="number"
              min={5}
              max={480}
              value={form.durationMinutes}
              onChange={(e) =>
                dispatch({ type: "setField", field: "durationMinutes", value: e.target.value })
              }
              disabled={pending || disabled}
            />
            <span className="shrink-0 font-body text-body-sm text-on-surface-variant">min</span>
          </div>
        </div>

        <div className="space-y-2">
          <label
            className="font-body text-body-sm text-on-surface-variant"
            htmlFor={`quick-price-${service.id}`}
          >
            Precio
          </label>
          <div className="flex items-center gap-2">
            <Input
              id={`quick-price-${service.id}`}
              inputMode="decimal"
              placeholder="0"
              value={form.priceEuros}
              onChange={(e) =>
                dispatch({ type: "setField", field: "priceEuros", value: e.target.value })
              }
              disabled={pending || disabled}
            />
            <span className="shrink-0 font-body text-body-sm text-on-surface-variant">€</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="font-body text-body-sm text-on-surface-variant">Activo</span>
        <Switch
          checked={form.isActive}
          disabled={pending || disabled}
          onCheckedChange={(isActive) =>
            dispatch({ type: "setField", field: "isActive", value: isActive })
          }
        />
      </div>

      <details className="group">
        <summary className="cursor-pointer font-body text-body-sm text-primary">
          Opciones avanzadas
        </summary>
        <div className="mt-3 space-y-2">
          <label
            className="font-body text-body-sm text-on-surface-variant"
            htmlFor={`quick-buffer-${service.id}`}
          >
            Margen posterior
          </label>
          <div className="flex items-center gap-2">
            <Input
              id={`quick-buffer-${service.id}`}
              type="number"
              min={0}
              max={120}
              value={form.bufferAfterMinutes}
              onChange={(e) =>
                dispatch({ type: "setField", field: "bufferAfterMinutes", value: e.target.value })
              }
              disabled={pending || disabled}
            />
            <span className="shrink-0 font-body text-body-sm text-on-surface-variant">min</span>
          </div>
        </div>
      </details>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-outline-variant pt-4">
        <div className="flex flex-wrap gap-2">{actions}</div>
        <Button
          onClick={submit}
          disabled={pending || disabled || !form.name.trim()}
          size="sm"
        >
          Guardar
        </Button>
      </div>
    </div>
  );
}
