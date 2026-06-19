import type { HeroBannerOffer, PromotionCardsOffer } from "@/lib/dashboard-data";

export function createEmptyHeroBannerOffer(): HeroBannerOffer {
  return {
    id: crypto.randomUUID(),
    type: "hero_banner",
    title: "",
    description: "",
    enabled: true,
  };
}

export function createEmptyPromotionCardsOffer(): PromotionCardsOffer {
  return {
    id: crypto.randomUUID(),
    type: "promotion_cards",
    title: "",
    description: "",
    enabled: true,
    cards: [
      {
        title: "",
        description: "",
      },
    ],
  };
}
