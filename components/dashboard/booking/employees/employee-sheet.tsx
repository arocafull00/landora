"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { EmployeeHoursRow } from "@/components/dashboard/booking/employees/employee-hours-row";
import { EmployeeServiceCheckbox } from "@/components/dashboard/booking/employees/employee-service-checkbox";
import {
  deleteEmployeeAction,
  replaceEmployeeHoursAction,
  replaceEmployeeServicesAction,
  setEmployeeActiveAction,
  updateEmployeeAction,
} from "@/app/actions/employees";
import { useEmployeeSheetStore } from "@/stores/employee-sheet-store";

export function EmployeeSheet() {
  const router = useRouter();
  const open = useEmployeeSheetStore((s) => s.open);
  const employee = useEmployeeSheetStore((s) => s.employee);
  const services = useEmployeeSheetStore((s) => s.services);
  const dayLabels = useEmployeeSheetStore((s) => s.dayLabels);
  const name = useEmployeeSheetStore((s) => s.name);
  const hourDrafts = useEmployeeSheetStore((s) => s.hourDrafts);
  const serviceIds = useEmployeeSheetStore((s) => s.serviceIds);
  const closeSheet = useEmployeeSheetStore((s) => s.closeSheet);
  const setName = useEmployeeSheetStore((s) => s.setName);
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
      closeSheet();
      router.refresh();
    });
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      closeSheet();
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Empleado</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <div className="flex items-center justify-between">
            <span className="font-body text-body-sm text-on-surface">Activo</span>
            <Switch checked={employee.isActive} disabled={pending} onCheckedChange={toggleActive} />
          </div>
          <div className="space-y-2">
            <p className="font-body text-body-sm font-medium text-on-surface">Horario semanal</p>
            {hourDrafts.map((row) => (
              <EmployeeHoursRow
                key={row.dayOfWeek}
                dayOfWeek={row.dayOfWeek}
                label={dayLabels[row.dayOfWeek] ?? ""}
                disabled={pending}
              />
            ))}
          </div>
          <div className="space-y-2">
            <p className="font-body text-body-sm font-medium text-on-surface">Servicios</p>
            {services.map((service) => (
              <EmployeeServiceCheckbox key={service.id} service={service} disabled={pending} />
            ))}
          </div>
          <div className="flex gap-2">
            <Button onClick={saveAll} disabled={pending}>
              Guardar
            </Button>
            <Button variant="destructive" onClick={remove} disabled={pending}>
              Eliminar
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
