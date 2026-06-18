"use client";

import Link from "next/link";
import { CreditCard } from "lucide-react";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function DashboardSidebarSettingsLink({
  isActive,
}: {
  isActive: boolean;
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} tooltip="Facturacion">
        <Link className="transition-colors duration-150" href="/settings">
          <CreditCard className="h-4 w-4" />
          <span>Facturacion</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
