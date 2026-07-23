import { and, eq, isNull } from "drizzle-orm";
import { publishLandingVersion } from "@/data/landing-publications";
import { getLandingPageById } from "@/data/landing-pages";
import { db } from "@/db";
import { landingPages, users } from "@/db/schema";
import { toLandingContent } from "@/lib/landing-mapper";
import { logger } from "@/lib/logger";
import { resolveSectionSelections } from "@/lib/section-selections";
import { publishedLandingContentSchema } from "@/lib/schemas/landing-publication";

async function backfillLandingPublications() {
  const rows = await db
    .select({
      id: landingPages.id,
      userId: landingPages.userId,
      clerkUserId: users.clerkUserId,
    })
    .from(landingPages)
    .innerJoin(users, eq(landingPages.userId, users.id))
    .where(
      and(
        eq(landingPages.published, true),
        isNull(landingPages.publishedVersionId),
      ),
    );

  for (const row of rows) {
    const landing = await getLandingPageById(row.id);
    if (!landing) {
      throw new Error(`Landing ${row.id} was not found during backfill`);
    }

    const content = publishedLandingContentSchema.parse(
      toLandingContent(landing),
    );
    const result = await publishLandingVersion({
      landingId: landing.id,
      userId: landing.userId,
      createdBy: row.clerkUserId,
      template: landing.template,
      name: landing.name,
      slug: landing.slug,
      content,
      seo: {
        title: landing.seo?.title ?? "",
        description: landing.seo?.description ?? "",
        favicon: landing.seo?.favicon ?? "",
        socialImage: landing.seo?.socialImage ?? "",
      },
      sectionSelections: resolveSectionSelections(
        landing.template,
        landing.sectionSelections,
      ),
    });

    if (result.status === "not_found") {
      throw new Error(`Landing ${row.id} could not be published during backfill`);
    }

    logger.info(
      logger.fmt`Landing ${row.id} backfilled as version ${result.version}`,
    );
  }
}

backfillLandingPublications().catch((error: unknown) => {
  logger.captureException(error, { action: "backfill-landing-publications" });
  process.exitCode = 1;
});
