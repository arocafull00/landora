import { formatInTimeZone } from "date-fns-tz";
import { es } from "date-fns/locale";

export function formatBookingDateTime(date: Date, timezone: string) {
  return formatInTimeZone(date, timezone, "d MMM yyyy, HH:mm", { locale: es });
}

export function formatSlotTime(startsAt: string) {
  return formatInTimeZone(new Date(startsAt), "UTC", "HH:mm", { locale: es });
}

export function formatSummaryDate(date: string) {
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }
  return formatInTimeZone(parsed, "UTC", "EEE d MMM", { locale: es });
}

export function formatSummaryTime(startsAt: string) {
  return formatInTimeZone(new Date(startsAt), "UTC", "HH:mm", { locale: es });
}

export function formatLongDate(date: Date | null | undefined) {
  if (!date) {
    return "—";
  }
  return formatInTimeZone(date, "UTC", "d 'de' MMMM 'de' yyyy", { locale: es });
}

export function formatFullDateTime(date: Date, timezone: string) {
  return formatInTimeZone(date, timezone, "EEEE d 'de' MMMM 'de' yyyy, HH:mm", { locale: es });
}
