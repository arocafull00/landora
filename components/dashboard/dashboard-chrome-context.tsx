"use client";

import { createContext, useContext, type ReactNode } from "react";

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
  return (
    <DashboardChromeContext value={{ isAdmin, impersonating, bookingEnabled }}>
      {children}
    </DashboardChromeContext>
  );
}

export function useDashboardChrome() {
  return useContext(DashboardChromeContext);
}
