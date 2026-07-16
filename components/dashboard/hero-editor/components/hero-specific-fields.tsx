"use client";

import type { HeroContent, TemplateId } from "@/lib/dashboard-data";
import type { HeroSpecificField } from "@/components/templates/shared/heroes/hero-variant-types";
import { HeroFanImagesFields } from "@/components/dashboard/hero-editor/components/hero-fan-images-fields";
import { ImageField } from "@/components/dashboard/image-field";

export function HeroSpecificFields({
  fields,
  hero,
  onChange,
  templateId,
}: {
  fields: readonly HeroSpecificField[];
  hero: HeroContent;
  onChange: (patch: Partial<HeroContent>) => void;
  templateId: TemplateId;
}) {
  if (fields.length === 0) return null;

  return (
    <div className="space-y-5 border-t border-outline-variant pt-5">
      {fields.includes("houseImage") ? (
        <ImageField
          label="Imagen secundaria"
          onChange={(houseImage) => onChange({ houseImage })}
          templateId={templateId}
          value={hero.houseImage ?? hero.image}
        />
      ) : null}
      {fields.includes("fanImages") ? (
        <HeroFanImagesFields
          hero={hero}
          onChange={onChange}
          templateId={templateId}
        />
      ) : null}
    </div>
  );
}
