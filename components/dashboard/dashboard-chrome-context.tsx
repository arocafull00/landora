"use client";

import { createContext, use, useMemo, type ReactNode } from "react";

type DashboardChrome = {
  isAdmin: boolean;
  impersonating: boolean;
  bookingEnabled: boolean;
};

const DashboardChromeContext = createContext<DashboardChrome>({
  isAdmin: false,
  impersonating: false,
  bookingEnabled: false,
});

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

export function useDashboardChrome() {
  return use(DashboardChromeContext);
}
