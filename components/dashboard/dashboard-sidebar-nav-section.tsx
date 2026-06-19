"use client";

import type { DashboardNavSection } from "@/lib/dashboard-data";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { DashboardSidebarNavItem } from "@/components/dashboard/dashboard-sidebar-nav-item";
import { DashboardSidebarSettingsLink } from "@/components/dashboard/dashboard-sidebar-settings-link";

export function DashboardSidebarNavSection({
  section,
  showAccountActions,
  settingsActive,
}: {
  section: DashboardNavSection;
  showAccountActions: boolean;
  settingsActive: boolean;
}) {
  const showBillingLink =
    section.id === "configuracion" && showAccountActions;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {section.items.map((item) => (
            <DashboardSidebarNavItem item={item} key={item.id} />
          ))}
          {showBillingLink ? (
            <DashboardSidebarSettingsLink isActive={settingsActive} />
          ) : null}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
