"use client";

import type { TextSizePreset, TemplateId } from "@/lib/dashboard-data";
import {
  DEFAULT_LANDING_APPEARANCE,
  TEXT_SIZE_PRESET_OPTIONS,
} from "@/lib/site-appearance";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";
import { Slider } from "@/components/ui/slider";

const PREVIEW_COPY = {
  button: "Contactar",
  chip: "Etiqueta",
  titleLine1: "Título",
  titleLine2: "principal",
  subtitle: "Subtítulo de sección",
  content: "Texto de contenido y descripciones.",
} as const;

function getSliderRangeLabels(selectedIndex: number) {
  const lastIndex = TEXT_SIZE_PRESET_OPTIONS.length - 1;
  const safeIndex = Math.max(0, Math.min(selectedIndex, lastIndex));
  const leftIndex =
    safeIndex <= 0 ? 0 : safeIndex >= 3 ? safeIndex - 2 : safeIndex - 1;

  return {
    left: TEXT_SIZE_PRESET_OPTIONS[leftIndex]?.label ?? TEXT_SIZE_PRESET_OPTIONS[0].label,
    center:
      TEXT_SIZE_PRESET_OPTIONS[safeIndex]?.label ?? TEXT_SIZE_PRESET_OPTIONS[2].label,
    right: TEXT_SIZE_PRESET_OPTIONS[lastIndex]?.label ?? TEXT_SIZE_PRESET_OPTIONS[2].label,
  };
}

export function TextSizePresetControl({
  label,
  onChange,
  previewRole,
  template,
  value,
}: {
  label: string;
  onChange: (value: TextSizePreset) => void;
  previewRole: "button" | "chip" | "title" | "subtitle" | "content";
  template: TemplateId;
  value: TextSizePreset;
}) {
  const previewAppearance = {
    ...DEFAULT_LANDING_APPEARANCE,
    buttonTextSize: previewRole === "button" ? value : DEFAULT_LANDING_APPEARANCE.buttonTextSize,
    chipTextSize: previewRole === "chip" ? value : DEFAULT_LANDING_APPEARANCE.chipTextSize,
    titleTextSize: previewRole === "title" ? value : DEFAULT_LANDING_APPEARANCE.titleTextSize,
    subtitleTextSize:
      previewRole === "subtitle" ? value : DEFAULT_LANDING_APPEARANCE.subtitleTextSize,
    contentTextSize: previewRole === "content" ? value : DEFAULT_LANDING_APPEARANCE.contentTextSize,
  };
  const selectedIndex = TEXT_SIZE_PRESET_OPTIONS.findIndex(
    (option) => option.id === value,
  );
  const safeSelectedIndex = Math.max(selectedIndex, 0);
  const selectedOption =
    TEXT_SIZE_PRESET_OPTIONS[safeSelectedIndex] ?? TEXT_SIZE_PRESET_OPTIONS[2];
  const sliderLabels = getSliderRangeLabels(safeSelectedIndex);
  const isCompactPreview = previewRole === "button" || previewRole === "chip";

  const handleValueChange = ([nextIndex]: number[]) => {
    const option = TEXT_SIZE_PRESET_OPTIONS[nextIndex];
    if (!option) return;
    onChange(option.id);
  };

  return (
    <section className="min-w-0 px-4 py-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="font-label text-label-sm tracking-wide text-on-surface">
          {label}
        </span>
        <span className="shrink-0 font-body text-body-sm text-primary">
          {selectedOption.label}
        </span>
      </div>

      <SiteThemeScope appearance={previewAppearance} className="min-w-0" template={template}>
        <div
          className={
            isCompactPreview
              ? "flex min-h-14 min-w-0 items-center overflow-x-auto rounded-lg bg-inverse-surface px-4"
              : "min-w-0 overflow-x-auto rounded-lg bg-inverse-surface px-4 py-5"
          }
        >
          {previewRole === "button" ? (
            <span className="inline-flex max-w-none rounded-full bg-primary px-4 py-2 font-semibold text-on-primary text-site-button">
              {PREVIEW_COPY.button}
            </span>
          ) : null}
          {previewRole === "chip" ? (
            <span className="inline-flex max-w-none rounded-full border border-inverse-on-surface/20 px-3 py-1 font-semibold uppercase tracking-wider text-inverse-on-surface text-site-chip">
              {PREVIEW_COPY.chip}
            </span>
          ) : null}
          {previewRole === "title" ? (
            <p className="max-w-none font-headline font-semibold leading-[0.95] tracking-tight text-inverse-on-surface text-site-title">
              {PREVIEW_COPY.titleLine1}
              <br />
              {PREVIEW_COPY.titleLine2}
            </p>
          ) : null}
          {previewRole === "subtitle" ? (
            <p className="max-w-none wrap-anywhere font-body text-inverse-on-surface/80 text-site-subtitle">
              {PREVIEW_COPY.subtitle}
            </p>
          ) : null}
          {previewRole === "content" ? (
            <p className="max-w-none wrap-anywhere font-body text-inverse-on-surface/80 text-site-content">
              {PREVIEW_COPY.content}
            </p>
          ) : null}
        </div>
      </SiteThemeScope>

      <div className="mt-4">
        <div className="mb-2 grid grid-cols-3 gap-2 font-body text-body-sm text-on-surface-variant">
          <span>{sliderLabels.left}</span>
          <span className="text-center font-medium text-primary">{sliderLabels.center}</span>
          <span className="text-right">{sliderLabels.right}</span>
        </div>
        <Slider
          aria-label={label}
          max={TEXT_SIZE_PRESET_OPTIONS.length - 1}
          min={0}
          onValueChange={handleValueChange}
          step={1}
          value={[safeSelectedIndex]}
        />
      </div>
    </section>
  );
}
