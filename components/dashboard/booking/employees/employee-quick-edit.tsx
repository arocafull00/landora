"use client";

import { useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CalendarDays } from "lucide-react";
import type { BookingService, Employee } from "@/lib/domain/dtos";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { EmployeeScheduleCompact } from "@/components/dashboard/booking/employees/employee-schedule-compact";
import { EmployeeScheduleCustom } from "@/components/dashboard/booking/employees/employee-schedule-custom";
import { EmployeeServiceCheckbox } from "@/components/dashboard/booking/employees/employee-service-checkbox";
import {
  replaceEmployeeHoursAction,
  replaceEmployeeServicesAction,
  setEmployeeActiveAction,
  updateEmployeeAction,
} from "@/app/actions/employees";
import { useEmployeeEditorStore } from "@/stores/employee-editor-store";

export function EmployeeQuickEdit({
  employee,
  services,
  disabled,
  onSaved,
  actions,
}: {
  employee: Employee;
  services: BookingService[];
  disabled: boolean;
  onSaved: () => void;
  actions: ReactNode;
}) {
  const router = useRouter();
  const storeEmployee = useEmployeeEditorStore((s) => s.employee);
  const name = useEmployeeEditorStore((s) => s.name);
  const isActive = useEmployeeEditorStore((s) => s.isActive);
  const hourDrafts = useEmployeeEditorStore((s) => s.hourDrafts);
  const customizeDays = useEmployeeEditorStore((s) => s.customizeDays);
  const copiedHours = useEmployeeEditorStore((s) => s.copiedHours);
  const copiedFromName = useEmployeeEditorStore((s) => s.copiedFromName);
  const setName = useEmployeeEditorStore((s) => s.setName);
  const setIsActive = useEmployeeEditorStore((s) => s.setIsActive);
  const setCustomizeDays = useEmployeeEditorStore((s) => s.setCustomizeDays);
  const applyCopiedSchedule = useEmployeeEditorStore((s) => s.applyCopiedSchedule);
  const [pending, startTransition] = useTransition();

  if (!storeEmployee || storeEmployee.id !== employee.id) {
    return null;
  }

  const submit = () => {
    startTransition(async () => {
      const nameResult = await updateEmployeeAction(employee.id, name);
      if ("error" in nameResult) {
        toast.error(nameResult.error);
        return;
      }

      if (isActive !== employee.isActive) {
        const activeResult = await setEmployeeActiveAction(employee.id, isActive);
        if ("error" in activeResult) {
          toast.error(activeResult.error);
          return;
        }
      }

      const hoursResult = await replaceEmployeeHoursAction(employee.id, hourDrafts);
      if ("error" in hoursResult) {
        toast.error(hoursResult.error);
        return;
      }

      const serviceIds = useEmployeeEditorStore.getState().serviceIds;
      const servicesResult = await replaceEmployeeServicesAction(employee.id, serviceIds);
      if ("error" in servicesResult) {
        toast.error(servicesResult.error);
        return;
      }

      toast.success("Empleado actualizado");
      onSaved();
      router.refresh();
    });
  };

  return (
    <div className="space-y-4 border-t border-outline-variant pt-4">
      <div className="space-y-2">
        <label
          className="font-body text-body-sm text-on-surface-variant"
          htmlFor={`employee-name-${employee.id}`}
        >
          Nombre
        </label>
        <Input
          id={`employee-name-${employee.id}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={pending || disabled}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="font-body text-body-sm text-on-surface-variant">Activo</span>
        <Switch
          checked={isActive}
          disabled={pending || disabled}
          onCheckedChange={setIsActive}
        />
      </div>

      <div className="space-y-3">
        <p className="font-body text-body-sm text-on-surface-variant">Horario semanal</p>
        {copiedHours ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={pending || disabled}
            onClick={applyCopiedSchedule}
          >
            Aplicar horario de {copiedFromName}
          </Button>
        ) : null}
        {customizeDays ? (
          <EmployeeScheduleCustom disabled={pending || disabled} />
        ) : (
          <EmployeeScheduleCompact disabled={pending || disabled} />
        )}
        {!customizeDays ? (
          <button
            type="button"
            disabled={pending || disabled}
            onClick={() => setCustomizeDays(true)}
            className="flex items-center gap-2 font-body text-body-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50"
          >
            <CalendarDays className="h-4 w-4 shrink-0" aria-hidden />
            Personalizar horarios por día
          </button>
        ) : (
          <button
            type="button"
            disabled={pending || disabled}
            onClick={() => setCustomizeDays(false)}
            className="font-body text-body-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50"
          >
            Usar horario uniforme
          </button>
        )}
      </div>

      {services.length > 0 ? (
        <div className="space-y-3">
          <p className="font-body text-body-sm text-on-surface-variant">Servicios asignados</p>
          <div className="space-y-2">
            {services.map((service) => (
              <EmployeeServiceCheckbox
                key={service.id}
                service={service}
                disabled={pending || disabled}
              />
            ))}
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-outline-variant pt-4">
        <div className="flex flex-wrap gap-2">{actions}</div>
        <Button
          onClick={submit}
          disabled={pending || disabled || !name.trim()}
          size="sm"
        >
          Guardar
        </Button>
      </div>
    </div>
  );
}
