"use client";

import { useEffect, useState } from "react";
import type { BookingService, Employee, EmployeeHours } from "@/db/schema";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import { EmployeeCard } from "@/components/dashboard/booking/employees/employee-card";
import { EmployeeCreateDialog } from "@/components/dashboard/booking/employees/employee-create-dialog";
import { useEmployeeEditorStore } from "@/stores/employee-editor-store";

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
  const [createOpen, setCreateOpen] = useState(false);
  const [expandedEmployeeId, setExpandedEmployeeId] = useState<string | null>(null);
  const setServices = useEmployeeEditorStore((s) => s.setServices);
  const closeEdit = useEmployeeEditorStore((s) => s.closeEdit);

  useEffect(() => {
    setServices(services);
  }, [services, setServices]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <DashboardPageHeader
        title="Empleados"
        description="Profesionales, horarios y servicios de tu negocio."
        actions={
          <Button onClick={() => setCreateOpen(true)}>Nuevo empleado</Button>
        }
      />
      <div className="flex-1 overflow-auto p-unit-lg">
        <div className="mx-auto max-w-3xl space-y-4">
          {employees.length === 0 ? (
            <p className="font-body text-body-md text-on-surface-variant">
              No hay empleados todavía. Crea el primero para empezar.
            </p>
          ) : (
            employees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                hours={hoursByEmployee[employee.id] ?? []}
                serviceIds={servicesByEmployee[employee.id] ?? []}
                services={services}
                disabled={false}
                expanded={expandedEmployeeId === employee.id}
                onExpandedChange={(next) => {
                  if (!next) {
                    if (expandedEmployeeId === employee.id) {
                      closeEdit();
                      setExpandedEmployeeId(null);
                    }
                    return;
                  }
                  setExpandedEmployeeId(employee.id);
                }}
              />
            ))
          )}
        </div>
      </div>
      <EmployeeCreateDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}
