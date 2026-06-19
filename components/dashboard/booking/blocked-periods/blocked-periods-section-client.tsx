"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import type { BlockedPeriod, Employee } from "@/db/schema";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import { BlockedPeriodRow } from "@/components/dashboard/booking/blocked-periods/blocked-period-row";
import { BlockedPeriodDialog } from "@/components/dashboard/booking/blocked-periods/blocked-period-dialog";

export function BlockedPeriodsSectionClient({
  periods,
  employees,
}: {
  periods: BlockedPeriod[];
  employees: Employee[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <DashboardPageHeader
        title="Bloqueos"
        description="Bloquea horarios globalmente o por empleado."
        actions={
          <Button onClick={() => setOpen(true)} disabled={pending}>
            Nuevo bloqueo
          </Button>
        }
      />
      <div className="flex-1 overflow-auto p-unit-lg">
        <div className="mx-auto max-w-3xl space-y-3">
          {periods.length === 0 ? (
            <p className="font-body text-body-md text-on-surface-variant">
              No hay bloqueos configurados.
            </p>
          ) : (
            periods.map((period) => (
              <BlockedPeriodRow
                key={period.id}
                period={period}
                employees={employees}
                disabled={pending}
                onChanged={() => router.refresh()}
              />
            ))
          )}
        </div>
      </div>
      <BlockedPeriodDialog
        open={open}
        employees={employees}
        onOpenChange={setOpen}
        onSaved={() => {
          setOpen(false);
          router.refresh();
        }}
      />
    </div>
  );
}
