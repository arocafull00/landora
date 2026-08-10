"use client";

import { useState } from "react";
import type { Landing, TextSizePreset } from "@/lib/dashboard-data";
import {
  APPEARANCE_EDITOR_COPY,
  APPEARANCE_EDITOR_GROUP_ORDER,
  type AppearanceEditorGroupId,
} from "@/components/dashboard/appearance/appearance-editor-copy";
import {
  TEMPLATE_PALETTE_OPTIONS,
  TEXT_SIZE_PRESET_OPTIONS,
  TYPOGRAPHY_OPTIONS,
} from "@/lib/site-appearance";
import {
  dispatchPreviewTextSize,
  type PreviewTextSizeProperty,
} from "@/lib/preview-text-size";
import { useDashboardStore } from "@/stores/dashboard-store";

function getTextSizeGroupSummary(appearance: Landing["content"]["appearance"]) {
  const sizes = new Set<TextSizePreset>([
    appearance.buttonTextSize,
    appearance.chipTextSize,
    appearance.titleTextSize,
    appearance.subtitleTextSize,
    appearance.contentTextSize,
  ]);

  if (sizes.size !== 1) {
    return APPEARANCE_EDITOR_COPY.mixedTextSizes;
  }

  const [size] = sizes;
  return (
    TEXT_SIZE_PRESET_OPTIONS.find((option) => option.id === size)?.label ??
    TEXT_SIZE_PRESET_OPTIONS[2].label
  );
}

export function useAppearanceEditor(landing: Landing) {
  const updateAppearance = useDashboardStore((state) => state.updateAppearance);
  const appearance = landing.content.appearance;
  const [expandedGroupId, setExpandedGroupId] = useState<AppearanceEditorGroupId | null>(
    null,
  );

  const paletteOptions = TEMPLATE_PALETTE_OPTIONS[landing.template];
  const selectedPaletteLabel =
    paletteOptions.find((option) => option.id === appearance.paletteId)?.label ??
    paletteOptions[0]?.label ??
    APPEARANCE_EDITOR_COPY.groups.design;
  const selectedTypographyLabel =
    TYPOGRAPHY_OPTIONS.find((option) => option.id === appearance.typographyId)?.label ??
    TYPOGRAPHY_OPTIONS[0].label;

  const groupSummaries: Record<AppearanceEditorGroupId, string> = {
    typography: selectedTypographyLabel,
    design: selectedPaletteLabel,
    "text-size": getTextSizeGroupSummary(appearance),
  };

  const toggleGroup = (groupId: AppearanceEditorGroupId) => {
    setExpandedGroupId((currentGroupId) =>
      currentGroupId === groupId ? null : groupId,
    );
  };
  const selectTextSize = (
    property: PreviewTextSizeProperty,
    value: TextSizePreset,
  ) => {
    updateAppearance(landing.id, { [property]: value });
    dispatchPreviewTextSize({ landingId: landing.id, property, value });
  };

  return {
    appearance,
    expandedGroupId,
    groupOrder: APPEARANCE_EDITOR_GROUP_ORDER,
    groupSummaries,
    paletteOptions,
    selectButtonTextSize: (buttonTextSize: TextSizePreset) => {
      selectTextSize("buttonTextSize", buttonTextSize);
    },
    selectChipTextSize: (chipTextSize: TextSizePreset) => {
      selectTextSize("chipTextSize", chipTextSize);
    },
    selectContentTextSize: (contentTextSize: TextSizePreset) => {
      selectTextSize("contentTextSize", contentTextSize);
    },
    selectPalette: (paletteId: string) => {
      updateAppearance(landing.id, { paletteId });
    },
    selectSubtitleTextSize: (subtitleTextSize: TextSizePreset) => {
      selectTextSize("subtitleTextSize", subtitleTextSize);
    },
    selectTitleTextSize: (titleTextSize: TextSizePreset) => {
      selectTextSize("titleTextSize", titleTextSize);
    },
    selectTypography: (typographyId: string) => {
      updateAppearance(landing.id, { typographyId });
    },
    toggleGroup,
  };
}
