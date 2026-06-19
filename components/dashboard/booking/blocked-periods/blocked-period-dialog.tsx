"use client";

import { useState, useTransition } from "react";
import { toast } from "react-toastify";
import type { Employee } from "@/db/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createBlockedPeriodAction } from "@/app/actions/blocked-periods";

export function BlockedPeriodDialog({
  open,
  employees,
  onOpenChange,
  onSaved,
}: {
  open: boolean;
  employees: Employee[];
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}) {
  const [employeeId, setEmployeeId] = useState<string>("global");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [reason, setReason] = useState("");
  const [pending, startTransition] = useTransition();

  const submit = () => {
    startTransition(async () => {
      const result = await createBlockedPeriodAction({
        employeeId: employeeId === "global" ? null : employeeId,
        startsAt: new Date(startsAt).toISOString(),
        endsAt: new Date(endsAt).toISOString(),
        reason,
      });
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      toast.success("Bloqueo creado");
      onSaved();
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo bloqueo</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Select value={employeeId} onValueChange={setEmployeeId}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="global">Global</SelectItem>
              {employees.map((employee) => (
                <SelectItem key={employee.id} value={employee.id}>
                  {employee.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} />
          <Input type="datetime-local" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} />
          <Input placeholder="Motivo" value={reason} onChange={(e) => setReason(e.target.value)} />
          <Button onClick={submit} disabled={pending || !startsAt || !endsAt}>
            Crear
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
