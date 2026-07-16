"use client";

import type { HeroVariantId } from "@/lib/dashboard-data";
import {
  getHeroVariants,
} from "@/components/templates/shared/heroes/hero-variant-registry";
import { HeroVariantCard } from "@/components/dashboard/hero-editor/components/hero-variant-card";

const HERO_VARIANTS = getHeroVariants();

export function HeroVariantSelector({
  onChange,
  value,
}: {
  onChange: (variantId: HeroVariantId) => void;
  value: HeroVariantId;
}) {
  return (
    <div
      aria-label="Tipo de hero"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      role="radiogroup"
    >
      {HERO_VARIANTS.map((definition) => (
        <HeroVariantCard
          definition={definition}
          key={definition.id}
          onSelect={onChange}
          selected={definition.id === value}
        />
      ))}
    </div>
  );
}
