import type { HeroContent } from "@/lib/dashboard-data";
import { isBackgroundPreset } from "@/lib/background-assets";

export const FLORISTERIA_HERO_FAN_EDGES = {
  left: { src: "bouquet6", alt: "Detalle floral" },
  right: { src: "bouquet2", alt: "Ramo delicado" },
} as const;

export const FLORISTERIA_ASSETS = {
  hero: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1920&q=85&auto=format",
  interior1: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&q=85&auto=format",
  interior2: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=85&auto=format",
  bouquet1: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&q=85&auto=format",
  bouquet2: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&q=85&auto=format",
  bouquet3: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800&q=85&auto=format",
  bouquet4: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&q=85&auto=format",
  bouquet5: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=800&q=85&auto=format",
  bouquet6: "https://images.unsplash.com/photo-1469259943454-aa100abba749?w=800&q=85&auto=format",
  florist1: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=85&auto=format",
  florist2: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=85&auto=format",
  florist3: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=85&auto=format",
  gallery1: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=85&auto=format",
  gallery2: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&q=85&auto=format",
  gallery3: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800&q=85&auto=format",
  gallery4: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&q=85&auto=format",
  gallery5: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=800&q=85&auto=format",
  gallery6: "https://images.unsplash.com/photo-1469259943454-aa100abba749?w=800&q=85&auto=format",
  gallery7: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&q=85&auto=format",
  heroGrass: "/templates/floristeria/grass.png",
  aboutBg: "/templates/floristeria/bg.png",
  testimonialsBg: "/templates/floristeria/bg-2.png",
  ctaBgLottie: "/templates/floristeria/Floral%20Frame.json",
} as const;

export const FLORISTERIA_IMAGE_OPTIONS = [
  { value: FLORISTERIA_ASSETS.hero, label: "Portada" },
  { value: FLORISTERIA_ASSETS.interior1, label: "Interior 1" },
  { value: FLORISTERIA_ASSETS.interior2, label: "Interior 2" },
  { value: FLORISTERIA_ASSETS.bouquet1, label: "Ramo 1" },
  { value: FLORISTERIA_ASSETS.bouquet3, label: "Ramo 2" },
  { value: FLORISTERIA_ASSETS.bouquet4, label: "Ramo 3" },
  { value: FLORISTERIA_ASSETS.bouquet5, label: "Ramo 4" },
  { value: FLORISTERIA_ASSETS.bouquet6, label: "Ramo 5" },
  { value: FLORISTERIA_ASSETS.florist1, label: "Florista 1" },
  { value: FLORISTERIA_ASSETS.florist2, label: "Florista 2" },
  { value: FLORISTERIA_ASSETS.florist3, label: "Florista 3" },
] as const;

export const FLORISTERIA_HERO_FAN_DEFAULT_IMAGES = [
  FLORISTERIA_ASSETS.bouquet1,
  FLORISTERIA_ASSETS.bouquet3,
  FLORISTERIA_ASSETS.hero,
  FLORISTERIA_ASSETS.bouquet4,
  FLORISTERIA_ASSETS.bouquet5,
] as const;

export function resolveFloristeriaFanImages(hero: HeroContent): string[] {
  return FLORISTERIA_HERO_FAN_DEFAULT_IMAGES.map((fallback, index) => {
    const stored = hero.fanImages?.[index];
    if (stored && !isBackgroundPreset(stored)) return stored;

    if (index === 2 && hero.image && !isBackgroundPreset(hero.image)) {
      return hero.image;
    }

    return fallback;
  });
}
