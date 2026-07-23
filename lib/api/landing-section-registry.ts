import "server-only";

import {
  upsertLandingBranding,
  upsertLandingCta,
  upsertLandingHero,
  upsertLandingPortfolioAbout,
  upsertLandingStory,
  replaceLandingBenefits,
  replaceLandingFaq,
  replaceLandingGallery,
  replaceLandingNav,
  replaceLandingOffers,
  replaceLandingServiceMenu,
  replaceLandingServices,
  replaceLandingSpaces,
  replaceLandingStats,
  replaceLandingTeam,
  replaceLandingTestimonials,
  replaceLandingWorkflow,
  replaceLandingWorkHistory,
} from "@/data/landing-sections";
import { DEFAULT_COPYRIGHT_SUFFIX } from "@/lib/dashboard-data";
import { parseSocialLinks } from "@/lib/footer-content";
import type { LandingPageMeta } from "@/data/landing-pages";
import type { OfferCardRow } from "@/lib/domain/dtos";
import { portfolioAboutPageSchema } from "@/lib/schemas/portfolio-about";
import { portfolioGallerySchema } from "@/lib/schemas/portfolio-project";
import { normalizeEnabledPages } from "@/lib/site-pages";

function parseExpiresAt(value: unknown) {
  if (value instanceof Date) return value;
  if (typeof value !== "string" || !value.trim()) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
}

function parseOfferCards(value: unknown): OfferCardRow[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((card) => {
    if (!card || typeof card !== "object") return [];
    const item = card as Record<string, unknown>;
    const expiresAt = parseExpiresAt(item.expiresAt);
    return [
      {
        title: typeof item.title === "string" ? item.title : "",
        description: typeof item.description === "string" ? item.description : "",
        badge: typeof item.badge === "string" ? item.badge : undefined,
        ctaText: typeof item.ctaText === "string" ? item.ctaText : undefined,
        expiresAt: expiresAt ? expiresAt.toISOString() : undefined,
      },
    ];
  });
}

function toMultilineList(value: unknown) {
  if (!Array.isArray(value)) return "";
  return value
    .flatMap((item) => {
      if (typeof item !== "string") return [];
      const trimmed = item.trim();
      return trimmed ? [trimmed] : [];
    })
    .join("\n");
}

function toCommaList(value: unknown) {
  if (!Array.isArray(value)) return "";
  return value
    .flatMap((item) => {
      if (typeof item !== "string") return [];
      const trimmed = item.trim();
      return trimmed ? [trimmed] : [];
    })
    .join(",");
}

type SectionHandler = {
  parse: (body: Record<string, unknown>, meta: LandingPageMeta) => unknown;
  persist: (landingId: string, parsed: unknown) => Promise<void>;
};

export const SECTION_REGISTRY: Record<string, SectionHandler> = {
  hero: {
    parse: (body, meta) => ({
      eyebrow:
        typeof body.eyebrow === "string"
          ? body.eyebrow
          : (meta.hero?.eyebrow ?? ""),
      title:
        typeof body.title === "string" ? body.title : (meta.hero?.title ?? ""),
      subtitle:
        typeof body.subtitle === "string"
          ? body.subtitle
          : (meta.hero?.subtitle ?? ""),
      description:
        typeof body.description === "string"
          ? body.description
          : (meta.hero?.description ?? ""),
      image:
        typeof body.image === "string" ? body.image : (meta.hero?.image ?? ""),
      houseImage:
        typeof body.houseImage === "string"
          ? body.houseImage
          : (meta.hero?.houseImage ?? ""),
      fanImages: Array.isArray(body.fanImages)
        ? body.fanImages.filter(
            (item: unknown): item is string => typeof item === "string"
          )
        : (meta.hero?.fanImages ?? []),
      ctaLabel:
        typeof body.ctaLabel === "string"
          ? body.ctaLabel
          : (meta.hero?.ctaLabel ?? ""),
    }),
    persist: (landingId, parsed) =>
      upsertLandingHero(
        landingId,
        parsed as Parameters<typeof upsertLandingHero>[1]
      ),
  },
  branding: {
    parse: (body) => {
      const sectionHeadings =
        body.sectionHeadings &&
        typeof body.sectionHeadings === "object" &&
        !Array.isArray(body.sectionHeadings)
          ? (body.sectionHeadings as Record<string, { title: string; subtitle: string }>)
          : undefined;

      const hiddenSections = Array.isArray(body.hiddenSections)
        ? (body.hiddenSections as string[])
        : undefined;
      const sectionOrder = Array.isArray(body.sectionOrder)
        ? (body.sectionOrder as string[])
        : undefined;
      const enabledPages = normalizeEnabledPages(body.enabledPages);

      const brandLogoType =
        body.brandLogoType === "text" || body.brandLogoType === "image"
          ? body.brandLogoType
          : undefined;

      const brandLogoImage =
        typeof body.brandLogoImage === "string" ? body.brandLogoImage : undefined;

      return {
        brand: typeof body.brand === "string" ? body.brand : "",
        brandLogoType,
        brandLogoImage,
        sectionHeadings,
        hiddenSections,
        sectionOrder,
        enabledPages,
      };
    },
    persist: (landingId, parsed) =>
      upsertLandingBranding(
        landingId,
        parsed as Parameters<typeof upsertLandingBranding>[1]
      ),
  },
  story: {
    parse: (body) => ({
      statement: typeof body.statement === "string" ? body.statement : "",
    }),
    persist: (landingId, parsed) =>
      upsertLandingStory(
        landingId,
        parsed as Parameters<typeof upsertLandingStory>[1]
      ),
  },
  "portfolio-about": {
    parse: (body) => portfolioAboutPageSchema.parse(body),
    persist: (landingId, parsed) =>
      upsertLandingPortfolioAbout(
        landingId,
        parsed as Parameters<typeof upsertLandingPortfolioAbout>[1],
      ),
  },
  cta: {
    parse: (body) => ({
      phone: typeof body.phone === "string" ? body.phone : "",
      email: typeof body.email === "string" ? body.email : "",
      address: typeof body.address === "string" ? body.address : "",
      ctaLabel: typeof body.ctaLabel === "string" ? body.ctaLabel : "",
      copyrightSuffix:
        typeof body.copyrightSuffix === "string" && body.copyrightSuffix.trim()
          ? body.copyrightSuffix
          : DEFAULT_COPYRIGHT_SUFFIX,
      copyrightExtra: typeof body.copyrightExtra === "string" ? body.copyrightExtra : "",
      socialLinks: parseSocialLinks(body.socialLinks),
      whatsappEnabled: typeof body.whatsappEnabled === "boolean" ? body.whatsappEnabled : false,
    }),
    persist: (landingId, parsed) =>
      upsertLandingCta(
        landingId,
        parsed as Parameters<typeof upsertLandingCta>[1]
      ),
  },
  stats: {
    parse: (body) => {
      const items = Array.isArray(body.items) ? body.items : [];
      return items.map((item: Record<string, unknown>) => ({
        value: typeof item.value === "string" ? item.value : "",
        label: typeof item.label === "string" ? item.label : "",
        countTo: typeof item.countTo === "number" ? item.countTo : null,
        suffix: typeof item.suffix === "string" ? item.suffix : "",
      }));
    },
    persist: (landingId, parsed) =>
      replaceLandingStats(
        landingId,
        parsed as Parameters<typeof replaceLandingStats>[1]
      ),
  },
  nav: {
    parse: (body) => {
      const items = Array.isArray(body.items) ? body.items : [];
      return items.map((item: Record<string, unknown>) => ({
        label: typeof item.label === "string" ? item.label : "",
        href: typeof item.href === "string" ? item.href : "",
      }));
    },
    persist: (landingId, parsed) =>
      replaceLandingNav(
        landingId,
        parsed as Parameters<typeof replaceLandingNav>[1]
      ),
  },
  benefits: {
    parse: (body) => {
      const items = Array.isArray(body.items) ? body.items : [];
      return items.map((item: Record<string, unknown>) => ({
        title: typeof item.title === "string" ? item.title : "",
        description: typeof item.description === "string" ? item.description : "",
        icon: typeof item.icon === "string" ? item.icon : "",
        image: typeof item.image === "string" ? item.image : "",
      }));
    },
    persist: (landingId, parsed) =>
      replaceLandingBenefits(
        landingId,
        parsed as Parameters<typeof replaceLandingBenefits>[1]
      ),
  },
  faq: {
    parse: (body) => {
      const items = Array.isArray(body.items) ? body.items : [];
      return items.map((item: Record<string, unknown>) => ({
        question: typeof item.question === "string" ? item.question : "",
        answer: typeof item.answer === "string" ? item.answer : "",
      }));
    },
    persist: (landingId, parsed) =>
      replaceLandingFaq(
        landingId,
        parsed as Parameters<typeof replaceLandingFaq>[1]
      ),
  },
  gallery: {
    parse: (body) => {
      const items = Array.isArray(body.items) ? body.items : [];
      return portfolioGallerySchema.parse(items).map((item) => ({
        image: item.image,
        video: item.video,
        title: item.title,
        description: item.description,
        tags: item.tags.join(", "),
        link: item.link,
        linkType: item.linkType,
        projectSlug: item.projectSlug,
        projectBody: item.projectBody,
        projectGallery: item.projectGallery,
      }));
    },
    persist: (landingId, parsed) =>
      replaceLandingGallery(
        landingId,
        parsed as Parameters<typeof replaceLandingGallery>[1]
      ),
  },
  spaces: {
    parse: (body) => {
      const items = Array.isArray(body.items) ? body.items : [];
      return items.map((item: Record<string, unknown>) => ({
        name: typeof item.name === "string" ? item.name : "",
        description: typeof item.description === "string" ? item.description : "",
        image: typeof item.image === "string" ? item.image : "",
      }));
    },
    persist: (landingId, parsed) =>
      replaceLandingSpaces(
        landingId,
        parsed as Parameters<typeof replaceLandingSpaces>[1]
      ),
  },
  services: {
    parse: (body) => {
      const items = Array.isArray(body.items) ? body.items : [];
      return items.map((item: Record<string, unknown>) => ({
        title: typeof item.title === "string" ? item.title : "",
        subtitle: typeof item.subtitle === "string" ? item.subtitle : "",
        label: typeof item.label === "string" ? item.label : "",
        image: typeof item.image === "string" ? item.image : "",
      }));
    },
    persist: (landingId, parsed) =>
      replaceLandingServices(
        landingId,
        parsed as Parameters<typeof replaceLandingServices>[1]
      ),
  },
  offers: {
    parse: (body) => {
      const items = Array.isArray(body.items) ? body.items : [];
      return items.map((item: Record<string, unknown>) => {
        const type = item.type === "promotion_cards" ? "promotion_cards" : "hero_banner";
        return {
          type,
          title: typeof item.title === "string" ? item.title : "",
          description: typeof item.description === "string" ? item.description : "",
          badge: typeof item.badge === "string" ? item.badge : "",
          ctaText: typeof item.ctaText === "string" ? item.ctaText : "",
          expiresAt: parseExpiresAt(item.expiresAt),
          enabled: typeof item.enabled === "boolean" ? item.enabled : true,
          cards: type === "promotion_cards" ? parseOfferCards(item.cards) : [],
          image: typeof item.image === "string" ? item.image : "",
          features: Array.isArray(item.features)
            ? item.features
                .flatMap((feature) => {
                  if (typeof feature !== "string") return [];
                  const trimmed = feature.trim();
                  return trimmed ? [trimmed] : [];
                })
            : [],
        };
      });
    },
    persist: (landingId, parsed) =>
      replaceLandingOffers(
        landingId,
        parsed as Parameters<typeof replaceLandingOffers>[1]
      ),
  },
  workflow: {
    parse: (body) => {
      const items = Array.isArray(body.items) ? body.items : [];
      return items.map((item: Record<string, unknown>) => ({
        number: typeof item.number === "string" ? item.number : "",
        title: typeof item.title === "string" ? item.title : "",
        description: typeof item.description === "string" ? item.description : "",
      }));
    },
    persist: (landingId, parsed) =>
      replaceLandingWorkflow(
        landingId,
        parsed as Parameters<typeof replaceLandingWorkflow>[1]
      ),
  },
  testimonials: {
    parse: (body) => {
      const items = Array.isArray(body.items) ? body.items : [];
      return items.map((item: Record<string, unknown>) => ({
        author: typeof item.author === "string" ? item.author : "",
        date: typeof item.date === "string" ? item.date : "",
        rating: typeof item.rating === "number" ? item.rating : 5,
        comment: typeof item.comment === "string" ? item.comment : "",
        verified: typeof item.verified === "boolean" ? item.verified : false,
      }));
    },
    persist: (landingId, parsed) =>
      replaceLandingTestimonials(
        landingId,
        parsed as Parameters<typeof replaceLandingTestimonials>[1]
      ),
  },
  team: {
    parse: (body) => {
      const items = Array.isArray(body.items) ? body.items : [];
      return items.map((item: Record<string, unknown>) => ({
        name: typeof item.name === "string" ? item.name : "",
        role: typeof item.role === "string" ? item.role : "",
        bio: typeof item.bio === "string" ? item.bio : "",
        image: typeof item.image === "string" ? item.image : "",
      }));
    },
    persist: (landingId, parsed) =>
      replaceLandingTeam(
        landingId,
        parsed as Parameters<typeof replaceLandingTeam>[1]
      ),
  },
  "service-menu": {
    parse: (body) => {
      const items = Array.isArray(body.items) ? body.items : [];
      return items.map((item: Record<string, unknown>) => ({
        category: typeof item.category === "string" ? item.category : "",
        name: typeof item.name === "string" ? item.name : "",
        description: typeof item.description === "string" ? item.description : "",
        price: typeof item.price === "string" ? item.price : "",
        duration: typeof item.duration === "string" ? item.duration : "",
        image: typeof item.image === "string" ? item.image : "",
      }));
    },
    persist: (landingId, parsed) =>
      replaceLandingServiceMenu(
        landingId,
        parsed as Parameters<typeof replaceLandingServiceMenu>[1]
      ),
  },
  "work-history": {
    parse: (body) => {
      const items = Array.isArray(body.items) ? body.items : [];
      return items.map((item: Record<string, unknown>) => ({
        dateRange: typeof item.dateRange === "string" ? item.dateRange : "",
        location: typeof item.location === "string" ? item.location : "",
        company: typeof item.company === "string" ? item.company : "",
        title: typeof item.title === "string" ? item.title : "",
        summary: typeof item.summary === "string" ? item.summary : "",
        highlights: toMultilineList(item.highlights),
        technologies: toCommaList(item.technologies),
      }));
    },
    persist: (landingId, parsed) =>
      replaceLandingWorkHistory(
        landingId,
        parsed as Parameters<typeof replaceLandingWorkHistory>[1]
      ),
  },
};
