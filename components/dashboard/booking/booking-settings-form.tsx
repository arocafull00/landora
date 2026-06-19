"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";
import type { BookingSettings } from "@/db/schema";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Panel } from "@/components/ui/primitives";
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

export function BookingSettingsForm({ settings }: { settings: BookingSettings }) {
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
    });
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <DashboardPageHeader
        title="Ajustes de reservas"
        description="Configura disponibilidad, confirmación y notificaciones."
      />
      <div className="flex-1 overflow-auto p-unit-lg">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/settings/blocked-periods">Bloqueos</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/bookings">Ver reservas</Link>
            </Button>
          </div>
          <Panel className="space-y-6 p-6">
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
            <Button onClick={save} disabled={pending}>
              Guardar
            </Button>
          </Panel>
        </div>
      </div>
    </div>
  );
}
