"use client";

import { SidebarFooter } from "@/components/ui/sidebar";
import { DashboardAccountActions } from "@/components/dashboard/dashboard-account-actions";

export function DashboardSidebarFooter() {
  return (
    <SidebarFooter>
      <DashboardAccountActions className="px-1" />
    </SidebarFooter>
  );
}
