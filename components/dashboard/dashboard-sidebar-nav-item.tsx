"use client";

import Link from "next/link";
import { dashboardViews } from "@/lib/dashboard-data";
import { Icon } from "@/components/ui/icon";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type DashboardViewItem = (typeof dashboardViews)[number];

export function DashboardSidebarNavItem({
  item,
  isActive,
}: {
  item: DashboardViewItem;
  isActive: boolean;
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} tooltip={item.label}>
        <Link href={`/${item.id}`}>
          <Icon name={item.icon} className="h-4 w-4" />
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
