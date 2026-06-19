"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { BookingStatus, Employee } from "@/db/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const STATUS_OPTIONS: { value: BookingStatus | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "pending", label: "Pendiente" },
  { value: "confirmed", label: "Confirmada" },
  { value: "completed", label: "Completada" },
  { value: "cancelled", label: "Cancelada" },
];

export function BookingsFilters({
  employees,
  status,
  employeeId,
}: {
  employees: Employee[];
  status: BookingStatus | "";
  employeeId: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const update = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/bookings?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Input
        type="date"
        className="w-auto"
        defaultValue={searchParams.get("dateFrom") ?? ""}
        onChange={(e) => update("dateFrom", e.target.value)}
      />
      <Input
        type="date"
        className="w-auto"
        defaultValue={searchParams.get("dateTo") ?? ""}
        onChange={(e) => update("dateTo", e.target.value)}
      />
      <Select value={employeeId || "all"} onValueChange={(v) => update("employeeId", v)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Empleado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los empleados</SelectItem>
          {employees.map((employee) => (
            <SelectItem key={employee.id} value={employee.id}>
              {employee.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={status || "all"} onValueChange={(v) => update("status", v)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
