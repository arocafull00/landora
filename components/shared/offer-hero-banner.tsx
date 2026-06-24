"use client";

import { ArrowRight, Flame } from "lucide-react";
import { OfferHeroBannerFeature } from "@/components/shared/offer-hero-banner-feature";
import { AssetImage } from "@/components/ui/asset-image";
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
  const features = (offer.features ?? []).filter(Boolean).slice(0, 3);
  const hasRightColumn = Boolean(offer.image) || Boolean(href);

  return (
    <section className="px-6 py-12 md:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl rounded-2xl border border-outline-variant bg-surface-container-low px-6 py-8 md:px-10 md:py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 space-y-4">
            {offer.badge ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-label-sm font-medium text-primary">
                <Flame className="size-3.5" />
                {offer.badge}
              </span>
            ) : null}
            <h2 className="text-balance text-3xl font-bold text-on-surface md:text-4xl">{offer.title}</h2>
            {offer.description ? (
              <p className="text-pretty text-body-lg text-on-surface-variant">{offer.description}</p>
            ) : null}
            {features.length > 0 ? (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
                {features.map((feature, index) => (
                  <OfferHeroBannerFeature
                    key={`${offer.id}-feature-${feature}`}
                    label={feature}
                    showDivider={index > 0}
                  />
                ))}
              </div>
            ) : null}
          </div>
          {hasRightColumn ? (
            <div className="flex shrink-0 flex-col items-center gap-5 md:min-w-[200px]">
              {offer.image ? (
                <div className="relative size-36 overflow-hidden rounded-full bg-primary/5 md:size-40">
                  <AssetImage
                    alt={offer.title}
                    className="object-contain p-4"
                    fill
                    sizes="160px"
                    src={offer.image}
                  />
                </div>
              ) : null}
              {href ? (
                <a
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-body-md font-semibold text-on-primary transition-colors hover:bg-primary/90"
                  href={href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {ctaLabel}
                  <ArrowRight className="size-4" />
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
