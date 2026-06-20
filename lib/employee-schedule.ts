import type { EmployeeHours } from "@/db/schema";

export type HourDraft = {
  dayOfWeek: number;
  isWorking: boolean;
  startTime: string;
  endTime: string;
};

export const DAY_LABELS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export const DAY_LETTERS: Record<number, string> = {
  0: "D",
  1: "L",
  2: "M",
  3: "X",
  4: "J",
  5: "V",
  6: "S",
};

export const DISPLAY_DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];

export const DEFAULT_HOUR_DRAFTS: HourDraft[] = Array.from({ length: 7 }, (_, dayOfWeek) => ({
  dayOfWeek,
  isWorking: dayOfWeek >= 1 && dayOfWeek <= 5,
  startTime: "09:00",
  endTime: "18:00",
}));

export function buildHourDrafts(existing: EmployeeHours[]): HourDraft[] {
  return Array.from({ length: 7 }, (_, dayOfWeek) => {
    const row = existing.find((h) => h.dayOfWeek === dayOfWeek);
    if (!row) {
      const fallback = DEFAULT_HOUR_DRAFTS[dayOfWeek];
      return { ...fallback };
    }
    return {
      dayOfWeek: row.dayOfWeek,
      isWorking: row.isWorking,
      startTime: row.startTime,
      endTime: row.endTime,
    };
  });
}

export function isUniformSchedule(hourDrafts: HourDraft[]): boolean {
  const working = hourDrafts.filter((h) => h.isWorking);
  if (working.length === 0) {
    return true;
  }
  const { startTime, endTime } = working[0];
  return working.every((h) => h.startTime === startTime && h.endTime === endTime);
}

function formatDayRange(workingDays: number[]): string {
  if (workingDays.length === 0) {
    return "Sin horario";
  }

  const sorted = [...workingDays].toSorted((a, b) => {
    const orderA = a === 0 ? 7 : a;
    const orderB = b === 0 ? 7 : b;
    return orderA - orderB;
  });

  const normalized = sorted.map((d) => (d === 0 ? 7 : d));
  let isConsecutive = normalized.length >= 2;
  for (let i = 1; i < normalized.length; i++) {
    if (normalized[i] !== normalized[i - 1] + 1) {
      isConsecutive = false;
      break;
    }
  }

  if (isConsecutive) {
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    return `${DAY_LETTERS[first]}-${DAY_LETTERS[last]}`;
  }

  if (sorted.length === 1) {
    return DAY_LABELS[sorted[0]];
  }

  return "Horario personalizado";
}

function getScheduleSummary(hourDrafts: HourDraft[]): {
  headline: string;
  detail: string;
  isCustom: boolean;
} {
  const working = hourDrafts.filter((h) => h.isWorking);
  if (working.length === 0) {
    return { headline: "Sin horario", detail: "", isCustom: false };
  }

  if (isUniformSchedule(hourDrafts)) {
    const range = formatDayRange(working.map((h) => h.dayOfWeek));
    const { startTime, endTime } = working[0];
    return {
      headline: range,
      detail: `${startTime} - ${endTime}`,
      isCustom: false,
    };
  }

  return {
    headline: "Horario personalizado",
    detail: `${working.length} días / semana`,
    isCustom: true,
  };
}

export function formatScheduleLine(hourDrafts: HourDraft[]): string {
  const summary = getScheduleSummary(hourDrafts);
  if (!summary.detail) {
    return summary.headline;
  }
  if (summary.isCustom) {
    return `${summary.headline} · ${summary.detail}`;
  }
  return `${summary.headline} · ${summary.detail}`;
}
