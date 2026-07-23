import type {
  HeroBannerOffer,
  LandingContent,
  PromotionCardsOffer,
} from "@/lib/dashboard-data";
import {
  publishedLandingContentSchema,
  publishedLandingSectionSelectionsSchema,
  publishedLandingSeoSchema,
} from "@/lib/schemas/landing-publication";

export function normalizePublishedSlug(slug: string) {
  return slug.replace(/^\/+|\/+$/g, "");
}

export function getNextLandingVersion(latestVersion: number | null) {
  return (latestVersion ?? 0) + 1;
}

function parseOptionalDate(value: unknown) {
  if (value instanceof Date) return value;
  if (typeof value !== "string") return undefined;

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export function parsePublishedLandingContent(value: unknown): LandingContent {
  const content = publishedLandingContentSchema.parse(value) as LandingContent;

  return {
    ...content,
    offers: content.offers?.map((offer) => {
      const expiresAt = parseOptionalDate(offer.expiresAt);

      if (offer.type === "promotion_cards") {
        return {
          ...offer,
          expiresAt,
          cards: offer.cards.map((card) => ({
            ...card,
            expiresAt: parseOptionalDate(card.expiresAt),
          })),
        } satisfies PromotionCardsOffer;
      }

      return {
        ...offer,
        expiresAt,
      } satisfies HeroBannerOffer;
    }),
  };
}

export function parsePublishedLandingSeo(value: unknown) {
  return publishedLandingSeoSchema.parse(value);
}

export function parsePublishedLandingSectionSelections(value: unknown) {
  return publishedLandingSectionSelectionsSchema.parse(value);
}
