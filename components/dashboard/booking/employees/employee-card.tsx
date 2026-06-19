"use client";

import type { Employee, EmployeeHours } from "@/db/schema";
import type { BookingService } from "@/db/schema";
import { Panel } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { EmployeeActiveBadge } from "@/components/dashboard/booking/employees/employee-active-badge";
import { EmployeeActionsMenu } from "@/components/dashboard/booking/employees/employee-actions-menu";
import { buildHourDrafts, formatScheduleLine } from "@/lib/employee-schedule";
import { UserRound } from "lucide-react";

export function EmployeeCard({
  employee,
  hours,
  serviceIds,
  services,
  disabled,
  onEdit,
}: {
  employee: Employee;
  hours: EmployeeHours[];
  serviceIds: string[];
  services: BookingService[];
  disabled: boolean;
  onEdit: () => void;
}) {
  const hourDrafts = buildHourDrafts(hours);
  const scheduleLine =
    hours.length > 0 ? formatScheduleLine(hourDrafts) : "Sin horario configurado";
  const assignedServices = services
    .filter((service) => serviceIds.includes(service.id))
    .map((service) => service.name);

  return (
    <Panel className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-high">
            <UserRound className="h-5 w-5 text-on-surface-variant" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-body text-body-md font-medium text-on-surface">
              {employee.name}
            </p>
          </div>
        </div>
        <EmployeeActiveBadge active={employee.isActive} />
      </div>

      <div className="mt-5 space-y-2">
        <div>
          <p className="font-body text-body-sm text-on-surface-variant">Horario</p>
          <p className="font-body text-body-sm font-medium text-on-surface">{scheduleLine}</p>
        </div>
        <div>
          <p className="font-body text-body-sm text-on-surface-variant">Servicios</p>
          <p className="font-body text-body-sm font-medium text-on-surface">
            {assignedServices.length > 0 ? assignedServices.join(", ") : "Ninguno asignado"}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-2">
        <Button variant="outline" disabled={disabled} onClick={onEdit}>
          Editar
        </Button>
        <EmployeeActionsMenu
          employee={employee}
          hourDrafts={hourDrafts}
          disabled={disabled}
          onEdit={onEdit}
        />
      </div>
    </Panel>
  );
}
