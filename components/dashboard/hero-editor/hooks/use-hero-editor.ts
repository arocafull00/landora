"use client";

import type { HeroContent, HeroVariantId, Landing } from "@/lib/dashboard-data";
import { getHeroVariant } from "@/components/templates/shared/heroes/hero-variant-registry";
import { useDashboardStore } from "@/stores/dashboard-store";

export function useHeroEditor(landing: Landing) {
  const updateHero = useDashboardStore((state) => state.updateHero);
  const updateHeroVariant = useDashboardStore(
    (state) => state.updateHeroVariant,
  );
  const variantId = landing.sectionSelections.hero;

  return {
    definition: getHeroVariant(variantId),
    hero: landing.content.hero,
    onHeroChange: (patch: Partial<HeroContent>) =>
      updateHero(landing.id, patch),
    onVariantChange: (nextVariantId: HeroVariantId) =>
      updateHeroVariant(landing.id, nextVariantId),
    templateId: landing.template,
    variantId,
  };
}
