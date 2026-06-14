"use client";

import { useState } from "react";
import { ActionButton } from "@/components/ui/primitives";
import { UserRow } from "@/components/admin/user-row";
import { CreateUserForm } from "@/components/admin/create-user-form";
import { ImportProspectForm } from "@/components/admin/import-prospect-form";
import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import type { User, LandingPage } from "@/db/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function UsersSection({
  users,
  landingPages,
}: {
  users: User[];
  landingPages: LandingPage[];
}) {
  const [showForm, setShowForm] = useState(false);
  const [showImportForm, setShowImportForm] = useState(false);

  const usersWithLandings = users.map((user) => ({
    ...user,
    landings: landingPages.filter((lp) => lp.userId === user.id),
  }));

  return (
    <div className="flex flex-1 flex-col">
      <DashboardPageHeader
        actions={
          <>
            <ActionButton variant="secondary" onClick={() => setShowImportForm(true)}>
              Creación automática
            </ActionButton>
            <ActionButton variant="primary" onClick={() => setShowForm(true)}>
              Nuevo usuario
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
      <div className="flex-1 p-unit-lg">
        {users.length === 0 ? (
          <DashboardEmptyState
            description="Crea el primer usuario para asignarle una landing."
            icon="profile"
            title="No hay usuarios registrados"
          />
        ) : (
          <div className="mx-auto max-w-4xl space-y-3">
            {usersWithLandings.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
