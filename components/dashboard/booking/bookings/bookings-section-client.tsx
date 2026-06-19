"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { Booking, BookingStatus, Employee } from "@/db/schema";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingsList } from "@/components/dashboard/booking/bookings/bookings-list";
import { BookingsAgenda } from "@/components/dashboard/booking/bookings/bookings-agenda";
import { BookingsFilters } from "@/components/dashboard/booking/bookings/bookings-filters";

export function BookingsSectionClient({
  bookings,
  employees,
  timezone,
  view,
  date,
  status,
  employeeId,
}: {
  bookings: (Booking & { employee: Employee | null })[];
  employees: Employee[];
  timezone: string;
  view: string;
  date: string;
  status: BookingStatus | "";
  employeeId: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setView = (nextView: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", nextView);
    router.push(`/bookings?${params.toString()}`);
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <DashboardPageHeader
        title="Reservas"
        description="Consulta y gestiona las reservas de tu negocio."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/settings/booking">Ajustes</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/settings/blocked-periods">Bloqueos</Link>
            </Button>
          </div>
        }
      />
      <div className="flex-1 overflow-auto p-unit-lg">
        <div className="mx-auto max-w-6xl space-y-4">
          <Tabs value={view} onValueChange={setView}>
            <TabsList>
              <TabsTrigger value="list">Lista</TabsTrigger>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="space-y-4">
              <BookingsFilters employees={employees} status={status} employeeId={employeeId} />
              <BookingsList bookings={bookings} timezone={timezone} />
            </TabsContent>
            <TabsContent value="agenda">
              <BookingsAgenda
                bookings={bookings}
                employees={employees}
                timezone={timezone}
                date={date}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
