"use client";

import dynamic from "next/dynamic";
import type { HeroVariantId } from "@/lib/dashboard-data";
import type { HeroVariantProps } from "@/components/templates/shared/heroes/hero-variant-types";

const VelarHeroVariant = dynamic(() =>
  import("@/components/templates/shared/heroes/velar-hero-variant").then(
    (module) => module.VelarHeroVariant,
  ),
);
const StudioHeroVariant = dynamic(() =>
  import("@/components/templates/shared/heroes/studio-hero-variant").then(
    (module) => module.StudioHeroVariant,
  ),
);
const PortfolioHeroVariant = dynamic(() =>
  import("@/components/templates/shared/heroes/portfolio-hero-variant").then(
    (module) => module.PortfolioHeroVariant,
  ),
);
const RistoranteHeroVariant = dynamic(() =>
  import("@/components/templates/shared/heroes/ristorante-hero-variant").then(
    (module) => module.RistoranteHeroVariant,
  ),
);
const FloristeriaHeroVariant = dynamic(() =>
  import("@/components/templates/shared/heroes/floristeria-hero-variant").then(
    (module) => module.FloristeriaHeroVariant,
  ),
);
const OficioProHeroVariant = dynamic(() =>
  import("@/components/templates/shared/heroes/oficio-pro-hero-variant").then(
    (module) => module.OficioProHeroVariant,
  ),
);
const CoffeeShopHeroVariant = dynamic(() =>
  import("@/components/templates/shared/heroes/coffee-shop-hero-variant").then(
    (module) => module.CoffeeShopHeroVariant,
  ),
);

const HERO_COMPONENTS = {
  velar: VelarHeroVariant,
  studio: StudioHeroVariant,
  portfolio: PortfolioHeroVariant,
  ristorante: RistoranteHeroVariant,
  floristeria: FloristeriaHeroVariant,
  "oficio-pro": OficioProHeroVariant,
  "coffee-shop": CoffeeShopHeroVariant,
} satisfies Record<HeroVariantId, React.ComponentType<HeroVariantProps>>;

export function HeroRenderer({
  variantId,
  ...props
}: HeroVariantProps & { variantId: HeroVariantId }) {
  const Component = HERO_COMPONENTS[variantId] ?? VelarHeroVariant;
  return <Component {...props} />;
}
