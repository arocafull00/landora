"use client";

import { useMemo, type ReactNode } from "react";
import {
  DashboardChromeContext,
  type DashboardChrome,
} from "@/components/dashboard/dashboard-chrome-context";

export function DashboardChromeProvider({
  isAdmin,
  impersonating,
  bookingEnabled,
  bookingModuleEnabled,
  productsModuleEnabled,
  children,
}: DashboardChrome & { children: ReactNode }) {
  const value = useMemo(
    () => ({ isAdmin, impersonating, bookingEnabled, bookingModuleEnabled, productsModuleEnabled }),
    [isAdmin, impersonating, bookingEnabled, bookingModuleEnabled, productsModuleEnabled],
  );

  return (
    <DashboardChromeContext value={value}>
      {children}
    </DashboardChromeContext>
  );
}
