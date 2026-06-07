"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { UsersSection } from "@/components/admin/sections/users-section";
import { AdminSettingsSection } from "@/components/admin/sections/admin-settings-section";
import { TemplatesSection } from "@/components/admin/sections/templates-section";
import type { User, LandingPage } from "@/db/schema";
import type { IconName } from "@/lib/dashboard-data";

type AdminView = "users" | "templates" | "settings";

const adminViews: Array<{ id: AdminView; label: string; icon: IconName }> = [
  { id: "users", label: "Usuarios", icon: "profile" },
  { id: "templates", label: "Plantillas", icon: "grid" },
  { id: "settings", label: "Ajustes", icon: "settings" },
];

export function AdminShell({
  users,
  landingPages,
  initialView = "users",
}: {
  users: User[];
  landingPages: LandingPage[];
  initialView?: AdminView;
}) {
  const [activeView, setActiveView] = useState<AdminView>(initialView);

  return (
    <div className="flex h-screen overflow-hidden bg-surface-bg text-on-background">
      <aside className="fixed left-0 top-0 z-30 flex h-full w-[200px] flex-col border-r border-outline-variant bg-inverse-surface px-unit-md py-unit-lg">
        <div className="mb-unit-xl px-unit-xs">
          <h1 className="font-headline text-headline-md font-bold text-inverse-on-surface">
            Landora
          </h1>
          <p className="mt-1 font-label text-label-md text-surface-dim">
            Admin
          </p>
        </div>
        <nav className="flex flex-1 flex-col gap-unit-xs">
          {adminViews.map((item) => {
            const isActive = activeView === item.id;

            return (
              <button
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left font-label text-label-md transition-colors ${
                  isActive
                    ? "bg-surface-variant text-primary"
                    : "text-surface-dim hover:bg-surface-variant hover:text-on-surface"
                }`}
                key={item.id}
                onClick={() => setActiveView(item.id)}
                type="button"
              >
                <Icon name={item.icon} className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
      <div className="ml-[200px] flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
        <main className="flex min-h-0 flex-1 overflow-auto">
          {activeView === "users" ? (
            <UsersSection users={users} landingPages={landingPages} />
          ) : null}
          {activeView === "templates" ? <TemplatesSection /> : null}
          {activeView === "settings" ? <AdminSettingsSection /> : null}
        </main>
      </div>
    </div>
  );
}
