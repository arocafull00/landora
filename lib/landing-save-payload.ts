import type {
  GalleryVariantId,
  HeroVariantId,
  Landing,
  LandingAppearance,
  LandingContent,
  TemplateId,
} from "@/lib/dashboard-data";
import {
  syncBlogNavHrefs,
  syncPortfolioAboutNavHrefs,
  syncRistoranteCartaNavHrefs,
} from "@/lib/template-sections";

export const LANDING_SECTION_KEYS = [
  "hero",
  "cta",
  "branding",
  "stats",
  "testimonials",
  "nav",
  "story",
  "portfolio-about",
  "spaces",
  "services",
  "workflow",
  "gallery",
  "team",
  "service-menu",
  "benefits",
  "faq",
  "work-history",
  "offers",
] as const;

export type LandingSectionKey = (typeof LANDING_SECTION_KEYS)[number];

export type LandingMetaPayload = {
  name: string;
  slug: string;
};

export type LandingSeoPayload = {
  title: string;
  description: string;
  favicon: string;
  socialImage: string;
};

export type LandingSectionPayloads = Partial<
  Record<LandingSectionKey, Record<string, unknown>>
>;

export type LandingSaveChanges = {
  meta?: LandingMetaPayload;
  seo?: LandingSeoPayload;
  appearance?: LandingAppearance;
  galleryVariant?: GalleryVariantId;
  heroVariant?: HeroVariantId;
  sections?: LandingSectionPayloads;
};

export type LandingChangedScopes = {
  meta?: true;
  seo?: true;
  appearance?: true;
  galleryVariant?: true;
  heroVariant?: true;
  sections?: LandingSectionKey[];
};

export type LandingPublicationSnapshot = {
  meta: LandingMetaPayload;
  seo: LandingSeoPayload;
  content: LandingContent;
  appearance: LandingAppearance;
  galleryVariant: GalleryVariantId;
  heroVariant: HeroVariantId;
};

function areEqual(left: unknown, right: unknown) {
  return JSON.stringify(left) === JSON.stringify(right);
}

export function getLandingSectionPayloads(
  content: LandingContent,
  template: TemplateId,
): LandingSectionPayloads {
  const navItems = syncBlogNavHrefs(
    template === "portfolio"
      ? syncPortfolioAboutNavHrefs(content.nav)
      : template === "ristorante"
        ? syncRistoranteCartaNavHrefs(content.nav)
        : content.nav,
  );

  return {
    hero: { ...content.hero },
    cta: { ...content.contact },
    branding: {
      brand: content.brand,
      brandLogoType: content.brandLogoType ?? "text",
      brandLogoImage: content.brandLogoImage ?? "",
      sectionHeadings: content.sectionHeadings ?? {},
      hiddenSections: content.hiddenSections ?? [],
      sectionOrder: content.sectionOrder ?? [],
      enabledPages: content.enabledPages,
    },
    stats: { items: content.stats },
    testimonials: { items: content.testimonials },
    nav: { items: navItems },
    ...(content.story ? { story: { ...content.story } } : {}),
    ...(content.aboutPage
      ? { "portfolio-about": { ...content.aboutPage } }
      : {}),
    ...(content.spaces ? { spaces: { items: content.spaces } } : {}),
    ...(content.services ? { services: { items: content.services } } : {}),
    ...(content.workflow ? { workflow: { items: content.workflow } } : {}),
    ...(content.gallery ? { gallery: { items: content.gallery } } : {}),
    ...(content.team ? { team: { items: content.team } } : {}),
    ...(content.serviceMenu
      ? { "service-menu": { items: content.serviceMenu } }
      : {}),
    ...(content.benefits ? { benefits: { items: content.benefits } } : {}),
    ...(content.faq ? { faq: { items: content.faq } } : {}),
    ...(content.workHistory
      ? { "work-history": { items: content.workHistory } }
      : {}),
    ...(content.offers ? { offers: { items: content.offers } } : {}),
  };
}

export function getLandingPublicationSnapshot(
  landing: Landing,
): LandingPublicationSnapshot {
  return {
    meta: {
      name: landing.name,
      slug: landing.slug,
    },
    seo: {
      title: landing.seoTitle,
      description: landing.seoDescription,
      favicon: landing.seoFavicon,
      socialImage: landing.seoSocialImage,
    },
    content: landing.content,
    appearance: landing.content.appearance,
    galleryVariant: landing.sectionSelections.gallery,
    heroVariant: landing.sectionSelections.hero,
  };
}

export function getLandingSaveChanges(
  landing: Landing,
  persistedLanding: Landing,
): LandingSaveChanges {
  const current = getLandingPublicationSnapshot(landing);
  const persisted = getLandingPublicationSnapshot(persistedLanding);
  const currentSections = getLandingSectionPayloads(
    current.content,
    landing.template,
  );
  const persistedSections = getLandingSectionPayloads(
    persisted.content,
    persistedLanding.template,
  );
  const sections = Object.fromEntries(
    Object.entries(currentSections).filter(([section, payload]) => {
      return !areEqual(
        payload,
        persistedSections[section as LandingSectionKey],
      );
    }),
  ) as LandingSectionPayloads;

  return {
    ...(!areEqual(current.meta, persisted.meta)
      ? { meta: current.meta }
      : {}),
    ...(!areEqual(current.seo, persisted.seo) ? { seo: current.seo } : {}),
    ...(!areEqual(current.appearance, persisted.appearance)
      ? { appearance: current.appearance }
      : {}),
    ...(current.heroVariant !== persisted.heroVariant
      ? { heroVariant: current.heroVariant }
      : {}),
    ...(current.galleryVariant !== persisted.galleryVariant
      ? { galleryVariant: current.galleryVariant }
      : {}),
    ...(Object.keys(sections).length > 0 ? { sections } : {}),
  };
}

export function getLandingChangedScopes(
  changes: LandingSaveChanges,
): LandingChangedScopes {
  const sectionKeys = Object.keys(
    changes.sections ?? {},
  ) as LandingSectionKey[];

  return {
    ...(changes.meta ? { meta: true as const } : {}),
    ...(changes.seo ? { seo: true as const } : {}),
    ...(changes.appearance ? { appearance: true as const } : {}),
    ...(changes.heroVariant ? { heroVariant: true as const } : {}),
    ...(changes.galleryVariant ? { galleryVariant: true as const } : {}),
    ...(sectionKeys.length > 0 ? { sections: sectionKeys } : {}),
  };
}

export function hasLandingSaveChanges(changes: LandingSaveChanges) {
  return (
    Boolean(changes.meta) ||
    Boolean(changes.seo) ||
    Boolean(changes.appearance) ||
    Boolean(changes.heroVariant) ||
    Boolean(changes.galleryVariant) ||
    Object.keys(changes.sections ?? {}).length > 0
  );
}
