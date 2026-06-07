"use client";

import { useLayoutEffect } from "react";
import { DashboardView, Landing } from "@/lib/dashboard-data";
import { useDashboardStore } from "@/stores/dashboard-store";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { IconButton } from "@/components/ui/primitives";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AssetsSection } from "@/components/dashboard/sections/assets-section";
import { EditorSection } from "@/components/dashboard/sections/editor-section";
import { LandingsSection } from "@/components/dashboard/sections/landings-section";
import { SettingsSection } from "@/components/dashboard/sections/settings-section";

export function DashboardShell({
  impersonating,
  initialLanding,
  initialView,
}: {
  impersonating: boolean;
  initialLanding: Landing;
  initialView: DashboardView;
}) {
  const activeView = useDashboardStore((state) => state.activeView);
  const setActiveView = useDashboardStore((state) => state.setActiveView);
  const initFromLanding = useDashboardStore((state) => state.initFromLanding);

  useLayoutEffect(() => {
    initFromLanding(initialLanding);
    setActiveView(initialView);
  }, [initialLanding, initFromLanding, initialView, setActiveView]);

  return (
    <SidebarProvider
      className="h-screen overflow-hidden bg-surface-bg text-on-background"
      style={
        {
          "--sidebar-width": "12.5rem",
        } as React.CSSProperties
      }
    >
      <DashboardSidebar impersonating={impersonating} />
      <SidebarInset className="flex h-screen min-w-0 flex-col overflow-hidden bg-surface-bg">
        <div className="flex items-center gap-2 border-b border-outline-variant px-unit-md py-2 md:hidden">
          <SidebarTrigger />
        </div>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          {activeView === "landings" ? <LandingsSection /> : null}
          {activeView === "editor" ? <EditorSection /> : null}
          {activeView === "assets" ? <AssetsSection /> : null}
          {activeView === "settings" ? <SettingsSection /> : null}
        </div>
      </SidebarInset>
      <div className="fixed right-4 top-4 z-40 hidden gap-2 md:flex">
        <IconButton icon="bell" label="Notifications" />
        <IconButton icon="help" label="Help" />
      </div>
    </SidebarProvider>
  );
}
