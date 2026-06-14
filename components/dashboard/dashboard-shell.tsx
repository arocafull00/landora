"use client";

import { useLayoutEffect } from "react";
import { DashboardView, Landing } from "@/lib/dashboard-data";
import { useDashboardStore } from "@/stores/dashboard-store";
import { useAssetsStore } from "@/stores/assets-store";
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

export function DashboardShell({
  isAdmin,
  impersonating,
  initialLanding,
  initialView,
}: {
  isAdmin: boolean;
  impersonating: boolean;
  initialLanding: Landing;
  initialView: DashboardView;
}) {
  const activeView = useDashboardStore((state) => state.activeView);
  const setActiveView = useDashboardStore((state) => state.setActiveView);
  const initFromLanding = useDashboardStore((state) => state.initFromLanding);
  const setIsAdmin = useDashboardStore((state) => state.setIsAdmin);

  useLayoutEffect(() => {
    useAssetsStore.getState().ensureLoaded();
    initFromLanding(initialLanding);
    setActiveView(initialView);
    setIsAdmin(isAdmin);
  }, [initialLanding, initFromLanding, initialView, setActiveView, isAdmin, setIsAdmin]);

  return (
    <SidebarProvider
      className="h-screen overflow-hidden bg-surface-bg text-on-background"
      style={
        {
          "--sidebar-width": "12.5rem",
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
          {activeView === "editor" ? <EditorSection /> : null}
          {activeView === "assets" ? <AssetsSection /> : null}
          {activeView === "domain" ? <DomainSection /> : null}
          {activeView === "blog" ? <BlogSection /> : null}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
