import { cache } from "react";
import { and, asc, eq, or } from "drizzle-orm";
import { db } from "@/db";
import {
  landingPages,
  landingBenefits,
  landingBranding,
  landingCta,
  landingFaq,
  landingGallery,
  landingHero,
  landingNav,
  landingSeo,
  landingServices,
  landingSpaces,
  landingStats,
  landingStory,
  landingTestimonials,
  landingWorkflow,
  landingTeam,
  landingServiceMenu,
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
  };
}

export const getLandingPageByUserId = cache(async (userId: string) => {
  try {
    return (await db.query.landingPages.findFirst({
      where: eq(landingPages.userId, userId),
      with: buildWith(),
    })) as LandingWithSections | undefined;
  } catch {
    throw new Error("Failed to fetch landing page");
  }
});

export const getLandingPageByIdAndUserId = cache(
  async (id: string, userId: string) => {
    try {
      return (await db.query.landingPages.findFirst({
        where: and(eq(landingPages.id, id), eq(landingPages.userId, userId)),
        with: buildWith(),
      })) as LandingWithSections | undefined;
    } catch {
      throw new Error("Failed to fetch landing page");
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
  } catch {
    throw new Error("Failed to fetch landing page");
  }
});

export const getLandingPageById = cache(async (id: string) => {
  try {
    return (await db.query.landingPages.findFirst({
      where: eq(landingPages.id, id),
      with: buildWith(),
    })) as LandingWithSections | undefined;
  } catch {
    throw new Error("Failed to fetch landing page");
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
