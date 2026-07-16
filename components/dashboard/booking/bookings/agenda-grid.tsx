"use client";

import type { Booking, Employee } from "@/lib/domain/dtos";
import { useState, useMemo, useEffect } from "react";
import { useNextCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
  createViewMonthAgenda,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { toZonedTime } from "date-fns-tz";
import "temporal-polyfill/global";
import "@schedule-x/theme-default/dist/index.css";
import { AgendaEmployeeFilter } from "@/components/dashboard/booking/bookings/agenda-employee-filter";
import { buildCalendarsConfig } from "@/lib/booking/agenda-calendars";

function toTemporalZonedDateTime(date: Date, timezone: string) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const iso = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}[${timezone}]`;
  return Temporal.ZonedDateTime.from(iso);
}

function bookingToCalendarEvent(
  booking: Booking & { employee: Employee | null },
  timezone: string,
) {
  const zonedStart = toZonedTime(booking.startsAt, timezone);
  const zonedEnd = toZonedTime(booking.endsAt, timezone);

  return {
    id: booking.id,
    title: booking.customerName,
    start: toTemporalZonedDateTime(zonedStart, timezone),
    end: toTemporalZonedDateTime(zonedEnd, timezone),
    calendarId: booking.employeeId,
  };
}

export function AgendaGrid({
  bookings,
  employees,
  timezone,
}: {
  bookings: (Booking & { employee: Employee | null })[];
  employees: Employee[];
  timezone: string;
}) {
  const activeEmployees = useMemo(
    () => employees.filter((e) => e.isActive),
    [employees],
  );

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null,
  );

  const allEvents = useMemo(
    () => bookings.map((b) => bookingToCalendarEvent(b, timezone)),
    [bookings, timezone],
  );

  const calendarsConfig = useMemo(
    () => buildCalendarsConfig(activeEmployees),
    [activeEmployees],
  );

  const eventsService = useState(() => createEventsServicePlugin())[0];

  const calendar = useNextCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    defaultView: createViewWeek().name,
    events: allEvents,
    calendars: calendarsConfig,
    locale: "es-ES",
    timezone,
    dayBoundaries: {
      start: "08:00",
      end: "22:00",
    },
    plugins: [eventsService],
  });

  useEffect(() => {
    const filtered =
      selectedEmployeeId === null
        ? allEvents
        : allEvents.filter((e) => e.calendarId === selectedEmployeeId);

    eventsService.set(filtered);
  }, [allEvents, selectedEmployeeId, eventsService]);

  if (activeEmployees.length === 0) {
    return (
      <p className="font-body text-body-md text-on-surface-variant">
        No hay empleados activos para mostrar la agenda.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <AgendaEmployeeFilter
        employees={activeEmployees}
        selectedEmployeeId={selectedEmployeeId}
        onChange={setSelectedEmployeeId}
      />
      <div className="sx-react-calendar-wrapper" style={{ height: "720px" }}>
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
    </div>
  );
}
