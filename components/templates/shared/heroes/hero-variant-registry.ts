import type { HeroVariantId } from "@/lib/dashboard-data";
import type {
  HeroNavTone,
  HeroSpecificField,
} from "@/components/templates/shared/heroes/hero-variant-types";
import { VELAR_ASSETS } from "@/lib/velar-assets";
import { STUDIO_ASSETS } from "@/lib/studio-assets";
import { PORTFOLIO_ASSETS } from "@/lib/portfolio-assets";
import { RISTORANTE_ASSETS } from "@/lib/ristorante-assets";
import { FLORISTERIA_ASSETS } from "@/lib/floristeria-assets";
import { OFICIO_PRO_ASSETS } from "@/lib/oficio-pro-assets";
import { COFFEE_SHOP_ASSETS } from "@/lib/coffee-shop-assets";

export type HeroVariantDefinition = {
  id: HeroVariantId;
  label: string;
  description: string;
  thumbnail: string;
  navTone: HeroNavTone;
  specificFields: readonly HeroSpecificField[];
};

const HERO_VARIANTS: Record<HeroVariantId, HeroVariantDefinition> = {
  velar: {
    id: "velar",
    label: "Velar",
    description: "Tipografía monumental sobre una imagen a pantalla completa.",
    thumbnail: VELAR_ASSETS.hero,
    navTone: "dark",
    specificFields: ["houseImage"],
  },
  studio: {
    id: "studio",
    label: "Studio",
    description: "Portada comercial con alto contraste, datos y doble acción.",
    thumbnail: STUDIO_ASSETS.hero,
    navTone: "light",
    specificFields: [],
  },
  portfolio: {
    id: "portfolio",
    label: "Portfolio",
    description: "Composición editorial modular con dos imágenes.",
    thumbnail: PORTFOLIO_ASSETS.hero,
    navTone: "light",
    specificFields: ["houseImage"],
  },
  ristorante: {
    id: "ristorante",
    label: "Ristorante",
    description: "Imagen inmersiva con composición elegante y asimétrica.",
    thumbnail: RISTORANTE_ASSETS.hero,
    navTone: "light",
    specificFields: [],
  },
  floristeria: {
    id: "floristeria",
    label: "Floristería",
    description: "Abanico visual orgánico con cinco imágenes protagonistas.",
    thumbnail: FLORISTERIA_ASSETS.hero,
    navTone: "dark",
    specificFields: ["fanImages"],
  },
  "oficio-pro": {
    id: "oficio-pro",
    label: "Oficio Pro",
    description: "Mensaje directo, robusto y orientado a conversión.",
    thumbnail: OFICIO_PRO_ASSETS.hero,
    navTone: "light",
    specificFields: [],
  },
  "coffee-shop": {
    id: "coffee-shop",
    label: "Coffee Shop",
    description: "Diseño dividido entre contenido e imagen de producto.",
    thumbnail: COFFEE_SHOP_ASSETS.hero,
    navTone: "dark",
    specificFields: [],
  },
};

export function getHeroVariants(): HeroVariantDefinition[] {
  return Object.values(HERO_VARIANTS);
}

export function getHeroVariant(
  id: HeroVariantId,
): HeroVariantDefinition {
  return HERO_VARIANTS[id];
}
