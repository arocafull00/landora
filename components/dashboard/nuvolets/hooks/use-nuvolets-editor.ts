"use client";

import { useShallow } from "zustand/react/shallow";
import { useDashboardStore } from "@/stores/dashboard-store";
import type { NuvoletsContent } from "@/lib/schemas/nuvolets";
import { useDashboardChrome } from "@/components/dashboard/dashboard-chrome-context";

export function useNuvoletsEditor() {
  const { landings, activeLandingId, tab, updateSection, isAdmin } = useDashboardStore(useShallow((state) => ({ landings: state.landings, activeLandingId: state.activeLandingId, tab: state.activeEditorTab, updateSection: state.updateSection, isAdmin: state.isAdmin })));
  const landing = landings.find((item) => item.id === activeLandingId);
  const config = landing?.content.nuvolets;
  const { productsModuleEnabled } = useDashboardChrome();
  const update = (value: NuvoletsContent) => { if (landing) updateSection(landing.id, "nuvolets", value); };
  return { landing, config, tab, update, isAdmin, productsModuleEnabled };
}
