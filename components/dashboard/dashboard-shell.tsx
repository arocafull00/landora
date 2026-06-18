"use client";

import type { ReactNode } from "react";
import { DashboardView, Landing } from "@/lib/dashboard-data";
import { useDashboardStore } from "@/stores/dashboard-store";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AssetsSection } from "@/components/dashboard/sections/assets-section";
import { BlogSection } from "@/components/dashboard/sections/blog-section";
import { DomainSection } from "@/components/dashboard/sections/domain-section";
import { EditorSection } from "@/components/dashboard/sections/editor-section";
import { AnalyticsSection } from "@/components/dashboard/sections/analytics-section";

export function DashboardShell({
  isAdmin,
  impersonating,
  initialLanding,
  initialView,
  settingsContent,
}: {
  isAdmin: boolean;
  impersonating: boolean;
  initialLanding: Landing;
  initialView: DashboardView;
  settingsContent?: ReactNode;
}) {
  useDashboardStore.getState().bootstrapDashboard({
    landing: initialLanding,
    view: initialView,
    isAdmin,
  });
  const activeView = useDashboardStore((state) => state.activeView);

  return (
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
        settingsActive={Boolean(settingsContent)}
        showAccountActions={!isAdmin}
      />
      <SidebarInset className="flex h-screen min-w-0 flex-col overflow-hidden bg-surface-bg">
        <div className="flex items-center gap-2 border-b border-outline-variant px-unit-md py-2 md:hidden">
          <SidebarTrigger />
        </div>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          {settingsContent ? (
            settingsContent
          ) : (
            <>
              {activeView === "editor" ? <EditorSection /> : null}
              {activeView === "assets" ? <AssetsSection /> : null}
              {activeView === "domain" ? <DomainSection /> : null}
              {activeView === "blog" ? <BlogSection /> : null}
              {activeView === "analytics" ? <AnalyticsSection /> : null}
            </>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
