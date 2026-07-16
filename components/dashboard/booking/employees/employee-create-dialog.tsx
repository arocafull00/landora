"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
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
import { createEmployeeAction } from "@/app/actions/employees";
import {
  employeeFormSchema,
  type EmployeeFormValues,
} from "@/lib/schemas/booking-admin";

export function EmployeeCreateDialog({
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
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: { name: "", isActive: true },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      reset({ name: "", isActive: true });
    }
    onOpenChange(nextOpen);
  };

  const submit = async ({ name, isActive }: EmployeeFormValues) => {
    const result = await createEmployeeAction(name, isActive);
    if ("error" in result) {
      toast.error(result.error);
      return;
    }
    toast.success("Empleado creado");
    handleOpenChange(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo empleado</DialogTitle>
        </DialogHeader>
        <form className="space-y-5" onSubmit={handleSubmit(submit)}>
          <div className="space-y-2">
            <label className="font-body text-body-sm font-medium text-on-surface" htmlFor="employee-name">
              Nombre
            </label>
            <Input
              id="employee-name"
              placeholder="Paco"
              {...register("name")}
              disabled={isSubmitting}
            />
            {errors.name ? <p className="text-body-sm text-danger">{errors.name.message}</p> : null}
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body text-body-sm font-medium text-on-surface">Activo</span>
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
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Creando…" : "Crear"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
