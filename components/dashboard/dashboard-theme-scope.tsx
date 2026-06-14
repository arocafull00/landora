"use client";

import { useLayoutEffect } from "react";

export function DashboardThemeScope() {
  useLayoutEffect(() => {
    document.documentElement.dataset.dashboard = "";
    return () => {
      delete document.documentElement.dataset.dashboard;
    };
  }, []);

  return null;
}
