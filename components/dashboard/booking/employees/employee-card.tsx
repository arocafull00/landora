"use client";

import type { BookingService, Employee, EmployeeHours } from "@/lib/domain/dtos";
import { Panel } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { EmployeeActiveBadge } from "@/components/dashboard/booking/employees/employee-active-badge";
import { EmployeeCardActions } from "@/components/dashboard/booking/employees/employee-card-actions";
import { EmployeeQuickEdit } from "@/components/dashboard/booking/employees/employee-quick-edit";
import { buildHourDrafts, formatScheduleLine } from "@/lib/employee-schedule";
import { useEmployeeEditorStore } from "@/stores/employee-editor-store";
import { ChevronDown, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmployeeCard({
  employee,
  hours,
  serviceIds,
  services,
  disabled,
  expanded,
  onExpandedChange,
}: {
  employee: Employee;
  hours: EmployeeHours[];
  serviceIds: string[];
  services: BookingService[];
  disabled: boolean;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}) {
  const initInlineEdit = useEmployeeEditorStore((s) => s.initInlineEdit);
  const closeEdit = useEmployeeEditorStore((s) => s.closeEdit);
  const hourDrafts = buildHourDrafts(hours);
  const scheduleLine =
    hours.length > 0 ? formatScheduleLine(hourDrafts) : "Sin horario configurado";
  const serviceNameById = new Map(services.map((service) => [service.id, service.name]));
  const assignedServices = serviceIds
    .map((serviceId) => serviceNameById.get(serviceId))
    .filter((name): name is string => Boolean(name));

  const toggleExpanded = () => {
    if (expanded) {
      closeEdit();
      onExpandedChange(false);
      return;
    }

    initInlineEdit(employee, hours, serviceIds);
    onExpandedChange(true);
  };

  return (
    <Panel className="overflow-hidden p-0">
      <div className="p-5">
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
          <div className="flex shrink-0 items-center gap-2">
            <EmployeeActiveBadge active={employee.isActive} />
            <Button
              variant="ghost"
              size="icon"
              disabled={disabled}
              onClick={toggleExpanded}
              aria-expanded={expanded}
              aria-label={expanded ? "Contraer" : "Expandir"}
            >
              <ChevronDown
                className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
              />
            </Button>
          </div>
        </div>

        {!expanded ? (
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
        ) : null}
      </div>

      {expanded ? (
        <div className="px-5 pb-5">
          <EmployeeQuickEdit
            employee={employee}
            services={services}
            disabled={disabled}
            onSaved={() => {
              closeEdit();
              onExpandedChange(false);
            }}
            actions={
              <EmployeeCardActions
                employee={employee}
                hourDrafts={hourDrafts}
                disabled={disabled}
              />
            }
          />
        </div>
      ) : null}
    </Panel>
  );
}
