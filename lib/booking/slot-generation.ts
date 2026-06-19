import { addMinutes } from "@/lib/booking/overlap";
import { parseTimeOnDate } from "@/lib/booking/timezone";

export function generateRawSlots(params: {
  date: string;
  timezone: string;
  startTime: string;
  endTime: string;
  granularityMinutes: number;
  totalBlockMinutes: number;
}) {
  const { date, timezone, startTime, endTime, granularityMinutes, totalBlockMinutes } = params;
  const windowStart = parseTimeOnDate(date, startTime, timezone);
  const windowEnd = parseTimeOnDate(date, endTime, timezone);
  const lastStart = addMinutes(windowEnd, -totalBlockMinutes);

  const slots: { startsAt: Date; endsAt: Date }[] = [];
  let cursor = windowStart;

  while (cursor <= lastStart) {
    const endsAt = addMinutes(cursor, totalBlockMinutes);
    slots.push({ startsAt: new Date(cursor), endsAt });
    cursor = addMinutes(cursor, granularityMinutes);
  }

  return slots;
}
