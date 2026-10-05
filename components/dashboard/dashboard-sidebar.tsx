"use client";

import { usePathname } from "next/navigation";
import { dashboardNavSections } from "@/lib/dashboard-data";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { DashboardSidebarHeader } from "@/components/dashboard/dashboard-sidebar-header";
import { DashboardSidebarNavSection } from "@/components/dashboard/dashboard-sidebar-nav-section";
import { DashboardSidebarFooter } from "@/components/dashboard/dashboard-sidebar-footer";
import { DashboardSidebarSettingsLink } from "@/components/dashboard/dashboard-sidebar-settings-link";
export function DashboardSidebar({
  showAccountActions,
  bookingModuleEnabled,
  productsModuleEnabled,
}: {
  showAccountActions: boolean;
  bookingModuleEnabled: boolean;
  productsModuleEnabled: boolean;
}) {
  const pathname = usePathname();
  const settingsActive = pathname.startsWith("/settings");
  const sections = bookingModuleEnabled
    ? dashboardNavSections
    : dashboardNavSections.filter((section) => section.id !== "gestion");
  const navSections = sections.map((section) => ({
    ...section,
    items: section.items.filter(
      (item) => item.id !== "products" || productsModuleEnabled,
    ),
  }));

  return (
    <Sidebar collapsible="icon">
      <DashboardSidebarHeader />
      <SidebarContent id="dashboard-sidebar-navigation">
        {navSections.map((section) => (
          <DashboardSidebarNavSection
            key={section.id}
            section={section}
          />
        ))}
      </SidebarContent>
      {showAccountActions ? (
        <div className="mt-auto pb-2 px-2 group-data-[collapsible=icon]:px-0">
          <SidebarMenu><DashboardSidebarSettingsLink isActive={settingsActive} /></SidebarMenu>
          <DashboardSidebarFooter />
        </div>
      ) : null}
    </Sidebar>
  );
}
