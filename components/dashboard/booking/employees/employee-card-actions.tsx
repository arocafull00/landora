"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import type { Employee } from "@/db/schema";
import type { HourDraft } from "@/lib/employee-schedule";
import { Button } from "@/components/ui/button";
import {
  deleteEmployeeAction,
  setEmployeeActiveAction,
} from "@/app/actions/employees";
import { useEmployeeEditorStore } from "@/stores/employee-editor-store";
import { Copy } from "lucide-react";

export function EmployeeCardActions({
  employee,
  hourDrafts,
  disabled,
}: {
  employee: Employee;
  hourDrafts: HourDraft[];
  disabled: boolean;
}) {
  const router = useRouter();
  const copyScheduleFrom = useEmployeeEditorStore((s) => s.copyScheduleFrom);
  const closeEdit = useEmployeeEditorStore((s) => s.closeEdit);
  const [pending, startTransition] = useTransition();
  const actionDisabled = disabled || pending;

  const toggleActive = () => {
    const nextActive = !employee.isActive;
    startTransition(async () => {
      const result = await setEmployeeActiveAction(employee.id, nextActive);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      toast.success(nextActive ? "Empleado activado" : "Empleado desactivado");
      router.refresh();
    });
  };

  const copySchedule = () => {
    copyScheduleFrom(hourDrafts, employee.name);
    toast.success(`Horario de ${employee.name} copiado`);
  };

  const remove = () => {
    startTransition(async () => {
      const result = await deleteEmployeeAction(employee.id);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      closeEdit();
      toast.success("Empleado eliminado");
      router.refresh();
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" disabled={actionDisabled} onClick={copySchedule}>
        <Copy className="h-4 w-4" />
        Duplicar horario
      </Button>
      <Button variant="outline" size="sm" disabled={actionDisabled} onClick={toggleActive}>
        {employee.isActive ? "Desactivar" : "Activar"}
      </Button>
      <Button variant="destructive" size="sm" disabled={actionDisabled} onClick={remove}>
        Eliminar
      </Button>
    </div>
  );
}
