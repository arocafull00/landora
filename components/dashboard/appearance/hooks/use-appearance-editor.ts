"use client";

import type { Landing } from "@/lib/dashboard-data";
import {
  TEMPLATE_PALETTE_OPTIONS,
  TYPOGRAPHY_OPTIONS,
} from "@/lib/site-appearance";
import { useDashboardStore } from "@/stores/dashboard-store";

export function useAppearanceEditor(landing: Landing) {
  const updateAppearance = useDashboardStore((state) => state.updateAppearance);
  const appearance = landing.content.appearance;

  return {
    appearance,
    paletteOptions: TEMPLATE_PALETTE_OPTIONS[landing.template],
    typographyOptions: TYPOGRAPHY_OPTIONS,
    selectPalette: (paletteId: string) => {
      updateAppearance(landing.id, { paletteId });
    },
    selectTypography: (typographyId: string) => {
      updateAppearance(landing.id, { typographyId });
    },
  };
}
