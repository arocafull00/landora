import { cache } from "react";
import { and, asc, eq, or } from "drizzle-orm";
import { db } from "@/db";
import {
  landingPages,
  landingBenefits,
  landingFaq,
  landingGallery,
  landingNav,
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
  LandingCta,
  LandingBenefit,
  LandingTestimonial,
  LandingFaqItem,
  LandingStat,
  LandingSpace,
  LandingService,
  LandingWorkflowStep,
  LandingGalleryItem,
  LandingNavItem,
  LandingTeamMember,
  LandingServiceMenuItem,
  LandingWorkHistoryItem,
} from "@/db/schema";

export type LandingWithSections = LandingPage & {
  seo: LandingSeo | null;
  branding: LandingBranding | null;
  hero: LandingHero | null;
  story: LandingStory | null;
  cta: LandingCta | null;
  benefits: LandingBenefit[];
  testimonials: LandingTestimonial[];
  faq: LandingFaqItem[];
  stats: LandingStat[];
  spaces: LandingSpace[];
  services: LandingService[];
  workflow: LandingWorkflowStep[];
  gallery: LandingGalleryItem[];
  nav: LandingNavItem[];
  team: LandingTeamMember[];
  serviceMenu: LandingServiceMenuItem[];
  workHistory: LandingWorkHistoryItem[];
};

function buildWith() {
  return {
    seo: true as const,
    branding: true as const,
    hero: true as const,
    story: true as const,
    cta: true as const,
    benefits: { orderBy: [asc(landingBenefits.sortOrder)] },
    testimonials: { orderBy: [asc(landingTestimonials.sortOrder)] },
    faq: { orderBy: [asc(landingFaq.sortOrder)] },
    stats: { orderBy: [asc(landingStats.sortOrder)] },
    spaces: { orderBy: [asc(landingSpaces.sortOrder)] },
    services: { orderBy: [asc(landingServices.sortOrder)] },
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
