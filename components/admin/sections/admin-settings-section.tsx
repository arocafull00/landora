"use client";

import { SignOutButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/primitives";

export function AdminSettingsSection() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-6 py-4">
        <div>
          <h2 className="font-headline text-headline-sm font-bold text-on-surface">
            Ajustes
          </h2>
          <p className="mt-0.5 font-body text-body-sm text-on-surface-variant">
            Configuración de tu cuenta de administrador
          </p>
        </div>
      </header>
      <div className="flex-1 p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <section>
            <h3 className="mb-4 font-headline text-headline-sm text-on-surface">
              Cuenta
            </h3>
            <Panel className="flex items-center gap-4 p-4">
              <UserButton />
              <div>
                <p className="font-body text-body-md font-medium text-on-surface">
                  Administrador
                </p>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Gestiona tu perfil desde el menú de usuario
                </p>
              </div>
            </Panel>
          </section>
          <section>
            <h3 className="mb-4 font-headline text-headline-sm text-on-surface">
              Sesión
            </h3>
            <Panel className="flex items-center justify-between gap-4 p-4">
              <div>
                <p className="font-body text-body-md font-medium text-on-surface">
                  Cerrar sesión
                </p>
                <p className="font-body text-body-sm text-on-surface-variant">
                  Sal del panel de administración en este dispositivo
                </p>
              </div>
              <SignOutButton redirectUrl="/sign-in">
                <Button variant="outline">Cerrar sesión</Button>
              </SignOutButton>
            </Panel>
          </section>
        </div>
      </div>
    </div>
  );
}
