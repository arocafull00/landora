"use client";

import type { Booking, Employee } from "@/db/schema";
import { AgendaGrid } from "@/components/dashboard/booking/bookings/agenda-grid";

export function BookingsAgenda({
  bookings,
  employees,
  timezone,
}: {
  bookings: (Booking & { employee: Employee | null })[];
  employees: Employee[];
  timezone: string;
}) {
  return (
    <AgendaGrid bookings={bookings} employees={employees} timezone={timezone} />
  );
}
