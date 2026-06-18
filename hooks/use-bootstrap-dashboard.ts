"use client";

import { useRef } from "react";
import { DashboardView, Landing } from "@/lib/dashboard-data";
import { useDashboardStore } from "@/stores/dashboard-store";

export function useBootstrapDashboard({
  initialLanding,
  initialView,
  isAdmin,
}: {
  initialLanding: Landing;
  initialView: DashboardView;
  isAdmin: boolean;
}) {
  const bootstrapKeyRef = useRef<string | null>(null);
  const bootstrapKey = `${initialLanding.id}:${initialView}`;

  if (bootstrapKeyRef.current === bootstrapKey) return;

  bootstrapKeyRef.current = bootstrapKey;
  useDashboardStore.getState().bootstrapDashboard({
    landing: initialLanding,
    view: initialView,
    isAdmin,
  });
}
