"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { createEmployeeAction } from "@/app/actions/employees";

export function EmployeeCreateDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [pending, startTransition] = useTransition();

  const reset = () => {
    setName("");
    setIsActive(true);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      reset();
    }
    onOpenChange(nextOpen);
  };

  const submit = () => {
    startTransition(async () => {
      const result = await createEmployeeAction(name, isActive);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      toast.success("Empleado creado");
      handleOpenChange(false);
      router.refresh();
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo empleado</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="font-body text-body-sm font-medium text-on-surface" htmlFor="employee-name">
              Nombre
            </label>
            <Input
              id="employee-name"
              placeholder="Paco"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body text-body-sm font-medium text-on-surface">Activo</span>
            <Switch checked={isActive} disabled={pending} onCheckedChange={setIsActive} />
          </div>
          <Button onClick={submit} disabled={pending || !name.trim()} className="w-full">
            Crear
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
