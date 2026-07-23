import "server-only";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import {
  landingSeo,
  landingBranding,
  landingHero,
  landingStory,
  landingPortfolioAbout,
  landingCta,
  landingBenefits,
  landingTestimonials,
  landingFaq,
  landingStats,
  landingSpaces,
  landingServices,
  landingOffers,
  landingWorkflow,
  landingGallery,
  landingNav,
  landingTeam,
  landingServiceMenu,
  landingWorkHistory,
} from "@/db/schema";
import type {
  LandingStat,
  LandingSpace,
  LandingService,
  LandingOffer,
  LandingWorkflowStep,
  LandingTestimonial,
  LandingGalleryItem,
  LandingNavItem,
  LandingBenefit,
  LandingFaqItem,
  LandingTeamMember,
  LandingServiceMenuItem,
  LandingWorkHistoryItem,
} from "@/db/schema";

type ReplaceableLandingTable =
  | typeof landingStats
  | typeof landingSpaces
  | typeof landingServices
  | typeof landingOffers
  | typeof landingWorkflow
  | typeof landingTestimonials
  | typeof landingGallery
  | typeof landingNav
  | typeof landingBenefits
  | typeof landingFaq
  | typeof landingTeam
  | typeof landingServiceMenu
  | typeof landingWorkHistory;

async function replaceLandingCollection<T extends Record<string, unknown>>(
  table: ReplaceableLandingTable,
  landingId: string,
  items: T[],
  errorLabel: string
) {
  try {
    await db.delete(table).where(eq(table.landingId, landingId));
    if (items.length > 0) {
      await db.insert(table).values(
        items.map((item, i) => ({ landingId, sortOrder: i, ...item }))
      );
    }
  } catch {
    throw new Error(`Failed to update ${errorLabel}`);
  }
}

export async function upsertLandingSeo(
  landingId: string,
  data: { title: string; description: string; favicon: string }
) {
  try {
    await db
      .insert(landingSeo)
      .values({ landingId, ...data })
      .onConflictDoUpdate({ target: landingSeo.landingId, set: data });
  } catch {
    throw new Error("Failed to update SEO");
  }
}

export async function upsertLandingBranding(
  landingId: string,
  data: {
    brand: string;
    brandLogoType?: "text" | "image";
    brandLogoImage?: string;
    paletteId?: string;
    typographyId?: string;
    sectionHeadings?: Record<string, { title: string; subtitle: string }>;
    hiddenSections?: string[];
    sectionOrder?: string[];
    enabledPages?: string[];
  }
) {
  try {
    const set: {
      brand: string;
      brandLogoType?: "text" | "image";
      brandLogoImage?: string;
      paletteId?: string;
      typographyId?: string;
      sectionHeadings?: Record<string, { title: string; subtitle: string }>;
      hiddenSections?: string[];
      sectionOrder?: string[];
      enabledPages?: string[];
    } = {
      brand: data.brand,
    };
    if (data.brandLogoType !== undefined) {
      set.brandLogoType = data.brandLogoType;
    }
    if (data.brandLogoImage !== undefined) {
      set.brandLogoImage = data.brandLogoImage;
    }
    if (data.paletteId !== undefined) {
      set.paletteId = data.paletteId;
    }
    if (data.typographyId !== undefined) {
      set.typographyId = data.typographyId;
    }
    if (data.sectionHeadings !== undefined) {
      set.sectionHeadings = data.sectionHeadings;
    }
    if (data.hiddenSections !== undefined) {
      set.hiddenSections = data.hiddenSections;
    }
    if (data.sectionOrder !== undefined) {
      set.sectionOrder = data.sectionOrder;
    }
    if (data.enabledPages !== undefined) {
      set.enabledPages = data.enabledPages;
    }
    await db
      .insert(landingBranding)
      .values({
        landingId,
        brand: data.brand,
        brandLogoType: data.brandLogoType ?? "text",
        brandLogoImage: data.brandLogoImage ?? "",
        paletteId: data.paletteId ?? "default",
        typographyId: data.typographyId ?? "default",
        sectionHeadings: data.sectionHeadings ?? {},
        hiddenSections: data.hiddenSections ?? [],
        sectionOrder: data.sectionOrder ?? [],
        enabledPages: data.enabledPages ?? [],
      })
      .onConflictDoUpdate({ target: landingBranding.landingId, set });
  } catch {
    throw new Error("Failed to update branding");
  }
}

export async function updateLandingAppearance(
  landingId: string,
  data: {
    paletteId: string;
    typographyId: string;
  },
) {
  try {
    await db
      .insert(landingBranding)
      .values({
        landingId,
        brand: "",
        paletteId: data.paletteId,
        typographyId: data.typographyId,
      })
      .onConflictDoUpdate({
        target: landingBranding.landingId,
        set: data,
      });
  } catch (error) {
    throw new Error("Failed to update landing appearance", { cause: error });
  }
}

export async function upsertLandingHero(
  landingId: string,
  data: {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    houseImage: string;
    fanImages: string[];
    ctaLabel: string;
  }
) {
  try {
    await db
      .insert(landingHero)
      .values({ landingId, ...data })
      .onConflictDoUpdate({ target: landingHero.landingId, set: data });
  } catch {
    throw new Error("Failed to update hero");
  }
}

export async function upsertLandingStory(
  landingId: string,
  data: { statement: string }
) {
  try {
    await db
      .insert(landingStory)
      .values({ landingId, ...data })
      .onConflictDoUpdate({ target: landingStory.landingId, set: data });
  } catch {
    throw new Error("Failed to update story");
  }
}

export async function upsertLandingPortfolioAbout(
  landingId: string,
  data: {
    title: string;
    intro: string;
    image: string;
    storyTitle: string;
    storyBody: string;
    storyImage: string;
  },
) {
  try {
    await db
      .insert(landingPortfolioAbout)
      .values({ landingId, ...data })
      .onConflictDoUpdate({
        target: landingPortfolioAbout.landingId,
        set: data,
      });
  } catch (error) {
    throw new Error("Failed to update portfolio about page", { cause: error });
  }
}

export async function upsertLandingCta(
  landingId: string,
  data: {
    phone: string;
    email: string;
    address: string;
    ctaLabel: string;
    copyrightSuffix: string;
    copyrightExtra: string;
    socialLinks: { platform: string; url: string }[];
    whatsappEnabled: boolean;
  }
) {
  try {
    await db
      .insert(landingCta)
      .values({ landingId, ...data })
      .onConflictDoUpdate({ target: landingCta.landingId, set: data });
  } catch {
    throw new Error("Failed to update CTA");
  }
}

export async function replaceLandingStats(
  landingId: string,
  items: Pick<LandingStat, "value" | "label" | "countTo" | "suffix">[]
) {
  return replaceLandingCollection(landingStats, landingId, items, "stats");
}

export async function replaceLandingSpaces(
  landingId: string,
  items: Pick<LandingSpace, "name" | "description" | "image">[]
) {
  return replaceLandingCollection(landingSpaces, landingId, items, "spaces");
}

export async function replaceLandingServices(
  landingId: string,
  items: Pick<LandingService, "title" | "subtitle" | "label" | "image">[]
) {
  return replaceLandingCollection(landingServices, landingId, items, "services");
}

export async function replaceLandingOffers(
  landingId: string,
  items: Pick<
    LandingOffer,
    | "type"
    | "title"
    | "description"
    | "badge"
    | "ctaText"
    | "expiresAt"
    | "enabled"
    | "cards"
    | "image"
    | "features"
  >[]
) {
  return replaceLandingCollection(landingOffers, landingId, items, "offers");
}

export async function replaceLandingWorkflow(
  landingId: string,
  items: Pick<LandingWorkflowStep, "number" | "title" | "description">[]
) {
  return replaceLandingCollection(landingWorkflow, landingId, items, "workflow");
}

export async function replaceLandingTestimonials(
  landingId: string,
  items: Pick<LandingTestimonial, "author" | "date" | "rating" | "comment" | "verified">[]
) {
  return replaceLandingCollection(landingTestimonials, landingId, items, "testimonials");
}

export async function replaceLandingGallery(
  landingId: string,
  items: Pick<
    LandingGalleryItem,
    | "image"
    | "video"
    | "title"
    | "description"
    | "tags"
    | "link"
    | "linkType"
    | "projectSlug"
    | "projectBody"
    | "projectGallery"
  >[]
) {
  return replaceLandingCollection(landingGallery, landingId, items, "gallery");
}

export async function replaceLandingNav(
  landingId: string,
  items: Pick<LandingNavItem, "label" | "href">[]
) {
  return replaceLandingCollection(landingNav, landingId, items, "nav");
}

export async function replaceLandingBenefits(
  landingId: string,
  items: Pick<LandingBenefit, "title" | "description" | "icon" | "image">[]
) {
  return replaceLandingCollection(landingBenefits, landingId, items, "benefits");
}

export async function replaceLandingFaq(
  landingId: string,
  items: Pick<LandingFaqItem, "question" | "answer">[]
) {
  return replaceLandingCollection(landingFaq, landingId, items, "faq");
}

export async function replaceLandingTeam(
  landingId: string,
  items: Pick<LandingTeamMember, "name" | "role" | "bio" | "image">[]
) {
  return replaceLandingCollection(landingTeam, landingId, items, "team");
}

export async function replaceLandingServiceMenu(
  landingId: string,
  items: Pick<LandingServiceMenuItem, "category" | "name" | "description" | "price" | "duration" | "image">[]
) {
  return replaceLandingCollection(landingServiceMenu, landingId, items, "service menu");
}

export async function replaceLandingWorkHistory(
  landingId: string,
  items: Pick<
    LandingWorkHistoryItem,
    "dateRange" | "location" | "company" | "title" | "summary" | "highlights" | "technologies"
  >[]
) {
  return replaceLandingCollection(landingWorkHistory, landingId, items, "work history");
}
