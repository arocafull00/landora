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
  bookingModuleEnabled,
  productsModuleEnabled,
}: {
  impersonating: boolean;
  showAccountActions: boolean;
  bookingModuleEnabled: boolean;
  productsModuleEnabled: boolean;
}) {
  const pathname = usePathname();
  const settingsActive = pathname.startsWith("/settings");
  const sections = bookingModuleEnabled
    ? dashboardNavSections
    : dashboardNavSections.filter((section) => section.id !== "gestion");
  const navSections = sections.map((section) => ({ ...section, items: section.items.filter((item) => item.id !== "products" || productsModuleEnabled) }));

  return (
    <Sidebar collapsible="icon" className={impersonating ? "pt-10" : undefined}>
      <DashboardSidebarHeader />
      <SidebarContent id="dashboard-sidebar-navigation">
        {navSections.map((section) => (
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
