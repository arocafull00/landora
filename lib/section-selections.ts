import type {
  HeroVariantId,
  LandingSectionSelections,
  SectionKey,
  TemplateId,
} from "@/lib/dashboard-data";

const HERO_VARIANT_IDS = [
  "velar",
  "studio",
  "portfolio",
  "ristorante",
  "floristeria",
  "oficio-pro",
  "coffee-shop",
] as const satisfies readonly HeroVariantId[];

const SECTION_KEYS = ["hero"] as const satisfies readonly SectionKey[];

export function isHeroVariantId(value: string): value is HeroVariantId {
  return HERO_VARIANT_IDS.some((id) => id === value);
}

export function isSectionKey(value: string): value is SectionKey {
  return SECTION_KEYS.some((key) => key === value);
}

export function getDefaultHeroVariantId(template: TemplateId): HeroVariantId {
  return isHeroVariantId(template) ? template : "velar";
}

export function getDefaultSectionSelections(
  template: TemplateId,
): LandingSectionSelections {
  return {
    hero: getDefaultHeroVariantId(template),
  };
}

export function resolveSectionSelections(
  template: TemplateId,
  rows: Array<{ sectionKey: string; variantId: string }>,
): LandingSectionSelections {
  const selections = getDefaultSectionSelections(template);

  for (const row of rows) {
    if (row.sectionKey !== "hero" || !isHeroVariantId(row.variantId)) continue;
    selections.hero = row.variantId;
  }

  return selections;
}
