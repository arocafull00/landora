"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { EmployeeScheduleCompact } from "@/components/dashboard/booking/employees/employee-schedule-compact";
import { EmployeeScheduleCustom } from "@/components/dashboard/booking/employees/employee-schedule-custom";
import { EmployeeServiceCheckbox } from "@/components/dashboard/booking/employees/employee-service-checkbox";
import {
  deleteEmployeeAction,
  replaceEmployeeHoursAction,
  replaceEmployeeServicesAction,
  setEmployeeActiveAction,
  updateEmployeeAction,
} from "@/app/actions/employees";
import { useEmployeeEditorStore } from "@/stores/employee-editor-store";

export function EmployeeEditForm() {
  const router = useRouter();
  const employee = useEmployeeEditorStore((s) => s.employee);
  const services = useEmployeeEditorStore((s) => s.services);
  const name = useEmployeeEditorStore((s) => s.name);
  const hourDrafts = useEmployeeEditorStore((s) => s.hourDrafts);
  const customizeDays = useEmployeeEditorStore((s) => s.customizeDays);
  const copiedHours = useEmployeeEditorStore((s) => s.copiedHours);
  const copiedFromName = useEmployeeEditorStore((s) => s.copiedFromName);
  const closeEdit = useEmployeeEditorStore((s) => s.closeEdit);
  const setName = useEmployeeEditorStore((s) => s.setName);
  const setCustomizeDays = useEmployeeEditorStore((s) => s.setCustomizeDays);
  const applyCopiedSchedule = useEmployeeEditorStore((s) => s.applyCopiedSchedule);
  const [pending, startTransition] = useTransition();

  if (!employee) {
    return null;
  }

  const saveAll = () => {
    startTransition(async () => {
      const nameResult = await updateEmployeeAction(employee.id, name);
      if ("error" in nameResult) {
        toast.error(nameResult.error);
        return;
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
      router.refresh();
    });
  };

  const toggleActive = (isActive: boolean) => {
    startTransition(async () => {
      const result = await setEmployeeActiveAction(employee.id, isActive);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      toast.success(isActive ? "Empleado activado" : "Empleado desactivado");
      router.refresh();
    });
  };

  const remove = () => {
    startTransition(async () => {
      const result = await deleteEmployeeAction(employee.id);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      toast.success("Empleado eliminado");
      closeEdit();
      router.refresh();
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="font-body text-body-sm font-medium text-on-surface" htmlFor="employee-edit-name">
          Nombre
        </label>
        <Input
          id="employee-edit-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={pending}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-body text-body-sm font-medium text-on-surface">Estado</span>
          <div className="flex items-center gap-2">
            <Switch
              checked={employee.isActive}
              disabled={pending}
              onCheckedChange={toggleActive}
            />
            <span className="font-body text-body-sm text-on-surface-variant">
              {employee.isActive ? "Activo" : "Inactivo"}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="font-body text-body-sm font-medium text-on-surface">Horario semanal</p>
        {copiedHours ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={pending}
            onClick={applyCopiedSchedule}
          >
            Aplicar horario de {copiedFromName}
          </Button>
        ) : null}
        {customizeDays ? (
          <EmployeeScheduleCustom disabled={pending} />
        ) : (
          <EmployeeScheduleCompact disabled={pending} />
        )}
        {!customizeDays ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={pending}
            onClick={() => setCustomizeDays(true)}
            className="px-0 text-primary hover:bg-transparent hover:text-primary"
          >
            Personalizar días
          </Button>
        ) : (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={pending}
            onClick={() => setCustomizeDays(false)}
            className="px-0 text-primary hover:bg-transparent hover:text-primary"
          >
            Usar horario uniforme
          </Button>
        )}
      </div>

      {services.length > 0 ? (
        <div className="space-y-3 border-t border-outline-variant pt-6">
          <p className="font-body text-body-sm font-medium text-on-surface">Servicios</p>
          <div className="space-y-2">
            {services.map((service) => (
              <EmployeeServiceCheckbox key={service.id} service={service} disabled={pending} />
            ))}
          </div>
        </div>
      ) : null}

      <div className="space-y-2 border-t border-outline-variant pt-6">
        <Button onClick={saveAll} disabled={pending || !name.trim()} className="w-full">
          Guardar cambios
        </Button>
        <Button variant="destructive" onClick={remove} disabled={pending} className="w-full">
          Eliminar empleado
        </Button>
      </div>
    </div>
  );
}
