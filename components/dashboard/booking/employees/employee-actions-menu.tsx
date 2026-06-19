"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import type { Employee } from "@/db/schema";
import type { HourDraft } from "@/lib/employee-schedule";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  deleteEmployeeAction,
  setEmployeeActiveAction,
} from "@/app/actions/employees";
import { useEmployeeEditorStore } from "@/stores/employee-editor-store";
import { MoreHorizontal } from "lucide-react";

export function EmployeeActionsMenu({
  employee,
  hourDrafts,
  disabled,
  onEdit,
}: {
  employee: Employee;
  hourDrafts: HourDraft[];
  disabled: boolean;
  onEdit: () => void;
}) {
  const router = useRouter();
  const copyScheduleFrom = useEmployeeEditorStore((s) => s.copyScheduleFrom);
  const [pending, startTransition] = useTransition();

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
      toast.success("Empleado eliminado");
      router.refresh();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={disabled || pending}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>Editar</DropdownMenuItem>
        <DropdownMenuItem onClick={copySchedule}>Duplicar horario</DropdownMenuItem>
        <DropdownMenuItem onClick={toggleActive}>
          {employee.isActive ? "Desactivar" : "Activar"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={remove}>
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
