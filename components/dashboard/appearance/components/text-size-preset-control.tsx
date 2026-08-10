"use client";

import type { TextSizePreset, TemplateId } from "@/lib/dashboard-data";
import {
  DEFAULT_LANDING_APPEARANCE,
  TEXT_SIZE_PRESET_OPTIONS,
} from "@/lib/site-appearance";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SiteThemeScope } from "@/components/templates/site-theme-scope";

const PREVIEW_COPY = {
  button: "Contactar",
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
  previewRole: "button" | "title" | "subtitle" | "content";
  template: TemplateId;
  value: TextSizePreset;
}) {
  const previewAppearance = {
    ...DEFAULT_LANDING_APPEARANCE,
    buttonTextSize: previewRole === "button" ? value : DEFAULT_LANDING_APPEARANCE.buttonTextSize,
    titleTextSize: previewRole === "title" ? value : DEFAULT_LANDING_APPEARANCE.titleTextSize,
    subtitleTextSize:
      previewRole === "subtitle" ? value : DEFAULT_LANDING_APPEARANCE.subtitleTextSize,
    contentTextSize: previewRole === "content" ? value : DEFAULT_LANDING_APPEARANCE.contentTextSize,
  };

  return (
    <fieldset className="space-y-3 rounded-xl border border-outline-variant/60 p-4">
      <legend className="px-1 font-label text-label-md text-on-surface-variant">
        {label}
      </legend>
      <SiteThemeScope appearance={previewAppearance} template={template}>
        <div className="rounded-lg border border-outline-variant/40 bg-surface-container-low px-4 py-3">
          {previewRole === "button" ? (
            <span className="inline-flex rounded-full bg-primary px-4 py-2 font-semibold text-on-primary text-site-button">
              {PREVIEW_COPY.button}
            </span>
          ) : null}
          {previewRole === "title" ? (
            <p className="font-headline font-semibold text-on-surface text-site-title">
              {PREVIEW_COPY.title}
            </p>
          ) : null}
          {previewRole === "subtitle" ? (
            <p className="font-body text-on-surface-variant text-site-subtitle">
              {PREVIEW_COPY.subtitle}
            </p>
          ) : null}
          {previewRole === "content" ? (
            <p className="font-body text-on-surface-variant text-site-content">
              {PREVIEW_COPY.content}
            </p>
          ) : null}
        </div>
      </SiteThemeScope>
      <RadioGroup
        aria-label={label}
        className="grid grid-cols-3 gap-2"
        onValueChange={(nextValue) => onChange(nextValue as TextSizePreset)}
        value={value}
      >
        {TEXT_SIZE_PRESET_OPTIONS.map((option) => (
          <div className="flex items-center gap-2" key={option.id}>
            <RadioGroupItem id={`${label}-${option.id}`} value={option.id} />
            <Label className="font-body text-body-sm" htmlFor={`${label}-${option.id}`}>
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </fieldset>
  );
}
