"use client";

import type { Landing } from "@/lib/dashboard-data";
import {
  APPEARANCE_EDITOR_COPY,
  APPEARANCE_EDITOR_GROUP_LABELS,
} from "@/components/dashboard/appearance/appearance-editor-copy";
import { AppearanceEditorGroupCard } from "@/components/dashboard/appearance/components/appearance-editor-group-card";
import { AppearanceEditorGroupHeader } from "@/components/dashboard/appearance/components/appearance-editor-group-header";
import { AppearancePaletteGroupContent } from "@/components/dashboard/appearance/components/appearance-palette-group-content";
import { AppearanceTextSizeGroupContent } from "@/components/dashboard/appearance/components/appearance-text-size-group-content";
import { AppearanceTypographyGroupContent } from "@/components/dashboard/appearance/components/appearance-typography-group-content";
import { useAppearanceEditor } from "@/components/dashboard/appearance/hooks/use-appearance-editor";
import { EditorSectionTitle } from "@/components/dashboard/editor-section-title";

export function AppearanceEditorPanel({ landing }: { landing: Landing }) {
  const {
    appearance,
    expandedGroupId,
    groupOrder,
    groupSummaries,
    paletteOptions,
    selectButtonTextSize,
    selectChipTextSize,
    selectContentTextSize,
    selectPalette,
    selectSubtitleTextSize,
    selectTitleTextSize,
    selectTypography,
    toggleGroup,
  } = useAppearanceEditor(landing);

  return (
    <section className="space-y-5 py-unit-lg">
      <EditorSectionTitle
        description={APPEARANCE_EDITOR_COPY.description}
        title={APPEARANCE_EDITOR_COPY.title}
      />

      <div className="space-y-3">
        {groupOrder.map((groupId) => {
          const open = expandedGroupId === groupId;

          return (
            <AppearanceEditorGroupCard
              header={
                <AppearanceEditorGroupHeader
                  groupLabel={APPEARANCE_EDITOR_GROUP_LABELS[groupId]}
                  open={open}
                  summary={groupSummaries[groupId]}
                />
              }
              key={groupId}
              onToggle={() => toggleGroup(groupId)}
              open={open}
            >
              {groupId === "typography" ? (
                <AppearanceTypographyGroupContent
                  landing={landing}
                  onSelectTypography={selectTypography}
                  paletteId={appearance.paletteId}
                  typographyId={appearance.typographyId}
                />
              ) : null}
              {groupId === "design" ? (
                <AppearancePaletteGroupContent
                  landing={landing}
                  onSelectPalette={selectPalette}
                  paletteId={appearance.paletteId}
                  paletteOptions={paletteOptions}
                />
              ) : null}
              {groupId === "text-size" ? (
                <AppearanceTextSizeGroupContent
                  appearance={appearance}
                  landing={landing}
                  onSelectButtonTextSize={selectButtonTextSize}
                  onSelectChipTextSize={selectChipTextSize}
                  onSelectContentTextSize={selectContentTextSize}
                  onSelectSubtitleTextSize={selectSubtitleTextSize}
                  onSelectTitleTextSize={selectTitleTextSize}
                />
              ) : null}
            </AppearanceEditorGroupCard>
          );
        })}
      </div>
    </section>
  );
}
