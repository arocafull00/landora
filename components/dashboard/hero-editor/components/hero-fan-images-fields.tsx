"use client";

import type { HeroContent, TemplateId } from "@/lib/dashboard-data";
import { ImageField } from "@/components/dashboard/image-field";

export function HeroFanImagesFields({
  hero,
  onChange,
  templateId,
}: {
  hero: HeroContent;
  onChange: (patch: Partial<HeroContent>) => void;
  templateId: TemplateId;
}) {
  const fanImages = Array.from(
    { length: 5 },
    (_, index) => hero.fanImages?.[index] ?? hero.image,
  );

  return (
    <div className="space-y-5">
      <p className="text-body-sm font-semibold text-on-surface">
        Imágenes del abanico
      </p>
      {fanImages.map((image, index) => (
        <ImageField
          key={index}
          label={`Imagen ${index + 1}`}
          onChange={(value) => {
            const nextImages = [...fanImages];
            nextImages[index] = value;
            onChange({ fanImages: nextImages });
          }}
          templateId={templateId}
          value={image}
        />
      ))}
    </div>
  );
}
