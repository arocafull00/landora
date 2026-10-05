"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { DashboardNavItem } from "@/lib/dashboard-data";
import { Icon } from "@/components/ui/icon";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function DashboardSidebarNavItem({ item }: { item: DashboardNavItem }) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const href = item.href ?? `/${item.id}`;
  const isActive = item.activePrefixes
    ? item.activePrefixes.some((prefix) => pathname.startsWith(prefix))
    : pathname.startsWith(`/${item.id}`);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} tooltip={item.label}>
        <Link aria-label={item.label} className="transition-colors duration-150" href={href} onClick={() => setOpenMobile(false)}>
          <Icon name={item.icon} aria-hidden className="h-[19px] w-[19px]" />
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
