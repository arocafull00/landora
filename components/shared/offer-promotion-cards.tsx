"use client";

import type { OfferCard, PromotionCardsOffer } from "@/lib/dashboard-data";
import { isOfferActive } from "@/lib/offer-utils";

function getWhatsAppLink(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

type OfferPromotionCardsProps = {
  offer: PromotionCardsOffer;
  phone: string;
};

function PromotionCard({ card, phone }: { card: OfferCard; phone: string }) {
  if (!isOfferActive({ enabled: true, expiresAt: card.expiresAt })) return null;

  const ctaLabel = card.ctaText ?? "Ver oferta";
  const href = phone
    ? getWhatsAppLink(phone, `Hola, me interesa: ${card.title}`)
    : undefined;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-outline-variant bg-surface px-5 py-6">
      {card.badge ? (
        <span className="mb-3 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-label-sm font-medium text-primary">
          {card.badge}
        </span>
      ) : null}
      <h3 className="text-balance text-xl font-semibold text-on-surface">{card.title}</h3>
      {card.description ? (
        <p className="mt-2 flex-1 text-pretty text-body-md text-on-surface-variant">{card.description}</p>
      ) : null}
      {href ? (
        <a
          className="mt-5 inline-flex w-fit items-center justify-center rounded-full border border-primary px-4 py-2 text-body-sm font-semibold text-primary transition-colors hover:bg-primary/5"
          href={href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {ctaLabel}
        </a>
      ) : null}
    </article>
  );
}

export function OfferPromotionCards({ offer, phone }: OfferPromotionCardsProps) {
  const activeCards = offer.cards.filter((card) =>
    isOfferActive({ enabled: true, expiresAt: card.expiresAt }),
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
          {activeCards.map((card, index) => (
            <PromotionCard card={card} key={`${offer.id}-card-${index}`} phone={phone} />
          ))}
        </div>
      </div>
    </section>
  );
}
