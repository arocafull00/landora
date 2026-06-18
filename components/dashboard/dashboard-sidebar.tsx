"use client";

import { dashboardViews } from "@/lib/dashboard-data";
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
import { DashboardSidebarSettingsLink } from "@/components/dashboard/dashboard-sidebar-settings-link";
import { DashboardSidebarFooter } from "@/components/dashboard/dashboard-sidebar-footer";

export function DashboardSidebar({
  impersonating,
  settingsActive = false,
  showAccountActions,
}: {
  impersonating: boolean;
  settingsActive?: boolean;
  showAccountActions: boolean;
}) {
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
                <DashboardSidebarNavItem item={item} key={item.id} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {showAccountActions ? (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <DashboardSidebarSettingsLink isActive={settingsActive} />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : null}
      </SidebarContent>
      {showAccountActions ? <DashboardSidebarFooter /> : null}
      <SidebarRail />
    </Sidebar>
  );
}
