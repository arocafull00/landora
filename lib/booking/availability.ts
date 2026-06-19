import { getBookingSettings } from "@/data/booking-settings";
import { getBookingServiceById } from "@/data/booking-services";
import { getEmployeesForService } from "@/data/employee-services";
import { getEmployeeById } from "@/data/employees";
import { getEmployeeHoursForDay } from "@/data/employee-hours";
import { getBlockedPeriods } from "@/data/blocked-periods";
import { getActiveBookingsForEmployeeInRange } from "@/data/bookings";
import { generateRawSlots } from "@/lib/booking/slot-generation";
import { slotOverlapsAny, addMinutes } from "@/lib/booking/overlap";
import {
  getDayBoundsInUtc,
  getDayOfWeekInTimezone,
} from "@/lib/booking/timezone";

export type AvailableSlot = {
  startsAt: Date;
  endsAt: Date;
  employeeId: string;
};

export async function getAvailableSlots(params: {
  tenantId: string;
  serviceId: string;
  employeeId: string | "any";
  date: string;
  timezone: string;
}): Promise<AvailableSlot[]> {
  const { tenantId, serviceId, employeeId, date, timezone } = params;

  const settings = await getBookingSettings(tenantId);
  if (!settings.enabled) {
    return [];
  }

  const service = await getBookingServiceById(tenantId, serviceId);
  if (!service || !service.isActive) {
    return [];
  }

  const totalBlockMinutes = service.durationMinutes + service.bufferAfterMinutes;
  const { dayStart, dayEnd } = getDayBoundsInUtc(date, timezone);
  const dayOfWeek = getDayOfWeekInTimezone(date, timezone);
  const now = new Date();
  const minAdvanceMs = settings.minAdvanceHours * 60 * 60 * 1000;
  const maxAdvanceDate = new Date(now.getTime() + settings.maxAdvanceDays * 24 * 60 * 60 * 1000);

  let candidates: { id: string; createdAt: Date | null }[] = [];

  if (employeeId === "any") {
    const employees = await getEmployeesForService(tenantId, serviceId);
    candidates = employees.map((e) => ({ id: e.id, createdAt: e.createdAt }));
  } else {
    const employee = await getEmployeeById(tenantId, employeeId);
    if (!employee || !employee.isActive) {
      return [];
    }
    const serviceEmployees = await getEmployeesForService(tenantId, serviceId);
    const offersService = serviceEmployees.some((e) => e.id === employeeId);
    if (!offersService) {
      return [];
    }
    candidates = [{ id: employee.id, createdAt: employee.createdAt }];
  }

  const allSlots: AvailableSlot[] = [];

  for (const candidate of candidates) {
    const hours = await getEmployeeHoursForDay(tenantId, candidate.id, dayOfWeek);
    if (!hours || !hours.isWorking) {
      continue;
    }

    const blockedPeriods = await getBlockedPeriods(tenantId, {
      rangeStart: dayStart,
      rangeEnd: dayEnd,
      employeeId: candidate.id,
    });

    const existingBookings = await getActiveBookingsForEmployeeInRange(
      tenantId,
      candidate.id,
      dayStart,
      dayEnd,
    );

    const blockers = [
      ...blockedPeriods.map((bp) => ({ startsAt: bp.startsAt, endsAt: bp.endsAt })),
      ...existingBookings.map((b) => ({
        startsAt: b.startsAt,
        endsAt: addMinutes(b.endsAt, service.bufferAfterMinutes),
      })),
    ];

    const rawSlots = generateRawSlots({
      date,
      timezone,
      startTime: hours.startTime,
      endTime: hours.endTime,
      granularityMinutes: settings.slotGranularityMinutes,
      totalBlockMinutes,
    });

    for (const slot of rawSlots) {
      if (slot.startsAt.getTime() < now.getTime() + minAdvanceMs) {
        continue;
      }
      if (slot.startsAt.getTime() > maxAdvanceDate.getTime()) {
        continue;
      }
      if (slotOverlapsAny(slot, blockers)) {
        continue;
      }
      allSlots.push({
        startsAt: slot.startsAt,
        endsAt: addMinutes(slot.startsAt, service.durationMinutes),
        employeeId: candidate.id,
      });
    }
  }

  if (employeeId === "any") {
    const byStart = new Map<string, AvailableSlot>();
    const sorted = [...allSlots].sort((a, b) => {
      const timeDiff = a.startsAt.getTime() - b.startsAt.getTime();
      if (timeDiff !== 0) {
        return timeDiff;
      }
      const aCreated = candidates.find((c) => c.id === a.employeeId)?.createdAt?.getTime() ?? 0;
      const bCreated = candidates.find((c) => c.id === b.employeeId)?.createdAt?.getTime() ?? 0;
      return aCreated - bCreated;
    });

    for (const slot of sorted) {
      const key = slot.startsAt.toISOString();
      if (!byStart.has(key)) {
        byStart.set(key, slot);
      }
    }
    return Array.from(byStart.values()).sort(
      (a, b) => a.startsAt.getTime() - b.startsAt.getTime(),
    );
  }

  return allSlots.sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());
}
