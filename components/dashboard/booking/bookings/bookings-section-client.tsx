"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Booking, BookingSettings, BookingStatus, Employee } from "@/db/schema";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { BookingSettingsModal } from "@/components/dashboard/booking/booking-settings-modal";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/primitives";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingsList } from "@/components/dashboard/booking/bookings/bookings-list";
import { BookingsAgenda } from "@/components/dashboard/booking/bookings/bookings-agenda";
import { BookingsFilters } from "@/components/dashboard/booking/bookings/bookings-filters";

export function BookingsSectionClient({
  bookings,
  employees,
  settings,
  view,
  date,
  status,
  employeeId,
}: {
  bookings: (Booking & { employee: Employee | null })[];
  employees: Employee[];
  settings: BookingSettings;
  view: string;
  date: string;
  status: BookingStatus | "";
  employeeId: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    if (!settings.enabled) {
      setSettingsOpen(true);
    }
  }, [settings.enabled]);

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
            <Button variant="outline" onClick={() => setSettingsOpen(true)}>
              Ajustes
            </Button>
            <Button variant="outline" asChild>
              <Link href="/settings/blocked-periods">Bloqueos</Link>
            </Button>
          </div>
        }
      />
      <div className="flex-1 overflow-auto p-unit-lg">
        <div className="mx-auto max-w-6xl space-y-4">
          {!settings.enabled ? (
            <Panel className="flex flex-col items-start gap-4 p-6">
              <div>
                <p className="font-body text-body-md font-medium text-on-surface">
                  Las reservas no están activadas
                </p>
                <p className="mt-1 font-body text-body-sm text-on-surface-variant">
                  Actívalas para que tus clientes puedan reservar desde tu landing.
                </p>
              </div>
              <Button onClick={() => setSettingsOpen(true)}>Configurar reservas</Button>
            </Panel>
          ) : (
            <Tabs value={view} onValueChange={setView}>
              <TabsList>
                <TabsTrigger value="list">Lista</TabsTrigger>
                <TabsTrigger value="agenda">Agenda</TabsTrigger>
              </TabsList>
              <TabsContent value="list" className="space-y-4">
                <BookingsFilters employees={employees} status={status} employeeId={employeeId} />
                <BookingsList bookings={bookings} timezone={settings.timezone} />
              </TabsContent>
              <TabsContent value="agenda">
                <BookingsAgenda
                  bookings={bookings}
                  employees={employees}
                  timezone={settings.timezone}
                  date={date}
                />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
      <BookingSettingsModal
        settings={settings}
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
      />
    </div>
  );
}
