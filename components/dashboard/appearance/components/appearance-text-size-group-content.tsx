"use client";

import type { Landing, LandingAppearance } from "@/lib/dashboard-data";
import { APPEARANCE_EDITOR_COPY } from "@/components/dashboard/appearance/appearance-editor-copy";
import { TextSizePresetControl } from "@/components/dashboard/appearance/components/text-size-preset-control";

export function AppearanceTextSizeGroupContent({
  appearance,
  landing,
  onSelectButtonTextSize,
  onSelectChipTextSize,
  onSelectContentTextSize,
  onSelectSubtitleTextSize,
  onSelectTitleTextSize,
}: {
  appearance: LandingAppearance;
  landing: Landing;
  onSelectButtonTextSize: (value: LandingAppearance["buttonTextSize"]) => void;
  onSelectChipTextSize: (value: LandingAppearance["chipTextSize"]) => void;
  onSelectContentTextSize: (value: LandingAppearance["contentTextSize"]) => void;
  onSelectSubtitleTextSize: (value: LandingAppearance["subtitleTextSize"]) => void;
  onSelectTitleTextSize: (value: LandingAppearance["titleTextSize"]) => void;
}) {
  return (
    <div className="min-w-0 space-y-4 border-t border-outline-variant bg-surface-container-lowest p-4">
      <TextSizePresetControl
        label={APPEARANCE_EDITOR_COPY.buttons}
        onChange={onSelectButtonTextSize}
        previewRole="button"
        template={landing.template}
        value={appearance.buttonTextSize}
      />
      <TextSizePresetControl
        label={APPEARANCE_EDITOR_COPY.chips}
        onChange={onSelectChipTextSize}
        previewRole="chip"
        template={landing.template}
        value={appearance.chipTextSize}
      />
      <TextSizePresetControl
        label={APPEARANCE_EDITOR_COPY.titles}
        onChange={onSelectTitleTextSize}
        previewRole="title"
        template={landing.template}
        value={appearance.titleTextSize}
      />
      <TextSizePresetControl
        label={APPEARANCE_EDITOR_COPY.subtitles}
        onChange={onSelectSubtitleTextSize}
        previewRole="subtitle"
        template={landing.template}
        value={appearance.subtitleTextSize}
      />
      <TextSizePresetControl
        label={APPEARANCE_EDITOR_COPY.content}
        onChange={onSelectContentTextSize}
        previewRole="content"
        template={landing.template}
        value={appearance.contentTextSize}
      />
    </div>
  );
}
