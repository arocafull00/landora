"use client";

import type { IconName } from "@/lib/dashboard-data";
import { Icon } from "@/components/ui/icon";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { AdminView } from "@/components/admin/admin-sidebar";

type AdminViewItem = { id: AdminView; label: string; icon: IconName };

export function AdminSidebarNavItem({
  item,
  isActive,
  onSelect,
}: {
  item: AdminViewItem;
  isActive: boolean;
  onSelect: (view: AdminView) => void;
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className="transition-colors duration-150"
        isActive={isActive}
        tooltip={item.label}
        onClick={() => onSelect(item.id)}
      >
        <Icon name={item.icon} className="h-4 w-4" />
        <span>{item.label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
