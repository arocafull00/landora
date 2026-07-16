import type { EmployeeOptionDto } from "@/lib/booking/dtos";

const COLOR_NAMES = [
  "emerald",
  "blue",
  "violet",
  "amber",
  "rose",
  "cyan",
  "lime",
  "fuchsia",
] as const;

export const AGENDA_COLOR_DEFINITIONS: Record<
  string,
  { main: string; container: string; onContainer: string }
> = {
  emerald: {
    main: "var(--agenda-emerald-main)",
    container: "var(--agenda-emerald-container)",
    onContainer: "var(--agenda-emerald-ink)",
  },
  blue: {
    main: "var(--agenda-blue-main)",
    container: "var(--agenda-blue-container)",
    onContainer: "var(--agenda-blue-ink)",
  },
  violet: {
    main: "var(--agenda-violet-main)",
    container: "var(--agenda-violet-container)",
    onContainer: "var(--agenda-violet-ink)",
  },
  amber: {
    main: "var(--agenda-amber-main)",
    container: "var(--agenda-amber-container)",
    onContainer: "var(--agenda-amber-ink)",
  },
  rose: {
    main: "var(--agenda-rose-main)",
    container: "var(--agenda-rose-container)",
    onContainer: "var(--agenda-rose-ink)",
  },
  cyan: {
    main: "var(--agenda-cyan-main)",
    container: "var(--agenda-cyan-container)",
    onContainer: "var(--agenda-cyan-ink)",
  },
  lime: {
    main: "var(--agenda-lime-main)",
    container: "var(--agenda-lime-container)",
    onContainer: "var(--agenda-lime-ink)",
  },
  fuchsia: {
    main: "var(--agenda-fuchsia-main)",
    container: "var(--agenda-fuchsia-container)",
    onContainer: "var(--agenda-fuchsia-ink)",
  },
};

export function buildCalendarsConfig(employees: EmployeeOptionDto[]) {
  const calendars: Record<
    string,
    {
      colorName: string;
      lightColors: { main: string; container: string; onContainer: string };
    }
  > = {};

  employees.forEach((employee, index) => {
    const colorName = COLOR_NAMES[index % COLOR_NAMES.length];
    calendars[employee.id] = {
      colorName,
      lightColors: AGENDA_COLOR_DEFINITIONS[colorName],
    };
  });

  return calendars;
}
