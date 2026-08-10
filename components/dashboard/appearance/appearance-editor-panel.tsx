"use client";

import type { Landing } from "@/lib/dashboard-data";
import { EditorSectionTitle } from "@/components/dashboard/editor-section-title";
import { RadioGroup } from "@/components/ui/radio-group";
import { PaletteOptionCard } from "@/components/dashboard/appearance/components/palette-option-card";
import { TypographyOptionCard } from "@/components/dashboard/appearance/components/typography-option-card";
import { TextSizePresetControl } from "@/components/dashboard/appearance/components/text-size-preset-control";
import { useAppearanceEditor } from "@/components/dashboard/appearance/hooks/use-appearance-editor";

const COPY = {
  title: "Diseño",
  description: "Elige una identidad visual preparada para tu plantilla.",
  palettes: "Paleta de colores",
  typography: "Tipografía",
  textSizes: "Tamaños de texto",
  buttons: "Botones",
  titles: "Títulos",
  subtitles: "Subtítulos",
  content: "Contenido",
} as const;

export function AppearanceEditorPanel({ landing }: { landing: Landing }) {
  const {
    appearance,
    paletteOptions,
    selectButtonTextSize,
    selectContentTextSize,
    selectPalette,
    selectSubtitleTextSize,
    selectTitleTextSize,
    selectTypography,
    typographyOptions,
  } = useAppearanceEditor(landing);

  return (
    <section className="space-y-8 py-unit-lg">
      <EditorSectionTitle description={COPY.description} title={COPY.title} />

      <fieldset className="space-y-3">
        <legend className="font-label text-label-md text-on-surface-variant">
          {COPY.palettes}
        </legend>
        <RadioGroup
          aria-label={COPY.palettes}
          className="grid gap-3"
          onValueChange={selectPalette}
          value={appearance.paletteId}
        >
          {paletteOptions.map((option) => (
            <PaletteOptionCard
              description={option.description}
              id={option.id}
              key={option.id}
              label={option.label}
              selected={appearance.paletteId === option.id}
              template={landing.template}
            />
          ))}
        </RadioGroup>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="font-label text-label-md text-on-surface-variant">
          {COPY.typography}
        </legend>
        <RadioGroup
          aria-label={COPY.typography}
          className="grid gap-3"
          onValueChange={selectTypography}
          value={appearance.typographyId}
        >
          {typographyOptions.map((option) => (
            <TypographyOptionCard
              description={option.description}
              id={option.id}
              key={option.id}
              label={option.label}
              paletteId={appearance.paletteId}
              selected={appearance.typographyId === option.id}
              template={landing.template}
            />
          ))}
        </RadioGroup>
      </fieldset>

      <div className="space-y-4">
        <h3 className="font-label text-label-md text-on-surface-variant">{COPY.textSizes}</h3>
        <TextSizePresetControl
          label={COPY.buttons}
          onChange={selectButtonTextSize}
          previewRole="button"
          template={landing.template}
          value={appearance.buttonTextSize}
        />
        <TextSizePresetControl
          label={COPY.titles}
          onChange={selectTitleTextSize}
          previewRole="title"
          template={landing.template}
          value={appearance.titleTextSize}
        />
        <TextSizePresetControl
          label={COPY.subtitles}
          onChange={selectSubtitleTextSize}
          previewRole="subtitle"
          template={landing.template}
          value={appearance.subtitleTextSize}
        />
        <TextSizePresetControl
          label={COPY.content}
          onChange={selectContentTextSize}
          previewRole="content"
          template={landing.template}
          value={appearance.contentTextSize}
        />
      </div>
    </section>
  );
}
