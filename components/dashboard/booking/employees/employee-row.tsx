"use client";

import type { Employee } from "@/db/schema";
import { Panel } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function EmployeeRow({
  employee,
  disabled,
  onSelect,
}: {
  employee: Employee;
  disabled: boolean;
  onSelect: () => void;
}) {
  return (
    <Panel className="flex items-center justify-between p-4">
      <div>
        <p className="font-body text-body-md font-medium text-on-surface">{employee.name}</p>
        <p className="font-body text-body-sm text-on-surface-variant">
          {employee.isActive ? "Activo" : "Inactivo"}
        </p>
      </div>
      <Button variant="ghost" size="icon" disabled={disabled} onClick={onSelect}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </Panel>
  );
}
