"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { DashboardNavItem } from "@/lib/dashboard-data";
import { Icon } from "@/components/ui/icon";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function DashboardSidebarNavItem({ item }: { item: DashboardNavItem }) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(`/${item.id}`);

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
