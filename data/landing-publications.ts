import "server-only";

import { and, desc, eq, max, or, sql } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import { landingPages, landingPageVersions } from "@/db/schema";
import type { TemplateId } from "@/lib/dashboard-data";
import {
  getNextLandingVersion,
  normalizePublishedSlug,
  parsePublishedLandingContent,
  parsePublishedLandingSectionSelections,
  parsePublishedLandingSeo,
} from "@/lib/landing-publication";
import {
  publishLandingVersionSchema,
  type PublishLandingVersionInput,
} from "@/lib/schemas/landing-publication";

export type PublishedLanding = {
  id: string;
  userId: string;
  customDomain: string | null;
  publishedAt: Date | null;
  version: number;
  template: TemplateId;
  name: string;
  slug: string;
  content: ReturnType<typeof parsePublishedLandingContent>;
  seo: ReturnType<typeof parsePublishedLandingSeo>;
  sectionSelections: ReturnType<
    typeof parsePublishedLandingSectionSelections
  >;
};

type PublishLandingResult =
  | { status: "published"; landingId: string; version: number }
  | { status: "not_found" };

type RestoreLandingVersionResult =
  | {
      status: "restored";
      landingId: string;
      slug: string;
      version: number;
    }
  | { status: "not_found" };

export async function unpublishLandingPage(
  landingId: string,
  userId: string,
) {
  try {
    const [landing] = await db
      .update(landingPages)
      .set({
        published: false,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(landingPages.id, landingId),
          eq(landingPages.userId, userId),
        ),
      )
      .returning({ id: landingPages.id });

    return Boolean(landing);
  } catch (error) {
    throw new Error("Failed to unpublish landing page", { cause: error });
  }
}

export async function restoreLandingPageVersion(input: {
  landingId: string;
  userId: string;
  versionId: string;
  createdBy: string;
}): Promise<RestoreLandingVersionResult> {
  return db.transaction(async (tx) => {
    const lockedRows = await tx.execute<{ id: string }>(sql`
      SELECT ${landingPages.id}
      FROM ${landingPages}
      WHERE ${landingPages.id} = ${input.landingId}
        AND ${landingPages.userId} = ${input.userId}
      FOR UPDATE
    `);

    if (lockedRows.length === 0) return { status: "not_found" };

    const [targetVersion] = await tx
      .select()
      .from(landingPageVersions)
      .where(
        and(
          eq(landingPageVersions.id, input.versionId),
          eq(landingPageVersions.landingPageId, input.landingId),
        ),
      )
      .limit(1);

    if (!targetVersion) return { status: "not_found" };

    const content = parsePublishedLandingContent(targetVersion.contentJson);
    const seo = parsePublishedLandingSeo(targetVersion.seoJson);
    const sectionSelections = parsePublishedLandingSectionSelections(
      targetVersion.sectionSelectionsJson,
    );
    const [latest] = await tx
      .select({ version: max(landingPageVersions.version) })
      .from(landingPageVersions)
      .where(eq(landingPageVersions.landingPageId, input.landingId));
    const nextVersion = getNextLandingVersion(latest?.version ?? null);

    const [restoredVersion] = await tx
      .insert(landingPageVersions)
      .values({
        landingPageId: input.landingId,
        version: nextVersion,
        template: targetVersion.template,
        name: targetVersion.name,
        slug: targetVersion.slug,
        contentJson: content,
        seoJson: seo,
        sectionSelectionsJson: sectionSelections,
        createdBy: input.createdBy,
      })
      .returning({ id: landingPageVersions.id });

    await tx
      .update(landingPages)
      .set({
        published: true,
        publishedVersionId: restoredVersion.id,
        publishedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(landingPages.id, input.landingId),
          eq(landingPages.userId, input.userId),
        ),
      );

    return {
      status: "restored",
      landingId: input.landingId,
      slug: normalizePublishedSlug(targetVersion.slug),
      version: nextVersion,
    };
  });
}

function toPublishedLanding(row: {
  landing: {
    id: string;
    userId: string;
    customDomain: string | null;
    publishedAt: Date | null;
  };
  version: {
    version: number;
    template: TemplateId;
    name: string;
    slug: string;
    contentJson: Record<string, unknown>;
    seoJson: Record<string, unknown>;
    sectionSelectionsJson: Record<string, unknown>;
  };
}): PublishedLanding {
  return {
    id: row.landing.id,
    userId: row.landing.userId,
    customDomain: row.landing.customDomain,
    publishedAt: row.landing.publishedAt,
    version: row.version.version,
    template: row.version.template,
    name: row.version.name,
    slug: normalizePublishedSlug(row.version.slug),
    content: parsePublishedLandingContent(row.version.contentJson),
    seo: parsePublishedLandingSeo(row.version.seoJson),
    sectionSelections: parsePublishedLandingSectionSelections(
      row.version.sectionSelectionsJson,
    ),
  };
}

function publishedLandingSelection() {
  return {
    landing: {
      id: landingPages.id,
      userId: landingPages.userId,
      customDomain: landingPages.customDomain,
      publishedAt: landingPages.publishedAt,
    },
    version: {
      version: landingPageVersions.version,
      template: landingPageVersions.template,
      name: landingPageVersions.name,
      slug: landingPageVersions.slug,
      contentJson: landingPageVersions.contentJson,
      seoJson: landingPageVersions.seoJson,
      sectionSelectionsJson: landingPageVersions.sectionSelectionsJson,
    },
  };
}

export async function publishLandingVersion(
  input: PublishLandingVersionInput,
): Promise<PublishLandingResult> {
  const snapshot = publishLandingVersionSchema.parse(input);

  return db.transaction(async (tx) => {
    const lockedRows = await tx.execute<{ id: string }>(sql`
      SELECT ${landingPages.id}
      FROM ${landingPages}
      WHERE ${landingPages.id} = ${snapshot.landingId}
        AND ${landingPages.userId} = ${snapshot.userId}
      FOR UPDATE
    `);

    if (lockedRows.length === 0) return { status: "not_found" };

    const [latest] = await tx
      .select({ version: max(landingPageVersions.version) })
      .from(landingPageVersions)
      .where(eq(landingPageVersions.landingPageId, snapshot.landingId));

    const nextVersion = getNextLandingVersion(latest?.version ?? null);
    const [version] = await tx
      .insert(landingPageVersions)
      .values({
        landingPageId: snapshot.landingId,
        version: nextVersion,
        template: snapshot.template,
        name: snapshot.name,
        slug: normalizePublishedSlug(snapshot.slug),
        contentJson: snapshot.content,
        seoJson: snapshot.seo,
        sectionSelectionsJson: snapshot.sectionSelections,
        createdBy: snapshot.createdBy,
      })
      .returning({ id: landingPageVersions.id });

    await tx
      .update(landingPages)
      .set({
        published: true,
        publishedVersionId: version.id,
        publishedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(landingPages.id, snapshot.landingId),
          eq(landingPages.userId, snapshot.userId),
        ),
      );

    return {
      status: "published",
      landingId: snapshot.landingId,
      version: nextVersion,
    };
  });
}

export async function getPublishedLandingBySlug(
  slug: string,
): Promise<PublishedLanding | null> {
  "use cache";

  const normalizedSlug = normalizePublishedSlug(slug);
  cacheLife("max");
  cacheTag("public-landings", `landing-slug:${normalizedSlug}`);

  const [row] = await db
    .select(publishedLandingSelection())
    .from(landingPages)
    .innerJoin(
      landingPageVersions,
      eq(landingPages.publishedVersionId, landingPageVersions.id),
    )
    .where(
      and(
        eq(landingPages.published, true),
        or(
          eq(landingPageVersions.slug, normalizedSlug),
          eq(landingPageVersions.slug, `/${normalizedSlug}`),
        ),
      ),
    )
    .limit(1);

  if (!row) return null;

  cacheTag(`landing:${row.landing.id}`);
  return toPublishedLanding(row);
}

export async function getPublishedLandingById(
  landingId: string,
): Promise<PublishedLanding | null> {
  "use cache";

  cacheLife("max");
  cacheTag("public-landings", `landing:${landingId}`);

  const [row] = await db
    .select(publishedLandingSelection())
    .from(landingPages)
    .innerJoin(
      landingPageVersions,
      eq(landingPages.publishedVersionId, landingPageVersions.id),
    )
    .where(
      and(
        eq(landingPages.id, landingId),
        eq(landingPages.published, true),
      ),
    )
    .limit(1);

  return row ? toPublishedLanding(row) : null;
}

export async function getPublishedLandingByCustomDomain(
  host: string,
): Promise<PublishedLanding | null> {
  "use cache";

  const normalizedHost = host.split(":")[0].trim().toLowerCase();
  cacheLife("max");
  cacheTag("public-landings", `landing-domain:${normalizedHost}`);

  const [row] = await db
    .select(publishedLandingSelection())
    .from(landingPages)
    .innerJoin(
      landingPageVersions,
      eq(landingPages.publishedVersionId, landingPageVersions.id),
    )
    .where(
      and(
        eq(landingPages.customDomain, normalizedHost),
        eq(landingPages.published, true),
      ),
    )
    .orderBy(desc(landingPageVersions.version))
    .limit(1);

  if (!row) return null;

  cacheTag(`landing:${row.landing.id}`);
  return toPublishedLanding(row);
}

export async function getPublishedLandingForSitemap(slug: string) {
  "use cache";

  cacheLife("hours");
  cacheTag("public-sitemap");
  return getPublishedLandingBySlug(slug);
}
