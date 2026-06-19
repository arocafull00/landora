"use client";

import { createContext, useContext, type ReactNode } from "react";

type DashboardChrome = {
  isAdmin: boolean;
  impersonating: boolean;
};

const DashboardChromeContext = createContext<DashboardChrome>({
  isAdmin: false,
  impersonating: false,
});

export function DashboardChromeProvider({
  isAdmin,
  impersonating,
  children,
}: DashboardChrome & { children: ReactNode }) {
  return (
    <DashboardChromeContext value={{ isAdmin, impersonating }}>
      {children}
    </DashboardChromeContext>
  );
}

export function useDashboardChrome() {
  return useContext(DashboardChromeContext);
}
