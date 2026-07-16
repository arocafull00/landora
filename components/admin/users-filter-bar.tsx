"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AdminUsersFilters } from "@/lib/admin-user-display";

type UsersFilterBarProps = {
  filters: AdminUsersFilters;
  onSearchChange: (value: string) => void;
  onPlanChange: (value: AdminUsersFilters["plan"]) => void;
  onStatusChange: (value: AdminUsersFilters["status"]) => void;
  onAccessChange: (value: AdminUsersFilters["access"]) => void;
};

export function UsersFilterBar({
  filters,
  onSearchChange,
  onPlanChange,
  onStatusChange,
  onAccessChange,
}: UsersFilterBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-outline-variant bg-surface-container-lowest p-3 lg:flex-row lg:items-center">
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-on-surface-variant" />
        <Input
          aria-label="Buscar usuarios"
          className="h-10 border-outline-variant bg-surface-bg pl-9 shadow-none"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar por nombre, email o dominio…"
          value={filters.search}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Select
          onValueChange={(value) =>
            onPlanChange(value as AdminUsersFilters["plan"])
          }
          value={filters.plan}
        >
          <SelectTrigger aria-label="Filtrar por plan" className="h-10 min-w-[140px] border-outline-variant bg-surface-bg shadow-none">
            <SelectValue placeholder="Plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los planes</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
            <SelectItem value="starter">Starter</SelectItem>
            <SelectItem value="free">Free</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) =>
            onStatusChange(value as AdminUsersFilters["status"])
          }
          value={filters.status}
        >
          <SelectTrigger aria-label="Filtrar por estado" className="h-10 min-w-[140px] border-outline-variant bg-surface-bg shadow-none">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="active">Activos</SelectItem>
            <SelectItem value="trial">Trial</SelectItem>
            <SelectItem value="expired">Vencidos</SelectItem>
            <SelectItem value="cancelled">Cancelados</SelectItem>
            <SelectItem value="suspended">Suspendidos</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) =>
            onAccessChange(value as AdminUsersFilters["access"])
          }
          value={filters.access}
        >
          <SelectTrigger aria-label="Filtrar por acceso" className="h-10 min-w-[140px] border-outline-variant bg-surface-bg shadow-none">
            <SelectValue placeholder="Acceso" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Acceso: Todos</SelectItem>
            <SelectItem value="manual">Manual</SelectItem>
            <SelectItem value="subscription">Suscripción</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
