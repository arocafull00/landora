"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { ActionButton } from "@/components/ui/primitives";
import { UserRow } from "@/components/admin/user-row";
import { CreateUserForm } from "@/components/admin/create-user-form";
import { ImportProspectForm } from "@/components/admin/import-prospect-form";
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
      <header className="flex items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-6 py-4">
        <div>
          <h2 className="font-headline text-headline-sm font-bold text-on-surface">
            Usuarios
          </h2>
          <p className="mt-0.5 font-body text-body-sm text-on-surface-variant">
            {users.length} {users.length === 1 ? "usuario" : "usuarios"}{" "}
            registrados
          </p>
        </div>
        <div className="flex gap-2">
          <ActionButton variant="secondary" onClick={() => setShowImportForm(true)}>
            Creación automática
          </ActionButton>
          <ActionButton variant="primary" onClick={() => setShowForm(true)}>
            <span className="text-lg leading-none">+</span>
            Nuevo usuario
          </ActionButton>
        </div>
      </header>
      <Dialog open={showImportForm} onOpenChange={setShowImportForm}>
        <DialogContent className="max-w-lg bg-surface-container-lowest">
          <DialogHeader>
            <DialogTitle className="font-headline text-headline-sm text-on-surface">
              Creación automática
            </DialogTitle>
          </DialogHeader>
          <ImportProspectForm onSuccess={() => setShowImportForm(false)} />
        </DialogContent>
      </Dialog>
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg bg-surface-container-lowest">
          <DialogHeader>
            <DialogTitle className="font-headline text-headline-sm text-on-surface">
              Crear usuario
            </DialogTitle>
          </DialogHeader>
          <CreateUserForm onSuccess={() => setShowForm(false)} />
        </DialogContent>
      </Dialog>
      <div className="flex-1 p-6">
        {users.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center text-on-surface-variant">
            <Icon name="profile" className="mb-3 h-10 w-10 opacity-30" />
            <p className="font-body text-body-md">
              No hay usuarios registrados
            </p>
          </div>
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
