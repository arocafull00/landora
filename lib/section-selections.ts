import type {
  GalleryVariantId,
  HeroVariantId,
  LandingSectionSelections,
  TemplateId,
} from "@/lib/dashboard-data";

const GALLERY_VARIANT_IDS = [
  "grid",
  "polaroid",
  "cinematic",
] as const satisfies readonly GalleryVariantId[];

const HERO_VARIANT_IDS = [
  "velar",
  "studio",
  "portfolio",
  "ristorante",
  "floristeria",
  "oficio-pro",
  "coffee-shop",
  "signal",
  "lumen",
  "offset",
  "mosaico",
  "editorial",
  "bento",
  "brutal",
  "immersive",
  "futuristic",
] as const satisfies readonly HeroVariantId[];

export function isHeroVariantId(value: string): value is HeroVariantId {
  return HERO_VARIANT_IDS.some((id) => id === value);
}

export function isGalleryVariantId(value: string): value is GalleryVariantId {
  return GALLERY_VARIANT_IDS.some((id) => id === value);
}

export function getDefaultHeroVariantId(template: TemplateId): HeroVariantId {
  return isHeroVariantId(template) ? template : "velar";
}

export function getDefaultSectionSelections(
  template: TemplateId,
): LandingSectionSelections {
  return {
    hero: getDefaultHeroVariantId(template),
    gallery: "grid",
  };
}

export function resolveSectionSelections(
  template: TemplateId,
  rows: Array<{ sectionKey: string; variantId: string }>,
): LandingSectionSelections {
  const selections = getDefaultSectionSelections(template);

  for (const row of rows) {
    if (row.sectionKey === "hero" && isHeroVariantId(row.variantId)) {
      selections.hero = row.variantId;
      continue;
    }

    if (row.sectionKey === "gallery" && isGalleryVariantId(row.variantId)) {
      selections.gallery = row.variantId;
    }
  }

  return selections;
}
