"use client";

import { usePathname } from "next/navigation";
import { dashboardNavSections } from "@/lib/dashboard-data";
import {
  Sidebar,
  SidebarContent,
  SidebarRail,
} from "@/components/ui/sidebar";
import { DashboardSidebarHeader } from "@/components/dashboard/dashboard-sidebar-header";
import { DashboardSidebarNavSection } from "@/components/dashboard/dashboard-sidebar-nav-section";
import { DashboardSidebarFooter } from "@/components/dashboard/dashboard-sidebar-footer";

export function DashboardSidebar({
  impersonating,
  showAccountActions,
}: {
  impersonating: boolean;
  showAccountActions: boolean;
}) {
  const pathname = usePathname();
  const settingsActive = pathname.startsWith("/settings");

  return (
    <Sidebar collapsible="icon" className={impersonating ? "pt-10" : undefined}>
      <DashboardSidebarHeader />
      <SidebarContent>
        {dashboardNavSections.map((section) => (
          <DashboardSidebarNavSection
            key={section.id}
            section={section}
            showAccountActions={showAccountActions}
            settingsActive={settingsActive}
          />
        ))}
      </SidebarContent>
      {showAccountActions ? <DashboardSidebarFooter /> : null}
      <SidebarRail />
    </Sidebar>
  );
}
