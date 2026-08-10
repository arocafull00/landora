"use client";

import type { Landing, LandingAppearance } from "@/lib/dashboard-data";
import { APPEARANCE_EDITOR_COPY } from "@/components/dashboard/appearance/appearance-editor-copy";
import { TextSizePresetControl } from "@/components/dashboard/appearance/components/text-size-preset-control";

const TEXT_SIZE_SECTIONS = [
  {
    label: APPEARANCE_EDITOR_COPY.buttons,
    previewRole: "button",
    valueKey: "buttonTextSize",
  },
  {
    label: APPEARANCE_EDITOR_COPY.chips,
    previewRole: "chip",
    valueKey: "chipTextSize",
  },
  {
    label: APPEARANCE_EDITOR_COPY.titles,
    previewRole: "title",
    valueKey: "titleTextSize",
  },
  {
    label: APPEARANCE_EDITOR_COPY.subtitles,
    previewRole: "subtitle",
    valueKey: "subtitleTextSize",
  },
  {
    label: APPEARANCE_EDITOR_COPY.content,
    previewRole: "content",
    valueKey: "contentTextSize",
  },
] as const;

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
  const handlers = {
    buttonTextSize: onSelectButtonTextSize,
    chipTextSize: onSelectChipTextSize,
    titleTextSize: onSelectTitleTextSize,
    subtitleTextSize: onSelectSubtitleTextSize,
    contentTextSize: onSelectContentTextSize,
  };

  return (
    <div className="min-w-0 border-t border-outline-variant">
      {TEXT_SIZE_SECTIONS.map((section, index) => (
        <div key={section.valueKey}>
          {index > 0 ? (
            <div aria-hidden className="mx-4 border-t border-border-subtle" />
          ) : null}
          <TextSizePresetControl
            label={section.label}
            onChange={handlers[section.valueKey]}
            previewRole={section.previewRole}
            template={landing.template}
            value={appearance[section.valueKey]}
          />
        </div>
      ))}
    </div>
  );
}
