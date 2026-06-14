"use client";

import { dashboardViews } from "@/lib/dashboard-data";
import { useDashboardStore } from "@/stores/dashboard-store";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import { DashboardSidebarNavItem } from "@/components/dashboard/dashboard-sidebar-nav-item";
import { DashboardSidebarFooter } from "@/components/dashboard/dashboard-sidebar-footer";

export function DashboardSidebar({
  impersonating,
  showAccountActions,
}: {
  impersonating: boolean;
  showAccountActions: boolean;
}) {
  const activeView = useDashboardStore((state) => state.activeView);
  return (
    <Sidebar collapsible="icon" className={impersonating ? "pt-10" : undefined}>
      <SidebarHeader className="border-b border-sidebar-border px-unit-sm py-unit-lg">
        <h1 className="font-headline text-headline-md font-bold text-sidebar-foreground">
          Landora
        </h1>
        <p className="mt-1 font-body text-body-sm text-sidebar-accent-foreground">
          Tu web
        </p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardViews.map((item) => (
                <DashboardSidebarNavItem
                  isActive={activeView === item.id}
                  item={item}
                  key={item.id}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {showAccountActions ? <DashboardSidebarFooter /> : null}
      <SidebarRail />
    </Sidebar>
  );
}
