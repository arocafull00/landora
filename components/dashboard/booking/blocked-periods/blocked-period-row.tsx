"use client";

import { useTransition } from "react";
import { toast } from "react-toastify";
import type { BlockedPeriod, Employee } from "@/lib/domain/dtos";
import { Panel } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { deleteBlockedPeriodAction } from "@/app/actions/blocked-periods";

export function BlockedPeriodRow({
  period,
  employees,
  disabled,
  onChanged,
}: {
  period: BlockedPeriod;
  employees: Employee[];
  disabled: boolean;
  onChanged: () => void;
}) {
  const [pending, startTransition] = useTransition();

  const employeeName =
    period.employeeId === null
      ? "Global"
      : employees.find((e) => e.id === period.employeeId)?.name ?? "Empleado";

  const remove = () => {
    startTransition(async () => {
      const result = await deleteBlockedPeriodAction(period.id);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      toast.success("Bloqueo eliminado");
      onChanged();
    });
  };

  return (
    <Panel className="flex items-center justify-between gap-3 p-4">
      <div>
        <p className="font-body text-body-md font-medium text-on-surface">{employeeName}</p>
        <p className="font-body text-body-sm text-on-surface-variant">
          {period.startsAt.toLocaleString("es-ES")} – {period.endsAt.toLocaleString("es-ES")}
        </p>
        {period.reason ? (
          <p className="font-body text-body-sm text-on-surface-variant">{period.reason}</p>
        ) : null}
      </div>
      <Button variant="destructive" size="sm" disabled={disabled || pending} onClick={remove}>
        Eliminar
      </Button>
    </Panel>
  );
}
