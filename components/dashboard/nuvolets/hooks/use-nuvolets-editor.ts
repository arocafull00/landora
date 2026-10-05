"use client";

import { useShallow } from "zustand/react/shallow";
import { useDashboardStore } from "@/stores/dashboard-store";
import type { NuvoletsContent, NuvoletsProduct } from "@/lib/schemas/nuvolets";
import { toast } from "sonner";
import { NUVOLETS_EDITOR_COPY } from "../nuvolets-copy";

export function useNuvoletsEditor() {
  const { landings, activeLandingId, tab, updateSection, isAdmin } = useDashboardStore(useShallow((state) => ({ landings: state.landings, activeLandingId: state.activeLandingId, tab: state.activeEditorTab, updateSection: state.updateSection, isAdmin: state.isAdmin })));
  const landing = landings.find((item) => item.id === activeLandingId);
  const config = landing?.content.nuvolets;
  const update = (value: NuvoletsContent) => { if (landing) updateSection(landing.id, "nuvolets", value); };
  const addProduct = (product: NuvoletsProduct) => {
    if (!config) return;
    if (config.products.length >= 200) { toast.error(NUVOLETS_EDITOR_COPY.maximum); return; }
    update({ ...config, products: [...config.products, product] });
    toast.success(NUVOLETS_EDITOR_COPY.added);
  };
  return { landing, config, tab, update, addProduct, isAdmin };
}
