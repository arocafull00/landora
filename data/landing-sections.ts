import { eq } from "drizzle-orm";
import { db } from "@/db";
import {
  landingSeo,
  landingBranding,
  landingHero,
  landingStory,
  landingCta,
  landingBenefits,
  landingTestimonials,
  landingFaq,
  landingStats,
  landingSpaces,
  landingServices,
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

export async function upsertLandingSeo(
  landingId: string,
  data: { title: string; description: string }
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
    sectionHeadings?: Record<string, { title: string; subtitle: string }>;
  }
) {
  try {
    const set: { brand: string; sectionHeadings?: Record<string, { title: string; subtitle: string }> } = {
      brand: data.brand,
    };
    if (data.sectionHeadings !== undefined) {
      set.sectionHeadings = data.sectionHeadings;
    }
    await db
      .insert(landingBranding)
      .values({ landingId, brand: data.brand, sectionHeadings: data.sectionHeadings ?? {} })
      .onConflictDoUpdate({ target: landingBranding.landingId, set });
  } catch {
    throw new Error("Failed to update branding");
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

export async function upsertLandingCta(
  landingId: string,
  data: { phone: string; email: string; address: string }
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
  try {
    await db.delete(landingStats).where(eq(landingStats.landingId, landingId));
    if (items.length > 0) {
      await db.insert(landingStats).values(
        items.map((item, i) => ({ landingId, sortOrder: i, ...item }))
      );
    }
  } catch {
    throw new Error("Failed to update stats");
  }
}

export async function replaceLandingSpaces(
  landingId: string,
  items: Pick<LandingSpace, "name" | "description" | "image">[]
) {
  try {
    await db.delete(landingSpaces).where(eq(landingSpaces.landingId, landingId));
    if (items.length > 0) {
      await db.insert(landingSpaces).values(
        items.map((item, i) => ({ landingId, sortOrder: i, ...item }))
      );
    }
  } catch {
    throw new Error("Failed to update spaces");
  }
}

export async function replaceLandingServices(
  landingId: string,
  items: Pick<LandingService, "title" | "subtitle" | "label" | "image">[]
) {
  try {
    await db.delete(landingServices).where(eq(landingServices.landingId, landingId));
    if (items.length > 0) {
      await db.insert(landingServices).values(
        items.map((item, i) => ({ landingId, sortOrder: i, ...item }))
      );
    }
  } catch {
    throw new Error("Failed to update services");
  }
}

export async function replaceLandingWorkflow(
  landingId: string,
  items: Pick<LandingWorkflowStep, "number" | "title" | "description">[]
) {
  try {
    await db.delete(landingWorkflow).where(eq(landingWorkflow.landingId, landingId));
    if (items.length > 0) {
      await db.insert(landingWorkflow).values(
        items.map((item, i) => ({ landingId, sortOrder: i, ...item }))
      );
    }
  } catch {
    throw new Error("Failed to update workflow");
  }
}

export async function replaceLandingTestimonials(
  landingId: string,
  items: Pick<LandingTestimonial, "author" | "date" | "rating" | "comment" | "verified">[]
) {
  try {
    await db.delete(landingTestimonials).where(eq(landingTestimonials.landingId, landingId));
    if (items.length > 0) {
      await db.insert(landingTestimonials).values(
        items.map((item, i) => ({ landingId, sortOrder: i, ...item }))
      );
    }
  } catch {
    throw new Error("Failed to update testimonials");
  }
}

export async function replaceLandingGallery(
  landingId: string,
  items: Pick<LandingGalleryItem, "image" | "video">[]
) {
  try {
    await db.delete(landingGallery).where(eq(landingGallery.landingId, landingId));
    if (items.length > 0) {
      await db.insert(landingGallery).values(
        items.map((item, i) => ({ landingId, sortOrder: i, ...item }))
      );
    }
  } catch {
    throw new Error("Failed to update gallery");
  }
}

export async function replaceLandingNav(
  landingId: string,
  items: Pick<LandingNavItem, "label" | "href">[]
) {
  try {
    await db.delete(landingNav).where(eq(landingNav.landingId, landingId));
    if (items.length > 0) {
      await db.insert(landingNav).values(
        items.map((item, i) => ({ landingId, sortOrder: i, ...item }))
      );
    }
  } catch {
    throw new Error("Failed to update nav");
  }
}

export async function replaceLandingBenefits(
  landingId: string,
  items: Pick<LandingBenefit, "title" | "description" | "icon" | "image">[]
) {
  try {
    await db.delete(landingBenefits).where(eq(landingBenefits.landingId, landingId));
    if (items.length > 0) {
      await db.insert(landingBenefits).values(
        items.map((item, i) => ({ landingId, sortOrder: i, ...item }))
      );
    }
  } catch {
    throw new Error("Failed to update benefits");
  }
}

export async function replaceLandingFaq(
  landingId: string,
  items: Pick<LandingFaqItem, "question" | "answer">[]
) {
  try {
    await db.delete(landingFaq).where(eq(landingFaq.landingId, landingId));
    if (items.length > 0) {
      await db.insert(landingFaq).values(
        items.map((item, i) => ({ landingId, sortOrder: i, ...item }))
      );
    }
  } catch {
    throw new Error("Failed to update FAQ");
  }
}

export async function replaceLandingTeam(
  landingId: string,
  items: Pick<LandingTeamMember, "name" | "role" | "bio" | "image">[]
) {
  try {
    await db.delete(landingTeam).where(eq(landingTeam.landingId, landingId));
    if (items.length > 0) {
      await db.insert(landingTeam).values(
        items.map((item, i) => ({ landingId, sortOrder: i, ...item }))
      );
    }
  } catch {
    throw new Error("Failed to update team");
  }
}

export async function replaceLandingServiceMenu(
  landingId: string,
  items: Pick<LandingServiceMenuItem, "category" | "name" | "description" | "price" | "duration" | "image">[]
) {
  try {
    await db.delete(landingServiceMenu).where(eq(landingServiceMenu.landingId, landingId));
    if (items.length > 0) {
      await db.insert(landingServiceMenu).values(
        items.map((item, i) => ({ landingId, sortOrder: i, ...item }))
      );
    }
  } catch {
    throw new Error("Failed to update service menu");
  }
}

export async function replaceLandingWorkHistory(
  landingId: string,
  items: Pick<
    LandingWorkHistoryItem,
    "dateRange" | "location" | "company" | "title" | "summary" | "highlights" | "technologies"
  >[]
) {
  try {
    await db.delete(landingWorkHistory).where(eq(landingWorkHistory.landingId, landingId));
    if (items.length > 0) {
      await db.insert(landingWorkHistory).values(
        items.map((item, i) => ({ landingId, sortOrder: i, ...item }))
      );
    }
  } catch {
    throw new Error("Failed to update work history");
  }
}
