"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import type { BookingService, Employee, EmployeeHours } from "@/db/schema";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmployeeRow } from "@/components/dashboard/booking/employees/employee-row";
import { EmployeeSheet } from "@/components/dashboard/booking/employees/employee-sheet";
import { createEmployeeAction } from "@/app/actions/employees";

const DAY_LABELS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export function EmployeesSectionClient({
  employees,
  services,
  hoursByEmployee,
  servicesByEmployee,
}: {
  employees: Employee[];
  services: BookingService[];
  hoursByEmployee: Record<string, EmployeeHours[]>;
  servicesByEmployee: Record<string, string[]>;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const selected = employees.find((e) => e.id === selectedId) ?? null;

  const create = () => {
    startTransition(async () => {
      const result = await createEmployeeAction(name);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      toast.success("Empleado creado");
      setName("");
      router.refresh();
    });
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <DashboardPageHeader
        title="Empleados"
        description="Gestiona profesionales, horarios y servicios asignados."
      />
      <div className="flex-1 overflow-auto p-unit-lg">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="flex gap-2">
            <Input
              placeholder="Nombre del empleado"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={create} disabled={pending || !name.trim()}>
              Añadir
            </Button>
          </div>
          <div className="space-y-3">
            {employees.length === 0 ? (
              <p className="font-body text-body-md text-on-surface-variant">
                No hay empleados todavía.
              </p>
            ) : (
              employees.map((employee) => (
                <EmployeeRow
                  key={employee.id}
                  employee={employee}
                  disabled={pending}
                  onSelect={() => setSelectedId(employee.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>
      {selected ? (
        <EmployeeSheet
          employee={selected}
          services={services}
          hours={hoursByEmployee[selected.id] ?? []}
          assignedServiceIds={servicesByEmployee[selected.id] ?? []}
          dayLabels={DAY_LABELS}
          open={Boolean(selectedId)}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedId(null);
            }
          }}
        />
      ) : null}
    </div>
  );
}
