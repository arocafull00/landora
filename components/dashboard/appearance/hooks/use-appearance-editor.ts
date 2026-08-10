"use client";

import type { Landing, TextSizePreset } from "@/lib/dashboard-data";
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
    selectButtonTextSize: (buttonTextSize: TextSizePreset) => {
      updateAppearance(landing.id, { buttonTextSize });
    },
    selectTitleTextSize: (titleTextSize: TextSizePreset) => {
      updateAppearance(landing.id, { titleTextSize });
    },
    selectSubtitleTextSize: (subtitleTextSize: TextSizePreset) => {
      updateAppearance(landing.id, { subtitleTextSize });
    },
    selectContentTextSize: (contentTextSize: TextSizePreset) => {
      updateAppearance(landing.id, { contentTextSize });
    },
  };
}
