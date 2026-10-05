"use client";

import dynamic from "next/dynamic";
import type { HeroVariantId } from "@/lib/dashboard-data";
import type { HeroVariantProps } from "@/components/templates/shared/heroes/hero-variant-types";

const NuvoletsHeroVariant = dynamic(() =>
  import("@/components/templates/nuvolets/nuvolets-hero-variant").then((module) => module.NuvoletsHeroVariant),
);
const VelarHeroVariant = dynamic(() =>
  import("@/components/templates/shared/heroes/velar-hero-variant").then((module) => module.VelarHeroVariant),
);
const StudioHeroVariant = dynamic(() =>
  import("@/components/templates/shared/heroes/studio-hero-variant").then((module) => module.StudioHeroVariant),
);
const PortfolioHeroVariant = dynamic(() =>
  import("@/components/templates/shared/heroes/portfolio-hero-variant").then((module) => module.PortfolioHeroVariant),
);
const RistoranteHeroVariant = dynamic(() =>
  import("@/components/templates/shared/heroes/ristorante-hero-variant").then((module) => module.RistoranteHeroVariant),
);
const FloristeriaHeroVariant = dynamic(() =>
  import("@/components/templates/shared/heroes/floristeria-hero-variant").then((module) => module.FloristeriaHeroVariant),
);
const OficioProHeroVariant = dynamic(() =>
  import("@/components/templates/shared/heroes/oficio-pro-hero-variant").then((module) => module.OficioProHeroVariant),
);
const CoffeeShopHeroVariant = dynamic(() =>
  import("@/components/templates/shared/heroes/coffee-shop-hero-variant").then((module) => module.CoffeeShopHeroVariant),
);
const SignalHeroVariant = dynamic(() =>
  import("@/components/templates/shared/heroes/signal-hero-variant").then((module) => module.SignalHeroVariant),
);
const LumenHeroVariant = dynamic(() =>
  import("@/components/templates/shared/heroes/lumen-hero-variant").then((module) => module.LumenHeroVariant),
);
const OffsetHeroVariant = dynamic(() =>
  import("@/components/templates/shared/heroes/offset-hero-variant").then((module) => module.OffsetHeroVariant),
);
const MosaicoHeroVariant = dynamic(() =>
  import("@/components/templates/shared/heroes/mosaico-hero-variant").then((module) => module.MosaicoHeroVariant),
);
const EditorialHeroVariant = dynamic(() =>
  import("@/components/templates/shared/heroes/editorial-hero-variant").then((module) => module.EditorialHeroVariant),
);
const BentoHeroVariant = dynamic(() =>
  import("@/components/templates/shared/heroes/bento-hero-variant").then((module) => module.BentoHeroVariant),
);
const BrutalHeroVariant = dynamic(() =>
  import("@/components/templates/shared/heroes/brutal-hero-variant").then((module) => module.BrutalHeroVariant),
);
const ImmersiveHeroVariant = dynamic(() =>
  import("@/components/templates/shared/heroes/immersive-hero-variant").then((module) => module.ImmersiveHeroVariant),
);
const FuturisticHeroVariant = dynamic(() =>
  import("@/components/templates/shared/heroes/futuristic-hero-variant").then((module) => module.FuturisticHeroVariant),
);

const HERO_COMPONENTS = {
  nuvolets: NuvoletsHeroVariant,
  velar: VelarHeroVariant,
  studio: StudioHeroVariant,
  portfolio: PortfolioHeroVariant,
  ristorante: RistoranteHeroVariant,
  floristeria: FloristeriaHeroVariant,
  "oficio-pro": OficioProHeroVariant,
  "coffee-shop": CoffeeShopHeroVariant,
  signal: SignalHeroVariant,
  lumen: LumenHeroVariant,
  offset: OffsetHeroVariant,
  mosaico: MosaicoHeroVariant,
  editorial: EditorialHeroVariant,
  bento: BentoHeroVariant,
  brutal: BrutalHeroVariant,
  immersive: ImmersiveHeroVariant,
  futuristic: FuturisticHeroVariant,
} satisfies Record<HeroVariantId, React.ComponentType<HeroVariantProps>>;

export function HeroRenderer({
  variantId,
  ...props
}: HeroVariantProps & { variantId: HeroVariantId }) {
  const Component = HERO_COMPONENTS[variantId] ?? VelarHeroVariant;
  return <Component {...props} />;
}
