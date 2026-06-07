import { cache } from "react";
import { and, eq, or } from "drizzle-orm";
import { db } from "@/db";
import { landingPages } from "@/db/schema";
import type { LandingPage } from "@/db/schema";

export const getLandingPageByUserId = cache(async (userId: string) => {
  try {
    return await db.query.landingPages.findFirst({
      where: eq(landingPages.userId, userId),
    });
  } catch {
    throw new Error("Failed to fetch landing page");
  }
});

export const getLandingPageByIdAndUserId = cache(
  async (id: string, userId: string) => {
    try {
      return await db.query.landingPages.findFirst({
        where: and(eq(landingPages.id, id), eq(landingPages.userId, userId)),
      });
    } catch {
      throw new Error("Failed to fetch landing page");
    }
  }
);

export const getLandingPageBySlug = cache(async (slug: string) => {
  try {
    return await db.query.landingPages.findFirst({
      where: and(
        or(eq(landingPages.slug, slug), eq(landingPages.slug, `/${slug}`)),
        eq(landingPages.published, true)
      ),
    });
  } catch {
    throw new Error("Failed to fetch landing page");
  }
});

export async function updateLandingPage(
  id: string,
  data: Partial<Pick<LandingPage, "contentJson" | "published" | "updatedAt">>
) {
  try {
    await db.update(landingPages).set(data).where(eq(landingPages.id, id));
  } catch {
    throw new Error("Failed to update landing page");
  }
}
