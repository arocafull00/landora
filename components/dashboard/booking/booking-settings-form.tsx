"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import type { BookingSettings } from "@/db/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BOOKING_TIMEZONES } from "@/lib/booking/timezones";
import { upsertBookingSettingsAction } from "@/app/actions/booking-settings";

export function BookingSettingsForm({
  settings,
  onOpenChange,
}: {
  settings: BookingSettings;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [form, setForm] = useState({
    enabled: settings.enabled,
    timezone: settings.timezone,
    autoConfirmBookings: settings.autoConfirmBookings,
    minAdvanceHours: settings.minAdvanceHours,
    maxAdvanceDays: settings.maxAdvanceDays,
    slotGranularityMinutes: settings.slotGranularityMinutes,
    notificationEmail: settings.notificationEmail,
  });
  const [pending, startTransition] = useTransition();

  const save = () => {
    startTransition(async () => {
      const result = await upsertBookingSettingsAction(form);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      toast.success("Ajustes guardados");
      onOpenChange(false);
      router.refresh();
    });
  };

  return (
    <div className="space-y-6 overflow-y-auto px-6 py-6">
      <label className="flex items-center justify-between">
        <span className="font-body text-body-sm">Activar reservas</span>
        <Switch
          checked={form.enabled}
          disabled={pending}
          onCheckedChange={(enabled) => setForm((current) => ({ ...current, enabled }))}
        />
      </label>
      <div className="space-y-2">
        <span className="font-body text-body-sm">Email de notificaciones</span>
        <Input
          type="email"
          value={form.notificationEmail}
          placeholder="negocio@ejemplo.com"
          onChange={(e) =>
            setForm((current) => ({ ...current, notificationEmail: e.target.value }))
          }
        />
      </div>
      <div className="space-y-2">
        <span className="font-body text-body-sm">Zona horaria</span>
        <Select
          value={form.timezone}
          onValueChange={(timezone) => setForm((current) => ({ ...current, timezone }))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {BOOKING_TIMEZONES.map((tz) => (
              <SelectItem key={tz.value} value={tz.value}>
                {tz.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <label className="flex items-center justify-between">
        <span className="font-body text-body-sm">Auto-confirmación</span>
        <Switch
          checked={form.autoConfirmBookings}
          disabled={pending}
          onCheckedChange={(autoConfirmBookings) =>
            setForm((current) => ({ ...current, autoConfirmBookings }))
          }
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <span className="font-body text-body-sm">Antelación mínima (horas)</span>
          <Input
            type="number"
            value={form.minAdvanceHours}
            onChange={(e) =>
              setForm((current) => ({
                ...current,
                minAdvanceHours: Number(e.target.value),
              }))
            }
          />
        </div>
        <div className="space-y-2">
          <span className="font-body text-body-sm">Antelación máxima (días)</span>
          <Input
            type="number"
            value={form.maxAdvanceDays}
            onChange={(e) =>
              setForm((current) => ({
                ...current,
                maxAdvanceDays: Number(e.target.value),
              }))
            }
          />
        </div>
      </div>
      <div className="space-y-2">
        <span className="font-body text-body-sm">Granularidad (minutos)</span>
        <Select
          value={String(form.slotGranularityMinutes)}
          onValueChange={(value) =>
            setForm((current) => ({
              ...current,
              slotGranularityMinutes: Number(value),
            }))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 15, 30, 60].map((value) => (
              <SelectItem key={value} value={String(value)}>
                {value} min
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={save} disabled={pending} className="w-full">
        Guardar
      </Button>
    </div>
  );
}
