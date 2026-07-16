import "server-only";

import { and, eq, inArray, isNotNull, sql } from "drizzle-orm";
import { db } from "@/db";
import { domainChecks, landingPages, type DomainCheckStatus } from "@/db/schema";
import { getAppCanonicalHost, normalizeHost } from "@/lib/app-host";

export type DomainCheckResult = {
  status: DomainCheckStatus;
  statusCode?: number;
  errorCode?: string;
};

async function fetchActiveDomainChecks() {
  try {
    return await db.query.domainChecks.findMany({
      where: eq(domainChecks.active, true),
    });
  } catch (error) {
    throw new Error("Failed to fetch active domain checks", { cause: error });
  }
}

export async function getActiveDomainChecksForMonitoring() {
  return fetchActiveDomainChecks();
}

export async function syncActiveDomainChecks() {
  try {
    const publishedLandings = await db.query.landingPages.findMany({
      where: and(
        eq(landingPages.published, true),
        isNotNull(landingPages.customDomain),
      ),
      columns: {
        id: true,
        customDomain: true,
      },
    });

    const activeDomains = new Set<string>();

    await Promise.all(
      publishedLandings.map(async (landing) => {
        if (!landing.customDomain) {
          return;
        }

        const domain = normalizeHost(landing.customDomain);
        activeDomains.add(domain);
        await upsertDomainCheck(landing.id, domain);
      }),
    );

    const appDomain = getAppCanonicalHost();
    if (appDomain) {
      activeDomains.add(appDomain);
      await upsertDomainCheck(null, appDomain);
    }

    const allChecks = await db.query.domainChecks.findMany({
      columns: { id: true, domain: true },
    });

    const staleCheckIds: string[] = [];
    for (const check of allChecks) {
      if (!activeDomains.has(check.domain)) {
        staleCheckIds.push(check.id);
      }
    }

    if (staleCheckIds.length === 0) return;

    await db
      .update(domainChecks)
      .set({ active: false })
      .where(inArray(domainChecks.id, staleCheckIds));
  } catch (error) {
    throw new Error("Failed to sync active domain checks", { cause: error });
  }
}

async function upsertDomainCheck(
  landingPageId: string | null,
  domain: string,
) {
  const normalizedDomain = normalizeHost(domain);

  try {
    const existing = await db.query.domainChecks.findFirst({
      where: eq(domainChecks.domain, normalizedDomain),
    });

    if (existing) {
      await db
        .update(domainChecks)
        .set({
          landingPageId,
          active: true,
        })
        .where(eq(domainChecks.id, existing.id));
      return;
    }

    await db.insert(domainChecks).values({
      landingPageId,
      domain: normalizedDomain,
      active: true,
    });
  } catch (error) {
    throw new Error("Failed to upsert domain check", { cause: error });
  }
}

export async function updateDomainCheckResult(
  id: string,
  result: DomainCheckResult | null,
) {
  const failed = !result || result.status !== "ok";

  try {
    await db
      .update(domainChecks)
      .set({
        lastCheckedAt: new Date(),
        lastStatus: result?.status ?? "http_error",
        lastStatusCode: result?.statusCode,
        errorCode: result?.errorCode,
        consecutiveFailures: failed
          ? sql`${domainChecks.consecutiveFailures} + 1`
          : 0,
      })
      .where(eq(domainChecks.id, id));
  } catch (error) {
    throw new Error("Failed to update domain check result", { cause: error });
  }
}
