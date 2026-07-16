"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  bookingServiceFormSchema,
  type BookingServiceFormInput,
  type BookingServiceFormValues,
} from "@/lib/schemas/booking-admin";

export function ServiceCreateDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<BookingServiceFormInput, unknown, BookingServiceFormValues>({
    resolver: zodResolver(bookingServiceFormSchema),
    defaultValues: {
      name: "",
      durationMinutes: "30",
      priceEuros: "",
      isActive: true,
    },
  });
  const isActive = useWatch({ control, name: "isActive" });

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      reset({
        name: "",
        durationMinutes: "30",
        priceEuros: "",
        isActive: true,
      });
    }
    onOpenChange(nextOpen);
  };

  const submit = async (values: BookingServiceFormValues) => {
    const result = await createBookingServiceAction(values);
    if ("error" in result) {
      toast.error(result.error);
      return;
    }
    toast.success("Servicio creado");
    handleOpenChange(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Nuevo servicio</DialogTitle>
        </DialogHeader>
        <form className="space-y-5" onSubmit={handleSubmit(submit)}>
          <div className="space-y-2">
            <label className="font-body text-body-sm font-medium text-on-surface" htmlFor="service-name">
              Nombre
            </label>
            <Input
              id="service-name"
              placeholder="Corte de pelo"
              {...register("name")}
              disabled={isSubmitting}
            />
            {errors.name ? <p className="text-body-sm text-danger">{errors.name.message}</p> : null}
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
                {...register("durationMinutes")}
                disabled={isSubmitting}
                className="w-24"
              />
              <span className="font-body text-body-sm text-on-surface-variant">min</span>
            </div>
            {errors.durationMinutes ? (
              <p className="text-body-sm text-danger">{errors.durationMinutes.message}</p>
            ) : null}
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
                {...register("priceEuros")}
                disabled={isSubmitting}
                className="w-24"
              />
              <span className="font-body text-body-sm text-on-surface-variant">€</span>
            </div>
            {errors.priceEuros ? (
              <p className="text-body-sm text-danger">{errors.priceEuros.message}</p>
            ) : null}
          </div>

          <div className="flex items-center justify-between">
            <span className="font-body text-body-sm font-medium text-on-surface">Estado</span>
            <div className="flex items-center gap-2">
              <Controller
                control={control}
                name="isActive"
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    disabled={isSubmitting}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <span className="font-body text-body-sm text-on-surface-variant">
                {isActive ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Creando…" : "Crear"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
