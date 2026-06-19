"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Booking, Employee } from "@/db/schema";
import { AgendaDayNav } from "@/components/dashboard/booking/bookings/agenda-day-nav";
import { AgendaGrid } from "@/components/dashboard/booking/bookings/agenda-grid";

export function BookingsAgenda({
  bookings,
  employees,
  timezone,
  date,
}: {
  bookings: (Booking & { employee: Employee | null })[];
  employees: Employee[];
  timezone: string;
  date: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigate = (nextDate: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", "agenda");
    params.set("date", nextDate);
    router.push(`/bookings?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <AgendaDayNav date={date} onNavigate={navigate} />
      <AgendaGrid bookings={bookings} employees={employees} timezone={timezone} date={date} />
    </div>
  );
}
