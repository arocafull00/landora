"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CalendarDays } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { BookingEditModalFooter } from "@/components/dashboard/booking/booking-edit-modal-footer";
import { BookingFormField } from "@/components/dashboard/booking/booking-form-field";
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
  const isActive = useEmployeeEditorStore((s) => s.isActive);
  const hourDrafts = useEmployeeEditorStore((s) => s.hourDrafts);
  const customizeDays = useEmployeeEditorStore((s) => s.customizeDays);
  const copiedHours = useEmployeeEditorStore((s) => s.copiedHours);
  const copiedFromName = useEmployeeEditorStore((s) => s.copiedFromName);
  const closeEdit = useEmployeeEditorStore((s) => s.closeEdit);
  const setName = useEmployeeEditorStore((s) => s.setName);
  const setIsActive = useEmployeeEditorStore((s) => s.setIsActive);
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
      closeEdit();
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
    <div className="flex flex-col gap-6 pt-6">
      <div className="space-y-4">
        <p className="font-body text-body-sm font-medium text-on-surface">Información</p>
        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:gap-6">
          <BookingFormField label="Nombre" htmlFor="employee-edit-name">
            <Input
              id="employee-edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={pending}
            />
          </BookingFormField>
          <div className="space-y-2 sm:min-w-[180px]">
            <p className="font-body text-body-sm font-medium text-on-surface">Estado</p>
            <div className="flex items-center gap-2">
              <Switch checked={isActive} disabled={pending} onCheckedChange={setIsActive} />
              <span className="font-body text-body-sm text-on-surface">
                {isActive ? "Activo" : "Inactivo"}
              </span>
            </div>
            <p className="font-body text-body-sm text-on-surface-variant">
              El empleado podrá recibir reservas
            </p>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="space-y-0.5">
          <p className="font-body text-body-sm font-medium text-on-surface">Horario semanal</p>
          <p className="font-body text-body-sm text-on-surface-variant">
            Selecciona los días en los que trabaja y su horario habitual.
          </p>
        </div>
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
          <button
            type="button"
            disabled={pending}
            onClick={() => setCustomizeDays(true)}
            className="flex w-full items-start gap-3 rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50"
          >
            <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span>
              <span className="block font-body text-body-sm font-medium text-primary">
                Personalizar horarios por día
              </span>
              <span className="block font-body text-body-sm text-on-surface-variant">
                Define horarios diferentes para días específicos.
              </span>
            </span>
          </button>
        ) : (
          <button
            type="button"
            disabled={pending}
            onClick={() => setCustomizeDays(false)}
            className="font-body text-body-sm font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50"
          >
            Usar horario uniforme
          </button>
        )}
      </div>

      {services.length > 0 ? (
        <>
          <Separator />
          <div className="space-y-4">
            <div className="space-y-0.5">
              <p className="font-body text-body-sm font-medium text-on-surface">
                Servicios asignados
              </p>
              <p className="font-body text-body-sm text-on-surface-variant">
                Selecciona los servicios que puede realizar este empleado.
              </p>
            </div>
            <div className="space-y-2">
              {services.map((service) => (
                <EmployeeServiceCheckbox key={service.id} service={service} disabled={pending} />
              ))}
            </div>
          </div>
        </>
      ) : null}

      <BookingEditModalFooter
        deleteLabel="Eliminar empleado"
        onDelete={remove}
        onCancel={closeEdit}
        onSave={saveAll}
        pending={pending}
        saveDisabled={!name.trim()}
      />
    </div>
  );
}
