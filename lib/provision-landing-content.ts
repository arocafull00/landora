import {
  upsertLandingSeo,
  upsertLandingBranding,
  upsertLandingHero,
  upsertLandingStory,
  upsertLandingCta,
  replaceLandingStats,
  replaceLandingWorkflow,
  replaceLandingTestimonials,
  replaceLandingGallery,
  replaceLandingNav,
  replaceLandingTeam,
  replaceLandingServiceMenu,
  replaceLandingBenefits,
} from "@/data/landing-sections";
import { getLandingBySlug } from "@/data/admin";
import { deleteLandingPageById, getLandingPageById, insertLandingPage } from "@/data/landing-pages";
import { ensureLandingHasDefaultContent } from "@/lib/seed-landing-content";
import { DEFAULT_COPYRIGHT_SUFFIX } from "@/lib/copyright-constants";
import {
  flattenProspectServiceMenu,
  type ProspectLandingContent,
} from "@/lib/prospect-content";
import { normalizeNavHref } from "@/lib/template-sections";
import type { TemplateId } from "@/lib/dashboard-data";

async function provisionProspectLandingContent(
  landingId: string,
  template: TemplateId,
  content: ProspectLandingContent
) {
  await Promise.all([
    upsertLandingSeo(landingId, {
      title: content.hero.title,
      description: content.hero.subtitle,
      favicon: "",
      socialImage: "",
    }),
    upsertLandingBranding(landingId, {
      brand: content.brand,
      brandLogoType: "text",
      brandLogoImage: "",
    }),
    upsertLandingHero(landingId, {
      eyebrow: content.hero.eyebrow,
      title: content.hero.title,
      subtitle: content.hero.subtitle,
      description: content.hero.description,
      image: content.hero.image,
      houseImage: "",
      fanImages: [],
      ctaLabel: "",
    }),
    upsertLandingStory(landingId, { statement: content.story.statement }),
    upsertLandingCta(landingId, {
      phone: content.contact.phone,
      email: content.contact.email ?? "",
      address: content.contact.address,
      ctaLabel: "",
      copyrightSuffix: DEFAULT_COPYRIGHT_SUFFIX,
      copyrightExtra: "",
      socialLinks: [],
      whatsappEnabled: false,
    }),
    replaceLandingStats(
      landingId,
      content.stats.map((stat) => ({
        value: stat.value,
        label: stat.label,
        countTo: null,
        suffix: "",
      }))
    ),
    replaceLandingGallery(
      landingId,
      content.gallery.map((item) => ({
        image: item.image,
        video: "",
        title: "",
        description: "",
        tags: "",
        link: "",
        linkType: "none",
        projectSlug: "",
        projectBody: "",
        projectGallery: [],
      }))
    ),
    replaceLandingNav(
      landingId,
      content.nav.map((item) => ({
        label: item.label,
        href: normalizeNavHref(template, item.href),
      }))
    ),
    replaceLandingWorkflow(
      landingId,
      content.workflow.map((step) => ({
        number: step.number,
        title: step.title,
        description: step.description,
      }))
    ),
    replaceLandingTestimonials(
      landingId,
      content.testimonials.map((testimonial) => ({
        author: testimonial.author,
        date: testimonial.date,
        rating: testimonial.rating,
        comment: testimonial.comment,
        verified: testimonial.verified,
      }))
    ),
    replaceLandingBenefits(
      landingId,
      content.benefits.map((benefit) => ({
        title: benefit.title,
        description: benefit.description,
        icon: benefit.icon,
        image: "",
      }))
    ),
    replaceLandingTeam(
      landingId,
      (content.team ?? []).map((member) => ({
        name: member.name,
        role: member.role,
        bio: "",
        image: member.image,
      }))
    ),
    replaceLandingServiceMenu(landingId, flattenProspectServiceMenu(content.serviceMenu)),
  ]);
}

export async function createProspectLanding(params: {
  userId: string;
  name: string;
  slug: string;
  template: TemplateId;
  content: ProspectLandingContent;
}) {
  const { userId, name, slug, template, content } = params;

  const existing = await getLandingBySlug(slug);
  if (existing) {
    throw new Error("Ya existe una landing con ese slug");
  }

  let landingId: string;

  try {
    const landing = await insertLandingPage({
      userId,
      name,
      slug,
      template,
    });
    landingId = landing.id;
  } catch {
    throw new Error("Error al crear la landing");
  }

  try {
    await provisionProspectLandingContent(landingId, template, content);
    const landing = await getLandingPageById(landingId);
    if (!landing) {
      throw new Error("Error al cargar la landing creada");
    }
    await ensureLandingHasDefaultContent(landing);
  } catch (err) {
    await deleteLandingPageById(landingId);
    throw err instanceof Error ? err : new Error("Error al inicializar el contenido de la landing");
  }

  return { landingId, slug };
}
