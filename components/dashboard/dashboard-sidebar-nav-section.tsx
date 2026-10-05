"use client";

import type { DashboardNavSection } from "@/lib/dashboard-data";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { DashboardSidebarNavItem } from "@/components/dashboard/dashboard-sidebar-nav-item";

export function DashboardSidebarNavSection({
  section,
}: {
  section: DashboardNavSection;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {section.items.map((item) => (
            <DashboardSidebarNavItem item={item} key={item.id} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
