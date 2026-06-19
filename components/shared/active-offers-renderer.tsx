"use client";

import { OfferHeroBanner } from "@/components/shared/offer-hero-banner";
import { OfferPromotionCards } from "@/components/shared/offer-promotion-cards";
import type { LandingContent } from "@/lib/dashboard-data";
import { isOfferActive } from "@/lib/offer-utils";

type ActiveOffersRendererProps = {
  content: LandingContent;
};

export function ActiveOffersRenderer({ content }: ActiveOffersRendererProps) {
  const offers = content.offers ?? [];
  const activeOffers = offers.filter((offer) => isOfferActive(offer));

  if (activeOffers.length === 0) return null;

  return (
    <>
      {activeOffers.map((offer) => {
        if (offer.type === "hero_banner") {
          return (
            <OfferHeroBanner
              key={offer.id}
              offer={offer}
              phone={content.contact.phone}
            />
          );
        }

        return (
          <OfferPromotionCards
            key={offer.id}
            offer={offer}
            phone={content.contact.phone}
          />
        );
      })}
    </>
  );
}
