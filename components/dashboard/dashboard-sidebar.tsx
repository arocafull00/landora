"use client";

import { dashboardViews } from "@/lib/dashboard-data";
import { useDashboardStore } from "@/stores/dashboard-store";
import { Icon } from "@/components/ui/icon";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { DashboardSidebarNavItem } from "@/components/dashboard/dashboard-sidebar-nav-item";

export function DashboardSidebar({
  impersonating,
}: {
  impersonating: boolean;
}) {
  const activeView = useDashboardStore((state) => state.activeView);
  return (
    <Sidebar collapsible="icon" className={impersonating ? "pt-10" : undefined}>
      <SidebarHeader className="px-unit-xs py-unit-lg">
        <h1 className="font-headline text-headline-md font-bold text-sidebar-foreground">
          Landora
        </h1>
        <p className="mt-1 font-label text-label-md text-sidebar-foreground/60">
          CMS Dashboard
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
      <SidebarRail />
    </Sidebar>
  );
}
