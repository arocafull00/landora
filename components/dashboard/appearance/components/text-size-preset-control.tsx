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
  title: "Título principal",
  subtitle: "Subtítulo de sección",
  content: "Texto de contenido y descripciones.",
} as const;

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
  const selectedOption =
    TEXT_SIZE_PRESET_OPTIONS[selectedIndex] ??
    TEXT_SIZE_PRESET_OPTIONS[2];

  const handleValueChange = ([nextIndex]: number[]) => {
    const option = TEXT_SIZE_PRESET_OPTIONS[nextIndex];
    if (!option) return;
    onChange(option.id);
  };

  return (
    <fieldset className="min-w-0 space-y-3 rounded-xl border border-outline-variant/60 p-4">
      <legend className="px-1 font-label text-label-md text-on-surface-variant">
        {label}
      </legend>
      <SiteThemeScope appearance={previewAppearance} className="min-w-0" template={template}>
        <div className="min-w-0 w-full overflow-x-auto rounded-lg border border-outline-variant/40 bg-surface-container-low px-4 py-3">
          {previewRole === "button" ? (
            <span className="inline-flex max-w-none rounded-full bg-primary px-4 py-2 font-semibold text-on-primary text-site-button">
              {PREVIEW_COPY.button}
            </span>
          ) : null}
          {previewRole === "chip" ? (
            <span className="inline-flex max-w-none rounded-full border border-outline-variant px-3 py-1 font-semibold uppercase tracking-wider text-on-surface text-site-chip">
              {PREVIEW_COPY.chip}
            </span>
          ) : null}
          {previewRole === "title" ? (
            <p className="max-w-none wrap-anywhere font-headline font-semibold text-on-surface text-site-title">
              {PREVIEW_COPY.title}
            </p>
          ) : null}
          {previewRole === "subtitle" ? (
            <p className="max-w-none wrap-anywhere font-body text-on-surface-variant text-site-subtitle">
              {PREVIEW_COPY.subtitle}
            </p>
          ) : null}
          {previewRole === "content" ? (
            <p className="max-w-none wrap-anywhere font-body text-on-surface-variant text-site-content">
              {PREVIEW_COPY.content}
            </p>
          ) : null}
        </div>
      </SiteThemeScope>
      <div className="space-y-2">
        <div className="flex items-center justify-between font-body text-body-sm text-on-surface-variant">
          <span>Muy pequeño</span>
          <span className="font-medium text-primary">{selectedOption.label}</span>
          <span>Muy grande</span>
        </div>
        <div className="relative px-1">
          <Slider
            aria-label={label}
            max={TEXT_SIZE_PRESET_OPTIONS.length - 1}
            min={0}
            onValueChange={handleValueChange}
            step={1}
            value={[Math.max(selectedIndex, 0)]}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-1 top-1/2 z-0 flex -translate-y-1/2 justify-between px-0.5"
          >
            {TEXT_SIZE_PRESET_OPTIONS.map((option) => (
              <span
                className="size-1.5 rounded-full bg-surface-container-lowest ring-1 ring-outline"
                key={option.id}
              />
            ))}
          </div>
        </div>
      </div>
    </fieldset>
  );
}
