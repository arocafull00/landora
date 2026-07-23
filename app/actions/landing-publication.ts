"use server";

import { auth } from "@clerk/nextjs/server";
import { updateTag } from "next/cache";
import { after } from "next/server";
import {
  getPublishedLandingById,
  restoreLandingPageVersion,
  unpublishLandingPage,
} from "@/data/landing-publications";
import { assertLandingAccess } from "@/lib/api/landing-auth";
import { logger } from "@/lib/logger";
import { resourceIdSchema } from "@/lib/schemas/api";
import { restoreLandingVersionSchema } from "@/lib/schemas/landing-publication";
import { warmPublicLanding } from "@/lib/warm-public-landing";

type PublicationActionResult =
  | { success: true; version?: number }
  | { error: string };

function invalidatePublishedLanding(
  landingId: string,
  slug: string | undefined,
) {
  updateTag(`landing:${landingId}`);
  if (slug) updateTag(`landing-slug:${slug}`);
  updateTag("public-landings");
  updateTag("public-sitemap");
}

export async function unpublishLandingAction(
  input: unknown,
): Promise<PublicationActionResult> {
  const parsedId = resourceIdSchema.safeParse(input);
  if (!parsedId.success) return { error: "La landing no es válida" };

  const landing = await assertLandingAccess(parsedId.data);
  if (!landing) return { error: "No tienes acceso a esta web" };

  try {
    const publishedLanding = await getPublishedLandingById(landing.id);
    const unpublished = await unpublishLandingPage(landing.id, landing.userId);
    if (!unpublished) return { error: "No tienes acceso a esta web" };

    invalidatePublishedLanding(landing.id, publishedLanding?.slug);
    return { success: true };
  } catch (error) {
    logger.captureException(error, {
      action: "unpublish-landing",
      landingId: landing.id,
      tenantId: landing.userId,
    });
    return { error: "No se pudo despublicar la landing" };
  }
}

export async function restoreLandingVersionAction(
  input: unknown,
): Promise<PublicationActionResult> {
  const parsed = restoreLandingVersionSchema.safeParse(input);
  if (!parsed.success) return { error: "La versión no es válida" };

  const landing = await assertLandingAccess(parsed.data.landingId);
  if (!landing) return { error: "No tienes acceso a esta web" };

  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) return { error: "No autorizado" };

  try {
    const restored = await restoreLandingPageVersion({
      landingId: landing.id,
      userId: landing.userId,
      versionId: parsed.data.versionId,
      createdBy: clerkUserId,
    });
    if (restored.status === "not_found") {
      return { error: "No se encontró la versión solicitada" };
    }

    invalidatePublishedLanding(restored.landingId, restored.slug);
    after(() =>
      warmPublicLanding({
        id: landing.id,
        slug: restored.slug,
        customDomain: landing.customDomain,
      }),
    );
    return { success: true, version: restored.version };
  } catch (error) {
    logger.captureException(error, {
      action: "restore-landing-version",
      landingId: landing.id,
      tenantId: landing.userId,
      versionId: parsed.data.versionId,
    });
    return { error: "No se pudo restaurar la versión" };
  }
}
