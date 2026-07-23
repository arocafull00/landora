"use client";

import { createContext, use } from "react";

export type DashboardChrome = {
  isAdmin: boolean;
  impersonating: boolean;
  bookingEnabled: boolean;
  bookingModuleEnabled: boolean;
};

export const DashboardChromeContext = createContext<DashboardChrome>({
  isAdmin: false,
  impersonating: false,
  bookingEnabled: false,
  bookingModuleEnabled: false,
});

export function useDashboardChrome() {
  return use(DashboardChromeContext);
}
