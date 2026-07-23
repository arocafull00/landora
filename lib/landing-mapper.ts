import type { LandingWithSections } from "@/data/landing-pages";
import type { Landing, LandingContent, HeroBannerOffer, PromotionCardsOffer } from "@/lib/dashboard-data";
import { resolveGalleryItems } from "@/lib/gallery-content";
import { parseSocialLinks } from "@/lib/footer-content";
import { shortDateTimeFormatter } from "@/lib/intl-formatters";
import { remapLegacyTemplateAssetUrl } from "@/lib/velar-assets";
import type { User } from "@/lib/domain/dtos";
import { resolveSectionSelections } from "@/lib/section-selections";
import { resolveLandingAppearance } from "@/lib/site-appearance";
import { normalizeEnabledPages } from "@/lib/site-pages";

function mapImage(url: string | null | undefined) {
  if (!url) return "";
  return remapLegacyTemplateAssetUrl(url);
}

function parseMultilineList(value: string) {
  return value.split("\n").flatMap((line) => {
    const trimmed = line.trim();
    return trimmed ? [trimmed] : [];
  });
}

function parseCommaList(value: string) {
  return value.split(",").flatMap((item) => {
    const trimmed = item.trim();
    return trimmed ? [trimmed] : [];
  });
}

function uniqueBySortOrder<T extends { sortOrder: number }>(items: T[]) {
  const seen = new Set<number>();
  return items.filter((item) => {
    if (seen.has(item.sortOrder)) return false;
    seen.add(item.sortOrder);
    return true;
  });
}

export function toLandingContent(row: LandingWithSections): LandingContent {
  const sectionHeadings = (row.branding?.sectionHeadings ?? {}) as LandingContent["sectionHeadings"];
  const hiddenSections = (row.branding?.hiddenSections ?? []) as string[];
  const sectionOrder = (row.branding?.sectionOrder ?? []) as string[];
  const portfolioAbout = row.portfolioAbout
    ? {
        title: row.portfolioAbout.title,
        intro: row.portfolioAbout.intro,
        image: mapImage(row.portfolioAbout.image),
        storyTitle: row.portfolioAbout.storyTitle,
        storyBody: row.portfolioAbout.storyBody,
        storyImage: mapImage(row.portfolioAbout.storyImage),
      }
    : row.template === "portfolio"
      ? {
          title: row.hero?.title ?? "",
          intro: row.story?.statement ?? "",
          image: mapImage(row.hero?.image || row.hero?.houseImage),
          storyTitle: "Mi historia",
          storyBody: "",
          storyImage: "",
        }
      : undefined;

  return {
    appearance: resolveLandingAppearance(row.template, {
      paletteId: row.branding?.paletteId,
      typographyId: row.branding?.typographyId,
    }),
    brand: row.branding?.brand ?? "",
    brandLogoType: row.branding?.brandLogoType === "image" ? "image" : "text",
    brandLogoImage: mapImage(row.branding?.brandLogoImage),
    sectionHeadings,
    hiddenSections,
    sectionOrder,
    enabledPages: normalizeEnabledPages(row.branding?.enabledPages),
    hero: {
      eyebrow: row.hero?.eyebrow ?? "",
      title: row.hero?.title ?? "",
      subtitle: row.hero?.subtitle ?? "",
      description: row.hero?.description ?? "",
      image: mapImage(row.hero?.image),
      houseImage: mapImage(row.hero?.houseImage),
      fanImages: (row.hero?.fanImages ?? []).map((image) => mapImage(image)),
      ctaLabel: row.hero?.ctaLabel ?? "",
    },
    story: {
      statement: row.story?.statement ?? "",
    },
    stats: (row.stats ?? []).map((s) => ({
      id: s.id,
      value: s.value,
      label: s.label,
      countTo: s.countTo ?? undefined,
      suffix: s.suffix,
    })),
    gallery: resolveGalleryItems(
      row.template,
      uniqueBySortOrder(row.gallery ?? []).map((g) => ({
        id: g.id,
        image: g.image ? mapImage(g.image) : undefined,
        video: g.video || undefined,
        title: g.title || undefined,
        description: g.description || undefined,
        tags: parseCommaList(g.tags),
        link: g.link || undefined,
        linkType:
          g.linkType === "internal" || g.linkType === "external"
            ? g.linkType
            : "none",
        projectSlug: g.projectSlug || undefined,
        projectBody: g.projectBody || undefined,
        projectGallery: (g.projectGallery ?? []).map(mapImage),
      })),
    ),
    nav: uniqueBySortOrder(row.nav ?? []).map((n) => ({
      id: n.id,
      label: n.label,
      href: n.href,
    })),
    spaces: (row.spaces ?? []).map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description,
      image: mapImage(s.image),
    })),
    services: (row.services ?? []).map((s) => ({
      id: s.id,
      title: s.title,
      subtitle: s.subtitle,
      label: s.label,
      image: mapImage(s.image),
    })),
    workflow: (row.workflow ?? []).map((w) => ({
      id: w.id,
      number: w.number,
      title: w.title,
      description: w.description,
    })),
    testimonials: (row.testimonials ?? []).map((t) => ({
      id: t.id,
      author: t.author,
      date: t.date,
      rating: t.rating,
      comment: t.comment,
      verified: t.verified,
    })),
    contact: {
      phone: row.cta?.phone ?? "",
      email: row.cta?.email ?? "",
      address: row.cta?.address ?? "",
      ctaLabel: row.cta?.ctaLabel ?? "",
      copyrightSuffix: row.cta?.copyrightSuffix ?? "",
      copyrightExtra: row.cta?.copyrightExtra ?? "",
      socialLinks: parseSocialLinks(row.cta?.socialLinks),
      whatsappEnabled: row.cta?.whatsappEnabled ?? false,
    },
    about: row.story ? { statement: row.story.statement } : undefined,
    aboutPage: portfolioAbout,
    team: (row.team ?? []).map((t) => ({
      id: t.id,
      name: t.name,
      role: t.role,
      bio: t.bio,
      image: mapImage(t.image),
    })),
    serviceMenu: (row.serviceMenu ?? []).map((s) => ({
      id: s.id,
      category: s.category,
      name: s.name,
      description: s.description,
      price: s.price,
      duration: s.duration || undefined,
      image: s.image ? mapImage(s.image) : undefined,
    })),
    benefits: (row.benefits ?? []).map((b) => ({
      id: b.id,
      title: b.title,
      description: b.description,
      icon: b.icon,
      image: b.image ? mapImage(b.image) : undefined,
    })),
    faq: (row.faq ?? []).map((f) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
    })),
    workHistory: (row.workHistory ?? []).map((item) => ({
      id: item.id,
      dateRange: item.dateRange,
      location: item.location,
      company: item.company,
      title: item.title,
      summary: item.summary,
      highlights: parseMultilineList(item.highlights),
      technologies: parseCommaList(item.technologies),
    })),
    offers: (row.offers ?? []).map((o) => {
      const base = {
        id: o.id,
        type: o.type,
        title: o.title,
        description: o.description,
        badge: o.badge || undefined,
        ctaText: o.ctaText || undefined,
        expiresAt: o.expiresAt ?? undefined,
        enabled: o.enabled,
      };

      if (o.type === "promotion_cards") {
        return {
          ...base,
          type: "promotion_cards" as const,
          cards: (o.cards ?? []).map((card) => ({
            title: card.title,
            description: card.description,
            badge: card.badge || undefined,
            ctaText: card.ctaText || undefined,
            expiresAt: card.expiresAt ? new Date(card.expiresAt) : undefined,
          })),
        } satisfies PromotionCardsOffer;
      }

      return {
        ...base,
        type: "hero_banner" as const,
        image: o.image || undefined,
        features: (o.features ?? []).filter((feature) => feature.trim()).length > 0
          ? o.features.filter((feature) => feature.trim())
          : undefined,
      } satisfies HeroBannerOffer;
    }),
  };
}

export function toLandingView(row: LandingWithSections, user: User | undefined): Landing {
  const updatedAt = row.updatedAt
    ? shortDateTimeFormatter.format(new Date(row.updatedAt))
    : "—";

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    status: row.published ? "Published" : "Draft",
    edited: updatedAt,
    seoTitle: row.seo?.title || row.name,
    seoDescription: row.seo?.description ?? "",
    seoFavicon: row.seo?.favicon ?? "",
    owner: user?.name ?? "—",
    template: row.template,
    sectionSelections: resolveSectionSelections(
      row.template,
      row.sectionSelections ?? [],
    ),
    customDomain: row.customDomain ?? null,
    content: toLandingContent(row),
  };
}
