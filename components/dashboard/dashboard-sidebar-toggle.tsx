"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

const SIDEBAR_TOGGLE_COPY = {
  expand: "Expandir menú lateral",
  collapse: "Contraer menú lateral",
  open: "Abrir menú lateral",
  close: "Cerrar menú lateral",
} as const;

export function DashboardSidebarToggle() {
  const { isMobile, open, openMobile } = useSidebar();
  const expanded = isMobile ? openMobile : open;
  const label = isMobile
    ? expanded ? SIDEBAR_TOGGLE_COPY.close : SIDEBAR_TOGGLE_COPY.open
    : expanded ? SIDEBAR_TOGGLE_COPY.collapse : SIDEBAR_TOGGLE_COPY.expand;

  return (
    <SidebarTrigger
      aria-label={label}
      aria-expanded={expanded}
      aria-controls="dashboard-sidebar-navigation"
      title={label}
      className="shrink-0 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    />
  );
}
