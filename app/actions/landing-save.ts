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
import type { LandingContent } from "@/lib/dashboard-data";
import { logger } from "@/lib/logger";
import { saveLandingSchema } from "@/lib/schemas/landing-save";
import {
  isValidPaletteId,
  isValidTypographyId,
} from "@/lib/site-appearance";
import { syncPortfolioAboutNavHrefs } from "@/lib/template-sections";
import { warmPublicLanding } from "@/lib/warm-public-landing";

function getSectionPayloads(content: LandingContent, template: string) {
  const navItems =
    template === "portfolio"
      ? syncPortfolioAboutNavHrefs(content.nav)
      : content.nav;

  return {
    hero: content.hero,
    cta: content.contact,
    branding: {
      brand: content.brand,
      brandLogoType: content.brandLogoType ?? "text",
      brandLogoImage: content.brandLogoImage ?? "",
      sectionHeadings: content.sectionHeadings ?? {},
      hiddenSections: content.hiddenSections ?? [],
      sectionOrder: content.sectionOrder ?? [],
      enabledPages: content.enabledPages,
    },
    stats: { items: content.stats },
    testimonials: { items: content.testimonials },
    nav: { items: navItems },
    ...(content.story ? { story: content.story } : {}),
    ...(content.aboutPage
      ? { "portfolio-about": content.aboutPage }
      : {}),
    ...(content.spaces ? { spaces: { items: content.spaces } } : {}),
    ...(content.services ? { services: { items: content.services } } : {}),
    ...(content.workflow ? { workflow: { items: content.workflow } } : {}),
    ...(content.gallery ? { gallery: { items: content.gallery } } : {}),
    ...(content.team ? { team: { items: content.team } } : {}),
    ...(content.serviceMenu
      ? { "service-menu": { items: content.serviceMenu } }
      : {}),
    ...(content.benefits ? { benefits: { items: content.benefits } } : {}),
    ...(content.faq ? { faq: { items: content.faq } } : {}),
    ...(content.workHistory
      ? { "work-history": { items: content.workHistory } }
      : {}),
    ...(content.offers ? { offers: { items: content.offers } } : {}),
  };
}

function revalidateDraftRoutes(landingId: string) {
  revalidatePath(`/preview/${landingId}`);
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

  if (!isValidPaletteId(landing.template, parsed.data.appearance.paletteId)) {
    return { error: "La paleta no está disponible para esta plantilla" };
  }
  if (!isValidTypographyId(parsed.data.appearance.typographyId)) {
    return { error: "La tipografía seleccionada no está disponible" };
  }

  const content = parsed.data.content as unknown as LandingContent;
  const sectionPayloads = getSectionPayloads(
    content,
    landing.template,
  );

  try {
    const sectionWrites = Object.entries(sectionPayloads).map(
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

    const pagePatch = {
      name: parsed.data.meta.name,
      slug: parsed.data.meta.slug,
      updatedAt: new Date(),
    };

    await Promise.all([
      updateLandingPage(landing.id, pagePatch),
      upsertLandingSeo(landing.id, {
        title: parsed.data.meta.seoTitle,
        description: parsed.data.meta.seoDescription,
        favicon: parsed.data.meta.seoFavicon,
        socialImage: parsed.data.meta.seoSocialImage,
      }),
      updateLandingAppearance(landing.id, parsed.data.appearance),
      upsertLandingSectionSelection(
        landing.id,
        "hero",
        parsed.data.heroVariant,
      ),
      ...sectionWrites,
    ]);

    if (parsed.data.mode === "publish") {
      const publication = await publishLandingVersion({
        landingId: landing.id,
        userId: landing.userId,
        createdBy: clerkUserId,
        template: landing.template,
        name: parsed.data.meta.name,
        slug: parsed.data.meta.slug,
        content: {
          ...content,
          appearance: parsed.data.appearance,
        },
        seo: {
          title: parsed.data.meta.seoTitle,
          description: parsed.data.meta.seoDescription,
          favicon: parsed.data.meta.seoFavicon,
          socialImage: parsed.data.meta.seoSocialImage,
        },
        sectionSelections: {
          hero: parsed.data.heroVariant,
        },
      });

      if (publication.status === "not_found") {
        return { error: "No tienes acceso a esta web" };
      }

      revalidatePublishedRoutes(landing.id, parsed.data.meta.slug);
      after(() =>
        warmPublicLanding({
          id: landing.id,
          slug: parsed.data.meta.slug,
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
