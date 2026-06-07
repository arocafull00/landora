"use client";

import { useState } from "react";
import { UsersSection } from "@/components/admin/sections/users-section";
import { AdminSettingsSection } from "@/components/admin/sections/admin-settings-section";
import { TemplatesSection } from "@/components/admin/sections/templates-section";
import {
  AdminSidebar,
  type AdminView,
} from "@/components/admin/admin-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type { User, LandingPage } from "@/db/schema";

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
    <SidebarProvider
      className="h-screen overflow-hidden bg-surface-bg text-on-background"
      style={
        {
          "--sidebar-width": "12.5rem",
        } as React.CSSProperties
      }
    >
      <AdminSidebar activeView={activeView} onViewChange={setActiveView} />
      <SidebarInset className="flex h-screen min-w-0 flex-col overflow-hidden bg-surface-bg">
        <div className="flex items-center gap-2 border-b border-outline-variant px-unit-md py-2 md:hidden">
          <SidebarTrigger />
        </div>
        <div className="flex min-h-0 flex-1 overflow-auto">
          {activeView === "users" ? (
            <UsersSection users={users} landingPages={landingPages} />
          ) : null}
          {activeView === "templates" ? <TemplatesSection /> : null}
          {activeView === "settings" ? <AdminSettingsSection /> : null}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
