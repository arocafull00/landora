"use client";

import { useEffect, useState } from "react";
import type { BookingService, Employee, EmployeeHours } from "@/db/schema";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { Button } from "@/components/ui/button";
import { EmployeeCard } from "@/components/dashboard/booking/employees/employee-card";
import { EmployeeCreateDialog } from "@/components/dashboard/booking/employees/employee-create-dialog";
import { EmployeeEditPanel } from "@/components/dashboard/booking/employees/employee-edit-panel";
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
  const setServices = useEmployeeEditorStore((s) => s.setServices);
  const openEdit = useEmployeeEditorStore((s) => s.openEdit);

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
                onEdit={() =>
                  openEdit(
                    employee,
                    hoursByEmployee[employee.id] ?? [],
                    servicesByEmployee[employee.id] ?? [],
                  )
                }
              />
            ))
          )}
        </div>
      </div>
      <EmployeeCreateDialog open={createOpen} onOpenChange={setCreateOpen} />
      <EmployeeEditPanel />
    </div>
  );
}
