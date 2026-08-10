"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath, updateTag } from "next/cache";
import { after } from "next/server";
import { updateLandingPage } from "@/data/landing-pages";
import { publishLandingVersion } from "@/data/landing-publications";
import { upsertLandingSectionSelection } from "@/data/landing-section-selections";
import {
  updateLandingAppearance,
  upsertLandingSeo,
} from "@/data/landing-sections";
import { assertLandingAccess } from "@/lib/api/landing-auth";
import { SECTION_REGISTRY } from "@/lib/api/landing-section-registry";
import type { LandingContent, TemplateId } from "@/lib/dashboard-data";
import {
  getLandingSectionPayloads,
  hasLandingSaveChanges,
  type LandingSaveChanges,
} from "@/lib/landing-save-payload";
import { logger } from "@/lib/logger";
import {
  saveLandingSchema,
  type SaveLandingInput,
} from "@/lib/schemas/landing-save";
import {
  isValidPaletteId,
  isValidTextSizePreset,
  isValidTypographyId,
} from "@/lib/site-appearance";
import { warmPublicLanding } from "@/lib/warm-public-landing";

function getPublishedChanges(
  input: Extract<SaveLandingInput, { mode: "publish" }>,
  template: TemplateId,
): LandingSaveChanges {
  const publication = input.publication;
  const sectionPayloads = getLandingSectionPayloads(
    publication.content as unknown as LandingContent,
    template,
  );
  const sections = Object.fromEntries(
    (input.changes.sections ?? []).map((section) => {
      const payload = sectionPayloads[section];
      if (!payload) {
        throw new Error(`Missing published landing section: ${section}`);
      }
      return [section, payload];
    }),
  );

  return {
    ...(input.changes.meta ? { meta: publication.meta } : {}),
    ...(input.changes.seo ? { seo: publication.seo } : {}),
    ...(input.changes.appearance
      ? { appearance: publication.appearance }
      : {}),
    ...(input.changes.heroVariant
      ? { heroVariant: publication.heroVariant }
      : {}),
    ...(input.changes.galleryVariant
      ? { galleryVariant: publication.galleryVariant }
      : {}),
    ...(Object.keys(sections).length > 0 ? { sections } : {}),
  };
}

function revalidateDraftRoutes(landingId: string) {
  revalidatePath(`/preview/${landingId}`);
  revalidatePath(`/preview/${landingId}/carta`);
  revalidatePath(
    `/preview/${landingId}/proyectos/[projectKey]`,
    "page",
  );
  revalidatePath("/editor");
}

function revalidatePublishedRoutes(landingId: string, slugValue: string) {
  const slug = slugValue.replace(/^\//, "");
  revalidatePath(`/${slug}`);
  revalidatePath(`/${slug}/blog`);
  revalidatePath(`/${slug}/about`);
  revalidatePath(`/${slug}/carta`);
  revalidatePath(`/${slug}/book`);
  revalidatePath(`/${slug}/proyectos/[projectSlug]`, "page");
  updateTag(`landing:${landingId}`);
  updateTag(`landing-slug:${slug}`);
  updateTag("public-landings");
  updateTag("public-sitemap");
}

export async function saveLandingAction(
  input: unknown,
): Promise<{ success: true } | { error: string }> {
  const parsed = saveLandingSchema.safeParse(input);
  if (!parsed.success) return { error: "Los datos de la landing no son válidos" };

  const landing = await assertLandingAccess(parsed.data.landingId);
  if (!landing) return { error: "No tienes acceso a esta web" };
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) return { error: "No autorizado" };

  const appearance =
    parsed.data.mode === "publish"
      ? parsed.data.publication.appearance
      : parsed.data.changes.appearance;

  if (
    appearance &&
    !isValidPaletteId(landing.template, appearance.paletteId)
  ) {
    return { error: "La paleta no está disponible para esta plantilla" };
  }
  if (appearance && !isValidTypographyId(appearance.typographyId)) {
    return { error: "La tipografía seleccionada no está disponible" };
  }
  if (appearance && !isValidTextSizePreset(appearance.buttonTextSize)) {
    return { error: "El tamaño de botones seleccionado no está disponible" };
  }
  if (appearance && !isValidTextSizePreset(appearance.chipTextSize)) {
    return { error: "El tamaño de chips seleccionado no está disponible" };
  }
  if (appearance && !isValidTextSizePreset(appearance.titleTextSize)) {
    return { error: "El tamaño de títulos seleccionado no está disponible" };
  }
  if (appearance && !isValidTextSizePreset(appearance.subtitleTextSize)) {
    return { error: "El tamaño de subtítulos seleccionado no está disponible" };
  }
  if (appearance && !isValidTextSizePreset(appearance.contentTextSize)) {
    return { error: "El tamaño de contenido seleccionado no está disponible" };
  }

  try {
    const changes =
      parsed.data.mode === "publish"
        ? getPublishedChanges(parsed.data, landing.template)
        : parsed.data.changes;
    const hasChanges = hasLandingSaveChanges(changes);

    if (parsed.data.mode === "draft" && !hasChanges) {
      return { success: true };
    }

    const sectionWrites = Object.entries(changes.sections ?? {}).map(
      ([section, body]) => {
        const handler = SECTION_REGISTRY[section];
        if (!handler) throw new Error(`Unknown landing section: ${section}`);
        const normalized = handler.parse(
          body as Record<string, unknown>,
          landing,
        );
        return handler.persist(landing.id, normalized);
      },
    );

    if (hasChanges) {
      await Promise.all([
        updateLandingPage(landing.id, {
          ...changes.meta,
          updatedAt: new Date(),
        }),
        ...(changes.seo
          ? [upsertLandingSeo(landing.id, changes.seo)]
          : []),
        ...(changes.appearance
          ? [updateLandingAppearance(landing.id, changes.appearance)]
          : []),
        ...(changes.heroVariant
          ? [
              upsertLandingSectionSelection(
                landing.id,
                "hero",
                changes.heroVariant,
              ),
            ]
          : []),
        ...(changes.galleryVariant
          ? [
              upsertLandingSectionSelection(
                landing.id,
                "gallery",
                changes.galleryVariant,
              ),
            ]
          : []),
        ...sectionWrites,
      ]);
    }

    if (parsed.data.mode === "publish") {
      const snapshot = parsed.data.publication;
      const content = snapshot.content as unknown as LandingContent;
      const publication = await publishLandingVersion({
        landingId: landing.id,
        userId: landing.userId,
        createdBy: clerkUserId,
        template: landing.template,
        name: snapshot.meta.name,
        slug: snapshot.meta.slug,
        content: {
          ...content,
          appearance: snapshot.appearance,
        },
        seo: snapshot.seo,
        sectionSelections: {
          hero: snapshot.heroVariant,
          gallery: snapshot.galleryVariant,
        },
      });

      if (publication.status === "not_found") {
        return { error: "No tienes acceso a esta web" };
      }

      revalidatePublishedRoutes(landing.id, snapshot.meta.slug);
      after(() =>
        warmPublicLanding({
          id: landing.id,
          slug: snapshot.meta.slug,
          customDomain: landing.customDomain,
        }),
      );
    }

    revalidateDraftRoutes(landing.id);
    return { success: true };
  } catch (error) {
    logger.captureException(error, {
      action: "save-landing",
      landingId: landing.id,
      tenantId: landing.userId,
    });
    return {
      error:
        parsed.data.mode === "publish"
          ? "No se pudo publicar la landing"
          : "No se pudieron guardar los cambios",
    };
  }
}
