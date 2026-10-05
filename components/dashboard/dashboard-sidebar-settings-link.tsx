"use client";

import Link from "next/link";
import { CreditCard } from "lucide-react";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function DashboardSidebarSettingsLink({
  isActive,
}: {
  isActive: boolean;
}) {
  const { setOpenMobile } = useSidebar();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} tooltip="Facturacion">
        <Link aria-label="Facturación" className="transition-colors duration-150" href="/settings" onClick={() => setOpenMobile(false)}>
          <CreditCard aria-hidden className="h-4 w-4" />
          <span>Facturacion</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
