"use client";

import { useMemo } from "react";
import type { EmployeeOptionDto } from "@/lib/booking/dtos";
import { AgendaFilterPill } from "@/components/dashboard/booking/bookings/agenda-filter-pill";
import {
  AGENDA_COLOR_DEFINITIONS,
  buildCalendarsConfig,
} from "@/lib/booking/agenda-calendars";

export function AgendaEmployeeFilter({
  employees,
  selectedEmployeeId,
  onChange,
}: {
  employees: EmployeeOptionDto[];
  selectedEmployeeId: string | null;
  onChange: (id: string | null) => void;
}) {
  const calendarsConfig = useMemo(
    () => buildCalendarsConfig(employees),
    [employees],
  );

  return (
    <div className="flex flex-wrap gap-2 rounded-lg border border-outline-variant bg-surface-container p-2">
      <AgendaFilterPill
        label="Todos"
        active={selectedEmployeeId === null}
        onClick={() => onChange(null)}
      />
      {employees.map((employee) => {
        const colorName = calendarsConfig[employee.id]?.colorName ?? "emerald";
        const color = AGENDA_COLOR_DEFINITIONS[colorName];
        return (
          <AgendaFilterPill
            key={employee.id}
            label={employee.name}
            active={selectedEmployeeId === employee.id}
            color={color.main}
            onClick={() => onChange(employee.id)}
          />
        );
      })}
    </div>
  );
}
