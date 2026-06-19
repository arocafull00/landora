"use client";

import type { HeroBannerOffer } from "@/lib/dashboard-data";

function getWhatsAppLink(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

type OfferHeroBannerProps = {
  offer: HeroBannerOffer;
  phone: string;
};

export function OfferHeroBanner({ offer, phone }: OfferHeroBannerProps) {
  const ctaLabel = offer.ctaText ?? "Ver oferta";
  const href = phone
    ? getWhatsAppLink(phone, `Hola, me interesa: ${offer.title}`)
    : undefined;

  return (
    <section className="px-6 py-12 md:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl rounded-2xl border border-outline-variant bg-surface-container-low px-6 py-8 md:px-10 md:py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-3">
            {offer.badge ? (
              <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-label-sm font-medium text-primary">
                {offer.badge}
              </span>
            ) : null}
            <h2 className="text-balance text-3xl font-bold text-on-surface md:text-4xl">{offer.title}</h2>
            {offer.description ? (
              <p className="text-pretty text-body-lg text-on-surface-variant">{offer.description}</p>
            ) : null}
          </div>
          {href ? (
            <a
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-6 py-3 text-body-md font-semibold text-on-primary transition-colors hover:bg-primary/90"
              href={href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {ctaLabel}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
