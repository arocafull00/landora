"use client";

import { useMemo, useState } from "react";
import { ActionButton } from "@/components/ui/primitives";
import { CreateUserForm } from "@/components/admin/create-user-form";
import { ImportProspectForm } from "@/components/admin/import-prospect-form";
import { UsersFilterBar } from "@/components/admin/users-filter-bar";
import { UsersStatsBar } from "@/components/admin/users-stats-bar";
import { UsersTable } from "@/components/admin/users-table";
import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import type { LandingPage, User } from "@/db/schema";
import {
  computeAdminUsersStats,
  filterAdminUsers,
  joinUsersWithLandings,
  type AdminUsersFilters,
} from "@/lib/admin-user-display";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const PAGE_SIZE = 10;

const INITIAL_FILTERS: AdminUsersFilters = {
  search: "",
  plan: "all",
  status: "all",
  access: "all",
};

export function UsersSection({
  users,
  landingPages,
}: {
  users: User[];
  landingPages: LandingPage[];
}) {
  const [showForm, setShowForm] = useState(false);
  const [showImportForm, setShowImportForm] = useState(false);
  const [filters, setFilters] = useState<AdminUsersFilters>(INITIAL_FILTERS);
  const [page, setPage] = useState(1);

  const usersWithLandings = useMemo(
    () => joinUsersWithLandings(users, landingPages),
    [users, landingPages],
  );

  const stats = useMemo(
    () => computeAdminUsersStats(usersWithLandings),
    [usersWithLandings],
  );

  const filteredUsers = useMemo(
    () => filterAdminUsers(usersWithLandings, filters),
    [usersWithLandings, filters],
  );

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const updateFilters = (next: Partial<AdminUsersFilters>) => {
    setFilters((current) => ({ ...current, ...next }));
    setPage(1);
  };

  return (
    <div className="flex flex-1 flex-col">
      <DashboardPageHeader
        actions={
          <>
            <ActionButton variant="secondary" onClick={() => setShowImportForm(true)}>
              Creación automática
            </ActionButton>
            <ActionButton variant="primary" onClick={() => setShowForm(true)}>
              Crear usuario
            </ActionButton>
          </>
        }
        description={`${users.length} ${users.length === 1 ? "usuario registrado" : "usuarios registrados"}`}
        title="Usuarios"
      />
      <Dialog open={showImportForm} onOpenChange={setShowImportForm}>
        <DialogContent className="max-w-lg bg-surface-container-lowest">
          <DialogHeader>
            <DialogTitle className="font-headline text-headline-md font-semibold text-on-surface">
              Creación automática
            </DialogTitle>
          </DialogHeader>
          <ImportProspectForm onSuccess={() => setShowImportForm(false)} />
        </DialogContent>
      </Dialog>
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg bg-surface-container-lowest">
          <DialogHeader>
            <DialogTitle className="font-headline text-headline-md font-semibold text-on-surface">
              Crear usuario
            </DialogTitle>
          </DialogHeader>
          <CreateUserForm onSuccess={() => setShowForm(false)} />
        </DialogContent>
      </Dialog>
      <div className="flex-1 space-y-4 p-unit-lg">
        <UsersStatsBar stats={stats} />
        {users.length === 0 ? (
          <DashboardEmptyState
            description="Crea el primer usuario para asignarle una landing."
            icon="profile"
            title="No hay usuarios registrados"
          />
        ) : (
          <>
            <UsersFilterBar
              filters={filters}
              onAccessChange={(access) => updateFilters({ access })}
              onPlanChange={(plan) => updateFilters({ plan })}
              onSearchChange={(search) => updateFilters({ search })}
              onStatusChange={(status) => updateFilters({ status })}
            />
            {filteredUsers.length === 0 ? (
              <DashboardEmptyState
                description="Prueba con otro término o limpia los filtros."
                icon="profile"
                title="No hay resultados"
              />
            ) : (
              <>
                <UsersTable users={paginatedUsers} />
                {totalPages > 1 ? (
                  <div className="flex items-center justify-between">
                    <p className="font-body text-body-sm text-on-surface-variant">
                      Página {currentPage} de {totalPages}
                    </p>
                    <div className="flex gap-2">
                      <ActionButton
                        disabled={currentPage <= 1}
                        onClick={() => setPage((value) => value - 1)}
                        variant="secondary"
                      >
                        Anterior
                      </ActionButton>
                      <ActionButton
                        disabled={currentPage >= totalPages}
                        onClick={() => setPage((value) => value + 1)}
                        variant="secondary"
                      >
                        Siguiente
                      </ActionButton>
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
