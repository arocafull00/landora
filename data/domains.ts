import "server-only";

import { and, eq, ne } from "drizzle-orm";
import { db } from "@/db";
import { landingPages } from "@/db/schema";
import {
  getPublishedLandingByCustomDomain,
  getPublishedLandingBySlug,
} from "@/data/landing-publications";

function normalizeHost(host: string) {
  return host.split(":")[0].trim().toLowerCase();
}

export async function getLandingByCustomDomain(host: string) {
  const landing = await getPublishedLandingByCustomDomain(host);
  if (!landing) return undefined;

  return {
    id: landing.id,
    slug: landing.slug,
    customDomain: landing.customDomain,
  };
}

export async function getPublishedLandingRouteBySlug(slug: string) {
  const landing = await getPublishedLandingBySlug(slug);
  if (!landing) return undefined;

  return {
    id: landing.id,
    slug: landing.slug,
    customDomain: landing.customDomain,
  };
}

export async function isCustomDomainTaken(
  domain: string,
  excludeLandingId?: string,
) {
  const normalizedDomain = normalizeHost(domain);

  try {
    const existing = await db.query.landingPages.findFirst({
      where: excludeLandingId
        ? and(
            eq(landingPages.customDomain, normalizedDomain),
            ne(landingPages.id, excludeLandingId),
          )
        : eq(landingPages.customDomain, normalizedDomain),
    });

    return Boolean(existing);
  } catch (error) {
    throw new Error("Failed to check custom domain availability", { cause: error });
  }
}

export async function setLandingCustomDomain(
  landingId: string,
  domain: string | null,
) {
  const normalizedDomain = domain ? normalizeHost(domain) : null;

  try {
    await db
      .update(landingPages)
      .set({ customDomain: normalizedDomain, updatedAt: new Date() })
      .where(eq(landingPages.id, landingId));
  } catch (error) {
    throw new Error("Failed to update custom domain", { cause: error });
  }
}
