"use client";

import { useMemo } from "react";
import type { Employee } from "@/db/schema";
import { AgendaFilterPill } from "@/components/dashboard/booking/bookings/agenda-filter-pill";

const COLOR_NAMES = [
  "emerald",
  "blue",
  "violet",
  "amber",
  "rose",
  "cyan",
  "lime",
  "fuchsia",
];

export const COLOR_DEFINITIONS: Record<
  string,
  { main: string; container: string; onContainer: string }
> = {
  emerald: { main: "#10b981", container: "#a7f3d0", onContainer: "#02401f" },
  blue: { main: "#3b82f6", container: "#bfdbfe", onContainer: "#1e3a8a" },
  violet: { main: "#8b5cf6", container: "#ddd6fe", onContainer: "#4c1d95" },
  amber: { main: "#f59e0b", container: "#fde68a", onContainer: "#78350f" },
  rose: { main: "#f43f5e", container: "#fecdd3", onContainer: "#881337" },
  cyan: { main: "#06b6d4", container: "#a5f3fc", onContainer: "#164e63" },
  lime: { main: "#84cc16", container: "#d9f99d", onContainer: "#365314" },
  fuchsia: { main: "#d946ef", container: "#f5d0fe", onContainer: "#701a75" },
};

export function buildCalendarsConfig(employees: Employee[]) {
  const calendars: Record<
    string,
    { colorName: string; lightColors: { main: string; container: string; onContainer: string } }
  > = {};

  employees.forEach((employee, index) => {
    const colorName = COLOR_NAMES[index % COLOR_NAMES.length];
    calendars[employee.id] = {
      colorName,
      lightColors: COLOR_DEFINITIONS[colorName],
    };
  });

  return calendars;
}

export function AgendaEmployeeFilter({
  employees,
  selectedEmployeeId,
  onChange,
}: {
  employees: Employee[];
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
        const color = COLOR_DEFINITIONS[colorName];
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
