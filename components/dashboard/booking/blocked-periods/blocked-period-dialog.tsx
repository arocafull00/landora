"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import type { EmployeeOptionDto } from "@/lib/booking/dtos";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createBlockedPeriodAction } from "@/app/actions/blocked-periods";
import {
  blockedPeriodFormSchema,
  type BlockedPeriodFormValues,
} from "@/lib/schemas/booking-admin";

export function BlockedPeriodDialog({
  open,
  employees,
  onOpenChange,
  onSaved,
}: {
  open: boolean;
  employees: EmployeeOptionDto[];
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}) {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<BlockedPeriodFormValues>({
    resolver: zodResolver(blockedPeriodFormSchema),
    defaultValues: {
      employeeId: "global",
      startsAt: "",
      endsAt: "",
      reason: "",
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      reset({
        employeeId: "global",
        startsAt: "",
        endsAt: "",
        reason: "",
      });
    }
    onOpenChange(nextOpen);
  };

  const submit = async (values: BlockedPeriodFormValues) => {
    const result = await createBlockedPeriodAction({
      employeeId: values.employeeId === "global" ? null : values.employeeId,
      startsAt: new Date(values.startsAt).toISOString(),
      endsAt: new Date(values.endsAt).toISOString(),
      reason: values.reason,
    });
    if ("error" in result) {
      toast.error(result.error);
      return;
    }
    toast.success("Bloqueo creado");
    reset();
    onSaved();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo bloqueo</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(submit)}>
          <div className="space-y-2">
            <span id="blocked-period-employee-label" className="text-body-sm">
              Empleado
            </span>
            <Controller
              control={control}
              name="employeeId"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isSubmitting}
                >
                  <SelectTrigger aria-labelledby="blocked-period-employee-label">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="global">Global</SelectItem>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="blocked-period-start" className="text-body-sm">
              Inicio
            </label>
            <Input
              id="blocked-period-start"
              type="datetime-local"
              {...register("startsAt")}
              disabled={isSubmitting}
            />
            {errors.startsAt ? (
              <p className="text-body-sm text-danger">{errors.startsAt.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <label htmlFor="blocked-period-end" className="text-body-sm">
              Fin
            </label>
            <Input
              id="blocked-period-end"
              type="datetime-local"
              {...register("endsAt")}
              disabled={isSubmitting}
            />
            {errors.endsAt ? (
              <p className="text-body-sm text-danger">{errors.endsAt.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <label htmlFor="blocked-period-reason" className="text-body-sm">
              Motivo
            </label>
            <Input
              id="blocked-period-reason"
              placeholder="Motivo"
              {...register("reason")}
              disabled={isSubmitting}
            />
            {errors.reason ? (
              <p className="text-body-sm text-danger">{errors.reason.message}</p>
            ) : null}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creando…" : "Crear"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
