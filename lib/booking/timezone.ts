import { endOfWeek, format, parseISO, startOfWeek } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";

export function getDayBoundsInUtc(date: string, timezone: string) {
  const localStart = parseISO(`${date}T00:00:00`);
  const localEnd = parseISO(`${date}T23:59:59.999`);
  return {
    dayStart: fromZonedTime(localStart, timezone),
    dayEnd: fromZonedTime(localEnd, timezone),
  };
}

export function getWeekBoundsInUtc(date: string, timezone: string) {
  const localDate = parseISO(`${date}T12:00:00`);
  const weekStart = startOfWeek(localDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(localDate, { weekStartsOn: 1 });
  const localStart = parseISO(`${format(weekStart, "yyyy-MM-dd")}T00:00:00`);
  const localEnd = parseISO(`${format(weekEnd, "yyyy-MM-dd")}T23:59:59.999`);
  return {
    weekStart: fromZonedTime(localStart, timezone),
    weekEnd: fromZonedTime(localEnd, timezone),
  };
}

export function parseTimeOnDate(date: string, time: string, timezone: string) {
  return fromZonedTime(parseISO(`${date}T${time}:00`), timezone);
}

export function getDayOfWeekInTimezone(date: string, timezone: string) {
  const zoned = toZonedTime(parseISO(`${date}T12:00:00`), timezone);
  return zoned.getDay();
}

export function formatDateInTimezone(date: Date, timezone: string, pattern = "yyyy-MM-dd") {
  const zoned = toZonedTime(date, timezone);
  const year = zoned.getFullYear();
  const month = String(zoned.getMonth() + 1).padStart(2, "0");
  const day = String(zoned.getDate()).padStart(2, "0");
  if (pattern === "yyyy-MM-dd") {
    return `${year}-${month}-${day}`;
  }
  return `${year}-${month}-${day}`;
}
