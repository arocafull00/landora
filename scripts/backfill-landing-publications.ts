import { and, asc, eq, isNull, max } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";
import type { LandingWithSections } from "@/data/landing-pages";
import { toLandingContent } from "@/lib/landing-mapper";
import { logger } from "@/lib/logger";
import {
  getNextLandingVersion,
  normalizePublishedSlug,
} from "@/lib/landing-publication";
import { resolveSectionSelections } from "@/lib/section-selections";
import { publishedLandingContentSchema } from "@/lib/schemas/landing-publication";

const databaseUrl =
  process.env.DIRECT_URL ??
  process.env.DATABASE_URL_DIRECT ??
  process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DIRECT_URL or DATABASE_URL is not configured");
}

const client = postgres(databaseUrl, {
  prepare: false,
  max: 1,
  connect_timeout: 10,
});
const db = drizzle(client, { schema });

function landingRelations() {
  return {
    sectionSelections: true as const,
    seo: true as const,
    branding: true as const,
    hero: true as const,
    story: true as const,
    portfolioAbout: true as const,
    cta: true as const,
    benefits: { orderBy: [asc(schema.landingBenefits.sortOrder)] },
    testimonials: { orderBy: [asc(schema.landingTestimonials.sortOrder)] },
    faq: { orderBy: [asc(schema.landingFaq.sortOrder)] },
    stats: { orderBy: [asc(schema.landingStats.sortOrder)] },
    spaces: { orderBy: [asc(schema.landingSpaces.sortOrder)] },
    services: { orderBy: [asc(schema.landingServices.sortOrder)] },
    offers: { orderBy: [asc(schema.landingOffers.sortOrder)] },
    workflow: { orderBy: [asc(schema.landingWorkflow.sortOrder)] },
    gallery: { orderBy: [asc(schema.landingGallery.sortOrder)] },
    nav: { orderBy: [asc(schema.landingNav.sortOrder)] },
    team: { orderBy: [asc(schema.landingTeam.sortOrder)] },
    serviceMenu: { orderBy: [asc(schema.landingServiceMenu.sortOrder)] },
    workHistory: { orderBy: [asc(schema.landingWorkHistory.sortOrder)] },
  };
}

async function backfillLandingPublications() {
  const rows = await db
    .select({
      id: schema.landingPages.id,
      clerkUserId: schema.users.clerkUserId,
    })
    .from(schema.landingPages)
    .innerJoin(schema.users, eq(schema.landingPages.userId, schema.users.id))
    .where(
      and(
        eq(schema.landingPages.published, true),
        isNull(schema.landingPages.publishedVersionId),
      ),
    );

  for (const row of rows) {
    const landing = (await db.query.landingPages.findFirst({
      where: eq(schema.landingPages.id, row.id),
      with: landingRelations(),
    })) as LandingWithSections | undefined;

    if (!landing) {
      throw new Error(`Landing ${row.id} was not found during backfill`);
    }

    const content = publishedLandingContentSchema.parse(
      toLandingContent(landing),
    );
    const sectionSelections = resolveSectionSelections(
      landing.template,
      landing.sectionSelections,
    );

    const version = await db.transaction(async (tx) => {
      const [latest] = await tx
        .select({ version: max(schema.landingPageVersions.version) })
        .from(schema.landingPageVersions)
        .where(eq(schema.landingPageVersions.landingPageId, landing.id));
      const nextVersion = getNextLandingVersion(latest?.version ?? null);

      const [snapshot] = await tx
        .insert(schema.landingPageVersions)
        .values({
          landingPageId: landing.id,
          version: nextVersion,
          template: landing.template,
          name: landing.name,
          slug: normalizePublishedSlug(landing.slug),
          contentJson: content,
          seoJson: {
            title: landing.seo?.title ?? "",
            description: landing.seo?.description ?? "",
            favicon: landing.seo?.favicon ?? "",
            socialImage: landing.seo?.socialImage ?? "",
          },
          sectionSelectionsJson: sectionSelections,
          createdBy: row.clerkUserId,
        })
        .returning({ id: schema.landingPageVersions.id });

      await tx
        .update(schema.landingPages)
        .set({
          publishedVersionId: snapshot.id,
          publishedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(schema.landingPages.id, landing.id),
            isNull(schema.landingPages.publishedVersionId),
          ),
        );

      return nextVersion;
    });

    logger.info(logger.fmt`Landing ${row.id} backfilled as version ${version}`);
  }
}

backfillLandingPublications()
  .catch((error: unknown) => {
    logger.captureException(error, { action: "backfill-landing-publications" });
    process.exitCode = 1;
  })
  .finally(async () => {
    await client.end();
  });
