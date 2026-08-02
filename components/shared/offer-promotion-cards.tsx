import { OfferPromotionCard } from "@/components/shared/offer-promotion-card";
import type { PromotionCardsOffer } from "@/lib/dashboard-data";
import { isOfferActive } from "@/lib/offer-utils";

type OfferPromotionCardsProps = {
  offer: PromotionCardsOffer;
  phone: string;
  renderedAt: Date;
};

export function OfferPromotionCards({ offer, phone, renderedAt }: OfferPromotionCardsProps) {
  const activeCards = offer.cards.filter((card) =>
    isOfferActive({ enabled: true, expiresAt: card.expiresAt }, renderedAt),
  );

  if (activeCards.length === 0) return null;

  return (
    <section className="px-6 py-12 md:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 max-w-2xl space-y-3">
          {offer.badge ? (
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-label-sm font-medium text-primary">
              {offer.badge}
            </span>
          ) : null}
          {offer.title ? (
            <h2 className="text-balance text-3xl font-bold text-on-surface md:text-4xl">{offer.title}</h2>
          ) : null}
          {offer.description ? (
            <p className="text-pretty text-body-lg text-on-surface-variant">{offer.description}</p>
          ) : null}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeCards.map((card) => (
            <OfferPromotionCard
              card={card}
              key={`${offer.id}-card-${card.title}-${card.description}`}
              phone={phone}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
