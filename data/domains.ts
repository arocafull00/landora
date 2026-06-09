import { cache } from "react";
import { and, eq, ne } from "drizzle-orm";
import { db } from "@/db";
import { landingPages } from "@/db/schema";
import { normalizeHost } from "@/lib/app-host";

export const getLandingByCustomDomain = cache(async (host: string) => {
  const normalizedHost = normalizeHost(host);

  try {
    return await db.query.landingPages.findFirst({
      where: and(
        eq(landingPages.customDomain, normalizedHost),
        eq(landingPages.published, true),
      ),
    });
  } catch (error) {
    throw new Error("Failed to fetch landing by custom domain", { cause: error });
  }
});

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
