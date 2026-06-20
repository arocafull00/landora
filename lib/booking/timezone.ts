import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { parseISO } from "date-fns";

export function getDayBoundsInUtc(date: string, timezone: string) {
  const localStart = parseISO(`${date}T00:00:00`);
  const localEnd = parseISO(`${date}T23:59:59.999`);
  return {
    dayStart: fromZonedTime(localStart, timezone),
    dayEnd: fromZonedTime(localEnd, timezone),
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

function getNowInTimezone(timezone: string) {
  return toZonedTime(new Date(), timezone);
}
