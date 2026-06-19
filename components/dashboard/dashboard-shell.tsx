"use client";

import type { ReactNode } from "react";
import type { Landing } from "@/lib/dashboard-data";
import { useDashboardStore } from "@/stores/dashboard-store";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardChromeProvider } from "@/components/dashboard/dashboard-chrome-context";

export function DashboardShell({
  isAdmin,
  impersonating,
  landing,
  children,
}: {
  isAdmin: boolean;
  impersonating: boolean;
  landing: Landing;
  children: ReactNode;
}) {
  useDashboardStore.getState().bootstrapDashboard({
    landing,
    isAdmin,
  });

  return (
    <DashboardChromeProvider isAdmin={isAdmin} impersonating={impersonating}>
      <SidebarProvider
        className="dashboard-app h-screen overflow-hidden bg-surface-bg text-on-background"
        style={
          {
            "--sidebar-width": "14rem",
          } as React.CSSProperties
        }
      >
        <DashboardSidebar
          impersonating={impersonating}
          showAccountActions={!isAdmin}
        />
        <SidebarInset className="flex h-screen min-w-0 flex-col overflow-hidden bg-surface-bg">
          <div className="flex items-center gap-2 border-b border-outline-variant px-unit-md py-2 md:hidden">
            <SidebarTrigger />
          </div>
          <div className="flex min-h-0 flex-1 overflow-hidden">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </DashboardChromeProvider>
  );
}
