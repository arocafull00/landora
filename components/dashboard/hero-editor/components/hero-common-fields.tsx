"use client";

import type {
  HeroContent,
  TemplateId,
} from "@/lib/dashboard-data";
import { BACKGROUND_IMAGE_OPTIONS } from "@/lib/background-assets";
import { EditorTextArea } from "@/components/dashboard/editor-text-area";
import { EditorTextField } from "@/components/dashboard/editor-text-field";
import { ImageField } from "@/components/dashboard/image-field";

export function HeroCommonFields({
  hero,
  onChange,
  templateId,
}: {
  hero: HeroContent;
  onChange: (patch: Partial<HeroContent>) => void;
  templateId: TemplateId;
}) {
  return (
    <div className="space-y-5">
      <EditorTextField
        editorId="hero:eyebrow"
        label="Texto superior"
        onChange={(eyebrow) => onChange({ eyebrow })}
        value={hero.eyebrow}
      />
      <div id="tutorial-hero-title">
        <EditorTextField
          editorId="hero:title"
          label="Título"
          onChange={(title) => onChange({ title })}
          value={hero.title}
        />
      </div>
      <EditorTextArea
        editorId="hero:subtitle"
        label="Subtítulo"
        onChange={(subtitle) => onChange({ subtitle })}
        value={hero.subtitle}
      />
      <EditorTextArea
        editorId="hero:description"
        label="Descripción"
        onChange={(description) => onChange({ description })}
        value={hero.description}
      />
      <EditorTextField
        editorId="hero:cta"
        label="Texto del botón principal"
        onChange={(ctaLabel) => onChange({ ctaLabel })}
        value={hero.ctaLabel}
      />
      <ImageField
        label="Imagen principal"
        onChange={(image) => onChange({ image })}
        presets={BACKGROUND_IMAGE_OPTIONS}
        templateId={templateId}
        value={hero.image}
      />
    </div>
  );
}
