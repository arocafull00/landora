import "server-only";

import { cache } from "react";
import { and, asc, eq, or } from "drizzle-orm";
import { db } from "@/db";
import {
  landingPages,
  landingSectionSelections,
  landingBenefits,
  landingFaq,
  landingGallery,
  landingNav,
  landingOffers,
  landingServices,
  landingSpaces,
  landingStats,
  landingTestimonials,
  landingWorkflow,
  landingTeam,
  landingServiceMenu,
  landingWorkHistory,
} from "@/db/schema";
import type {
  LandingPage,
  LandingHero,
  LandingBranding,
  LandingSeo,
  LandingStory,
  LandingPortfolioAbout,
  LandingCta,
  LandingBenefit,
  LandingTestimonial,
  LandingFaqItem,
  LandingStat,
  LandingSpace,
  LandingService,
  LandingOffer,
  LandingWorkflowStep,
  LandingGalleryItem,
  LandingNavItem,
  LandingTeamMember,
  LandingServiceMenuItem,
  LandingWorkHistoryItem,
  LandingSectionSelection,
} from "@/db/schema";
import { getDefaultSectionSelections } from "@/lib/section-selections";

export type LandingWithSections = LandingPage & {
  sectionSelections: LandingSectionSelection[];
  seo: LandingSeo | null;
  branding: LandingBranding | null;
  hero: LandingHero | null;
  story: LandingStory | null;
  portfolioAbout: LandingPortfolioAbout | null;
  cta: LandingCta | null;
  benefits: LandingBenefit[];
  testimonials: LandingTestimonial[];
  faq: LandingFaqItem[];
  stats: LandingStat[];
  spaces: LandingSpace[];
  services: LandingService[];
  offers: LandingOffer[];
  workflow: LandingWorkflowStep[];
  gallery: LandingGalleryItem[];
  nav: LandingNavItem[];
  team: LandingTeamMember[];
  serviceMenu: LandingServiceMenuItem[];
  workHistory: LandingWorkHistoryItem[];
};

export type LandingPageMeta = Pick<
  LandingPage,
  "id" | "userId" | "name" | "slug" | "template" | "published" | "customDomain" | "updatedAt"
> & {
  seo: Pick<
    LandingSeo,
    "title" | "description" | "favicon" | "socialImage"
  > | null;
  branding: Pick<LandingBranding, "brand"> | null;
  hero: Pick<
    LandingHero,
    | "eyebrow"
    | "title"
    | "subtitle"
    | "description"
    | "image"
    | "houseImage"
    | "fanImages"
    | "ctaLabel"
  > | null;
};

function buildMetaWith() {
  return {
    seo: true as const,
    branding: true as const,
    hero: true as const,
  };
}

function buildWith() {
  return {
    sectionSelections: true as const,
    seo: true as const,
    branding: true as const,
    hero: true as const,
    story: true as const,
    portfolioAbout: true as const,
    cta: true as const,
    benefits: { orderBy: [asc(landingBenefits.sortOrder)] },
    testimonials: { orderBy: [asc(landingTestimonials.sortOrder)] },
    faq: { orderBy: [asc(landingFaq.sortOrder)] },
    stats: { orderBy: [asc(landingStats.sortOrder)] },
    spaces: { orderBy: [asc(landingSpaces.sortOrder)] },
    services: { orderBy: [asc(landingServices.sortOrder)] },
    offers: { orderBy: [asc(landingOffers.sortOrder)] },
    workflow: { orderBy: [asc(landingWorkflow.sortOrder)] },
    gallery: { orderBy: [asc(landingGallery.sortOrder)] },
    nav: { orderBy: [asc(landingNav.sortOrder)] },
    team: { orderBy: [asc(landingTeam.sortOrder)] },
    serviceMenu: { orderBy: [asc(landingServiceMenu.sortOrder)] },
    workHistory: { orderBy: [asc(landingWorkHistory.sortOrder)] },
  };
}

export const getLandingPageByUserId = cache(async (userId: string) => {
  try {
    return (await db.query.landingPages.findFirst({
      where: eq(landingPages.userId, userId),
      with: buildWith(),
    })) as LandingWithSections | undefined;
  } catch (error) {
    throw new Error("Failed to fetch landing page", { cause: error });
  }
});

export const getLandingPageByIdAndUserId = cache(
  async (id: string, userId: string) => {
    try {
      return (await db.query.landingPages.findFirst({
        where: and(eq(landingPages.id, id), eq(landingPages.userId, userId)),
        with: buildWith(),
      })) as LandingWithSections | undefined;
    } catch (error) {
      throw new Error("Failed to fetch landing page", { cause: error });
    }
  }
);

export const getLandingPageBySlug = cache(async (slug: string) => {
  try {
    return (await db.query.landingPages.findFirst({
      where: and(
        or(eq(landingPages.slug, slug), eq(landingPages.slug, `/${slug}`)),
        eq(landingPages.published, true)
      ),
      with: buildWith(),
    })) as LandingWithSections | undefined;
  } catch (error) {
    throw new Error("Failed to fetch landing page", { cause: error });
  }
});

export const getLandingPageById = cache(async (id: string) => {
  try {
    return (await db.query.landingPages.findFirst({
      where: eq(landingPages.id, id),
      with: buildWith(),
    })) as LandingWithSections | undefined;
  } catch (error) {
    throw new Error("Failed to fetch landing page", { cause: error });
  }
});

export const getLandingPageMetaByIdAndUserId = cache(
  async (id: string, userId: string) => {
    try {
      return (await db.query.landingPages.findFirst({
        where: and(eq(landingPages.id, id), eq(landingPages.userId, userId)),
        with: buildMetaWith(),
      })) as LandingPageMeta | undefined;
    } catch (error) {
      throw new Error("Failed to fetch landing page meta", { cause: error });
    }
  }
);

export const getLandingPageMetaById = cache(async (id: string) => {
  try {
    return (await db.query.landingPages.findFirst({
      where: eq(landingPages.id, id),
      with: buildMetaWith(),
    })) as LandingPageMeta | undefined;
  } catch (error) {
    throw new Error("Failed to fetch landing page meta", { cause: error });
  }
});

export const getLandingPageMetaBySlug = cache(async (slug: string) => {
  try {
    return (await db.query.landingPages.findFirst({
      where: and(
        or(eq(landingPages.slug, slug), eq(landingPages.slug, `/${slug}`)),
        eq(landingPages.published, true)
      ),
      with: buildMetaWith(),
    })) as LandingPageMeta | undefined;
  } catch (error) {
    throw new Error("Failed to fetch landing page meta", { cause: error });
  }
});

export async function updateLandingPage(
  id: string,
  data: Partial<Pick<LandingPage, "published" | "name" | "slug" | "updatedAt">>
) {
  try {
    await db.update(landingPages).set(data).where(eq(landingPages.id, id));
  } catch {
    throw new Error("Failed to update landing page");
  }
}

export async function insertLandingPage(data: {
  userId: string;
  name: string;
  slug: string;
  template: LandingPage["template"];
}) {
  try {
    return await db.transaction(async (tx) => {
      const [landing] = await tx
        .insert(landingPages)
        .values(data)
        .returning({ id: landingPages.id });
      const selections = getDefaultSectionSelections(data.template);

      await tx.insert(landingSectionSelections).values({
        landingId: landing.id,
        sectionKey: "hero",
        variantId: selections.hero,
      });

      return landing;
    });
  } catch {
    throw new Error("Failed to insert landing page");
  }
}

export async function deleteLandingPageById(id: string) {
  try {
    await db.delete(landingPages).where(eq(landingPages.id, id));
  } catch {
    throw new Error("Failed to delete landing page");
  }
}

export async function getLandingsByUserId(userId: string) {
  try {
    return await db.query.landingPages.findMany({
      where: eq(landingPages.userId, userId),
    });
  } catch {
    throw new Error("Failed to fetch landings by user");
  }
}

export async function deleteLandingsByUserId(userId: string) {
  try {
    await db.delete(landingPages).where(eq(landingPages.userId, userId));
  } catch {
    throw new Error("Failed to delete landings by user");
  }
}
