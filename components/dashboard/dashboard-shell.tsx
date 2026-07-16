"use client";

import type { ReactNode } from "react";
import type { Landing } from "@/lib/dashboard-data";
import { DashboardStoreProvider } from "@/stores/dashboard-store";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardChromeProvider } from "@/components/dashboard/dashboard-chrome-provider";

export function DashboardShell({
  isAdmin,
  impersonating,
  landing,
  bookingEnabled,
  bookingModuleEnabled,
  children,
}: {
  isAdmin: boolean;
  impersonating: boolean;
  landing: Landing;
  bookingEnabled: boolean;
  bookingModuleEnabled: boolean;
  children: ReactNode;
}) {
  return (
    <DashboardStoreProvider
      key={`${landing.id}:${isAdmin}`}
      isAdmin={isAdmin}
      landing={landing}
    >
      <DashboardChromeProvider
        isAdmin={isAdmin}
        impersonating={impersonating}
        bookingEnabled={bookingEnabled}
      >
        <SidebarProvider
          className="dashboard-app h-dvh overflow-hidden bg-surface-bg text-on-background"
          style={
            {
              "--sidebar-width": "14rem",
            } as React.CSSProperties
          }
        >
          <DashboardSidebar
            impersonating={impersonating}
            showAccountActions={!isAdmin}
            bookingModuleEnabled={bookingModuleEnabled}
          />
          <SidebarInset className="flex h-dvh min-w-0 flex-col overflow-hidden bg-surface-bg">
            <div className="flex items-center gap-2 border-b border-outline-variant px-unit-md py-2 md:hidden">
              <SidebarTrigger />
            </div>
            <div className="flex min-h-0 flex-1 overflow-hidden">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </DashboardChromeProvider>
    </DashboardStoreProvider>
  );
}
