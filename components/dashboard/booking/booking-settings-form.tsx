"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import type { BookingSettingsDto } from "@/lib/booking/dtos";
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
import {
  bookingSettingsSchema,
  type BookingSettingsFormValues,
} from "@/lib/schemas/booking-admin";

export function BookingSettingsForm({
  settings,
  onOpenChange,
}: {
  settings: BookingSettingsDto;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<BookingSettingsFormValues>({
    resolver: zodResolver(bookingSettingsSchema),
    defaultValues: {
      enabled: settings.enabled,
      timezone: settings.timezone,
      autoConfirmBookings: settings.autoConfirmBookings,
      minAdvanceHours: settings.minAdvanceHours,
      maxAdvanceDays: settings.maxAdvanceDays,
      slotGranularityMinutes: settings.slotGranularityMinutes,
      notificationEmail: settings.notificationEmail,
    },
  });

  const save = async (values: BookingSettingsFormValues) => {
    const result = await upsertBookingSettingsAction(values);
    if ("error" in result) {
      toast.error(result.error);
      return;
    }
    toast.success("Ajustes guardados");
    onOpenChange(false);
    router.refresh();
  };

  return (
    <form
      className="space-y-6 overflow-y-auto px-6 py-6"
      onSubmit={handleSubmit(save)}
    >
      <div className="flex items-center justify-between gap-3">
        <label className="font-body text-body-sm" htmlFor="booking-settings-enabled">
          Activar reservas
        </label>
        <Controller
          control={control}
          name="enabled"
          render={({ field }) => (
            <Switch
              id="booking-settings-enabled"
              checked={field.value}
              disabled={isSubmitting}
              onCheckedChange={field.onChange}
            />
          )}
        />
      </div>
      <div className="space-y-2">
        <label className="font-body text-body-sm" htmlFor="booking-settings-notification-email">
          Email de notificaciones
        </label>
        <Input
          id="booking-settings-notification-email"
          type="email"
          placeholder="negocio@ejemplo.com"
          {...register("notificationEmail")}
          disabled={isSubmitting}
        />
        {errors.notificationEmail ? (
          <p className="text-body-sm text-danger">{errors.notificationEmail.message}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <span className="font-body text-body-sm">Zona horaria</span>
        <Controller
          control={control}
          name="timezone"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={isSubmitting}
            >
              <SelectTrigger aria-label="Zona horaria">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BOOKING_TIMEZONES.map((timezone) => (
                  <SelectItem key={timezone.value} value={timezone.value}>
                    {timezone.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className="flex items-center justify-between gap-3">
        <label className="font-body text-body-sm" htmlFor="booking-settings-auto-confirm">
          Auto-confirmación
        </label>
        <Controller
          control={control}
          name="autoConfirmBookings"
          render={({ field }) => (
            <Switch
              id="booking-settings-auto-confirm"
              checked={field.value}
              disabled={isSubmitting}
              onCheckedChange={field.onChange}
            />
          )}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="font-body text-body-sm" htmlFor="booking-settings-min-hours">
            Antelación mínima (horas)
          </label>
          <Input
            id="booking-settings-min-hours"
            type="number"
            {...register("minAdvanceHours", { valueAsNumber: true })}
            disabled={isSubmitting}
          />
          {errors.minAdvanceHours ? (
            <p className="text-body-sm text-danger">{errors.minAdvanceHours.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <label className="font-body text-body-sm" htmlFor="booking-settings-max-days">
            Antelación máxima (días)
          </label>
          <Input
            id="booking-settings-max-days"
            type="number"
            {...register("maxAdvanceDays", { valueAsNumber: true })}
            disabled={isSubmitting}
          />
          {errors.maxAdvanceDays ? (
            <p className="text-body-sm text-danger">{errors.maxAdvanceDays.message}</p>
          ) : null}
        </div>
      </div>
      <div className="space-y-2">
        <span className="font-body text-body-sm">Granularidad (minutos)</span>
        <Controller
          control={control}
          name="slotGranularityMinutes"
          render={({ field }) => (
            <Select
              value={String(field.value)}
              onValueChange={(value) => field.onChange(Number(value))}
              disabled={isSubmitting}
            >
              <SelectTrigger aria-label="Granularidad">
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
          )}
        />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Guardando…" : "Guardar"}
      </Button>
    </form>
  );
}
