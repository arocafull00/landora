"use client";

import Link from "next/link";
import { dashboardViews } from "@/lib/dashboard-data";
import { useDashboardStore } from "@/stores/dashboard-store";
import { Icon } from "@/components/ui/icon";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type DashboardViewItem = (typeof dashboardViews)[number];

export function DashboardSidebarNavItem({ item }: { item: DashboardViewItem }) {
  const activeView = useDashboardStore((state) => state.activeView);
  const isActive = activeView === item.id;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} tooltip={item.label}>
        <Link className="transition-colors duration-150" href={`/${item.id}`}>
          <Icon name={item.icon} className="h-4 w-4" />
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
