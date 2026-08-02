import { OfferHeroBanner } from "@/components/shared/offer-hero-banner";
import { OfferPromotionCards } from "@/components/shared/offer-promotion-cards";
import type { LandingContent } from "@/lib/dashboard-data";
import { isOfferActive } from "@/lib/offer-utils";

type ActiveOffersRendererProps = {
  content: LandingContent;
  renderedAt: Date;
};

export function ActiveOffersRenderer({ content, renderedAt }: ActiveOffersRendererProps) {
  const offers = content.offers ?? [];
  const activeOffers = offers.filter((offer) => isOfferActive(offer, renderedAt));

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
              renderedAt={renderedAt}
          />
        );
      })}
    </>
  );
}
