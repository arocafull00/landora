import type { HeroVariantId } from "@/lib/dashboard-data";
import type { HeroVariantProps } from "@/components/templates/shared/heroes/hero-variant-types";
import { VelarHeroVariant } from "@/components/templates/shared/heroes/velar-hero-variant";
import { StudioHeroVariant } from "@/components/templates/shared/heroes/studio-hero-variant";
import { PortfolioHeroVariant } from "@/components/templates/shared/heroes/portfolio-hero-variant";
import { RistoranteHeroVariant } from "@/components/templates/shared/heroes/ristorante-hero-variant";
import { FloristeriaHeroVariant } from "@/components/templates/shared/heroes/floristeria-hero-variant";
import { OficioProHeroVariant } from "@/components/templates/shared/heroes/oficio-pro-hero-variant";
import { CoffeeShopHeroVariant } from "@/components/templates/shared/heroes/coffee-shop-hero-variant";
import { LumenHeroVariant } from "@/components/templates/shared/heroes/lumen-hero-variant";
import { OffsetHeroVariant } from "@/components/templates/shared/heroes/offset-hero-variant";
import { MosaicoHeroVariant } from "@/components/templates/shared/heroes/mosaico-hero-variant";
import { EditorialHeroVariant } from "@/components/templates/shared/heroes/editorial-hero-variant";
import { BentoHeroVariant } from "@/components/templates/shared/heroes/bento-hero-variant";
import { BrutalHeroVariant } from "@/components/templates/shared/heroes/brutal-hero-variant";
import { ImmersiveHeroVariant } from "@/components/templates/shared/heroes/immersive-hero-variant";
import { FuturisticHeroVariant } from "@/components/templates/shared/heroes/futuristic-hero-variant";

const HERO_COMPONENTS = {
  velar: VelarHeroVariant,
  studio: StudioHeroVariant,
  portfolio: PortfolioHeroVariant,
  ristorante: RistoranteHeroVariant,
  floristeria: FloristeriaHeroVariant,
  "oficio-pro": OficioProHeroVariant,
  "coffee-shop": CoffeeShopHeroVariant,
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
