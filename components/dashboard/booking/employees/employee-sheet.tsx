"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import type { BookingService, Employee, EmployeeHours } from "@/db/schema";
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

type HourDraft = {
  dayOfWeek: number;
  isWorking: boolean;
  startTime: string;
  endTime: string;
};

function buildDefaultHours(existing: EmployeeHours[]): HourDraft[] {
  return Array.from({ length: 7 }, (_, dayOfWeek) => {
    const row = existing.find((h) => h.dayOfWeek === dayOfWeek);
    if (!row) {
      return {
        dayOfWeek,
        isWorking: dayOfWeek >= 1 && dayOfWeek <= 5,
        startTime: "09:00",
        endTime: "18:00",
      };
    }
    return {
      dayOfWeek: row.dayOfWeek,
      isWorking: row.isWorking,
      startTime: row.startTime,
      endTime: row.endTime,
    };
  });
}

export function EmployeeSheet({
  employee,
  services,
  hours,
  assignedServiceIds,
  dayLabels,
  open,
  onOpenChange,
}: {
  employee: Employee;
  services: BookingService[];
  hours: EmployeeHours[];
  assignedServiceIds: string[];
  dayLabels: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [name, setName] = useState(employee.name);
  const [hourDrafts, setHourDrafts] = useState<HourDraft[]>(() => buildDefaultHours(hours));
  const [serviceIds, setServiceIds] = useState<string[]>(assignedServiceIds);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setName(employee.name);
    setHourDrafts(buildDefaultHours(hours));
    setServiceIds(assignedServiceIds);
  }, [employee, hours, assignedServiceIds]);

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
      onOpenChange(false);
      router.refresh();
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
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
                label={dayLabels[row.dayOfWeek] ?? ""}
                row={row}
                disabled={pending}
                onChange={(next) =>
                  setHourDrafts((current) =>
                    current.map((h) => (h.dayOfWeek === row.dayOfWeek ? next : h)),
                  )
                }
              />
            ))}
          </div>
          <div className="space-y-2">
            <p className="font-body text-body-sm font-medium text-on-surface">Servicios</p>
            {services.map((service) => (
              <EmployeeServiceCheckbox
                key={service.id}
                service={service}
                checked={serviceIds.includes(service.id)}
                disabled={pending}
                onCheckedChange={(checked) => {
                  setServiceIds((current) =>
                    checked
                      ? [...current, service.id]
                      : current.filter((id) => id !== service.id),
                  );
                }}
              />
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
