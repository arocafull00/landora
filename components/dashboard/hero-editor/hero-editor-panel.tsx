"use client";

import type { Landing } from "@/lib/dashboard-data";
import { EditorSectionTitle } from "@/components/dashboard/editor-section-title";
import { HeroCommonFields } from "@/components/dashboard/hero-editor/components/hero-common-fields";
import { HeroSpecificFields } from "@/components/dashboard/hero-editor/components/hero-specific-fields";
import { HeroVariantSelector } from "@/components/dashboard/hero-editor/components/hero-variant-selector";
import { useHeroEditor } from "@/components/dashboard/hero-editor/hooks/use-hero-editor";

export function HeroEditorPanel({ landing }: { landing: Landing }) {
  const {
    definition,
    hero,
    onHeroChange,
    onVariantChange,
    templateId,
    variantId,
  } = useHeroEditor(landing);

  return (
    <section className="space-y-6 py-unit-lg">
      <EditorSectionTitle
        description="Elige cualquier portada y adapta su contenido sin cambiar el resto del template."
        title="Portada"
      />
      <HeroVariantSelector onChange={onVariantChange} value={variantId} />
      <HeroCommonFields
        hero={hero}
        onChange={onHeroChange}
        templateId={templateId}
      />
      <HeroSpecificFields
        fields={definition.specificFields}
        hero={hero}
        onChange={onHeroChange}
        templateId={templateId}
        variantId={variantId}
      />
    </section>
  );
}
