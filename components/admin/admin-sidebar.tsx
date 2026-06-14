"use client";

import type { IconName } from "@/lib/dashboard-data";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar";
import { AdminSidebarNavItem } from "@/components/admin/admin-sidebar-nav-item";

export type AdminView = "users" | "templates" | "settings";

const adminViews: Array<{ id: AdminView; label: string; icon: IconName }> = [
  { id: "users", label: "Usuarios", icon: "profile" },
  { id: "templates", label: "Plantillas", icon: "grid" },
  { id: "settings", label: "Ajustes", icon: "settings" },
];

export function AdminSidebar({
  activeView,
  onViewChange,
}: {
  activeView: AdminView;
  onViewChange: (view: AdminView) => void;
}) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-unit-sm py-unit-lg">
        <h1 className="font-headline text-headline-md font-bold text-sidebar-foreground">
          Landora
        </h1>
        <p className="mt-1 font-body text-body-sm text-sidebar-accent-foreground">
          Admin
        </p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminViews.map((item) => (
                <AdminSidebarNavItem
                  isActive={activeView === item.id}
                  item={item}
                  key={item.id}
                  onSelect={onViewChange}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
