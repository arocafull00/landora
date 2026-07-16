"use client";

import { createContext, use } from "react";

export type DashboardChrome = {
  isAdmin: boolean;
  impersonating: boolean;
  bookingEnabled: boolean;
};

export const DashboardChromeContext = createContext<DashboardChrome>({
  isAdmin: false,
  impersonating: false,
  bookingEnabled: false,
});

export function useDashboardChrome() {
  return use(DashboardChromeContext);
}
