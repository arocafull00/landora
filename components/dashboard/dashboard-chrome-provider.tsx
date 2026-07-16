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
  children,
}: DashboardChrome & { children: ReactNode }) {
  const value = useMemo(
    () => ({ isAdmin, impersonating, bookingEnabled }),
    [isAdmin, impersonating, bookingEnabled],
  );

  return (
    <DashboardChromeContext value={value}>
      {children}
    </DashboardChromeContext>
  );
}
