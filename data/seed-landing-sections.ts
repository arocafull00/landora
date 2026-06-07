import { getLandingPageById } from "@/data/landing-pages";
import {
  upsertLandingSeo,
  upsertLandingBranding,
  upsertLandingHero,
  upsertLandingStory,
  upsertLandingCta,
  replaceLandingStats,
  replaceLandingSpaces,
  replaceLandingServices,
  replaceLandingWorkflow,
  replaceLandingTestimonials,
  replaceLandingGallery,
  replaceLandingNav,
  replaceLandingTeam,
  replaceLandingServiceMenu,
  replaceLandingBenefits,
  replaceLandingFaq,
} from "@/data/landing-sections";
import { getDefaultContent } from "@/lib/default-content";
import type { TemplateId, LandingContent } from "@/lib/dashboard-data";
export async function seedLandingSections(landingId: string, templateId: TemplateId = "velar") {
  const c = getDefaultContent(templateId) as LandingContent;

  await Promise.all([
    upsertLandingSeo(landingId, { title: c.hero.title, description: c.hero.subtitle }),
    upsertLandingBranding(landingId, { brand: c.brand }),
    upsertLandingHero(landingId, {
      eyebrow: c.hero.eyebrow,
      title: c.hero.title,
      subtitle: c.hero.subtitle,
      description: c.hero.description,
      image: c.hero.image,
      houseImage: c.hero.houseImage ?? "",
    }),
    upsertLandingStory(landingId, { statement: c.story?.statement ?? "" }),
    upsertLandingCta(landingId, {
      phone: c.contact.phone,
      email: c.contact.email,
      address: c.contact.address,
    }),
    replaceLandingStats(
      landingId,
      c.stats.map((s) => ({
        value: s.value,
        label: s.label,
        countTo: s.countTo ?? null,
        suffix: s.suffix ?? "",
      }))
    ),
    replaceLandingGallery(
      landingId,
      (c.gallery ?? []).map((g) => ({ image: g.image ?? "", video: g.video ?? "" }))
    ),
    replaceLandingNav(landingId, c.nav.map((n) => ({ label: n.label, href: n.href }))),
    replaceLandingSpaces(
      landingId,
      (c.spaces ?? []).map((s) => ({ name: s.name, description: s.description, image: s.image }))
    ),
    replaceLandingServices(
      landingId,
      (c.services ?? []).map((s) => ({
        title: s.title,
        subtitle: s.subtitle,
        label: s.label,
        image: s.image,
      }))
    ),
    replaceLandingWorkflow(
      landingId,
      (c.workflow ?? []).map((w) => ({ number: w.number, title: w.title, description: w.description }))
    ),
    replaceLandingTestimonials(
      landingId,
      c.testimonials.map((t) => ({
        author: t.author,
        date: t.date,
        rating: t.rating,
        comment: t.comment,
        verified: t.verified,
      }))
    ),
    replaceLandingTeam(
      landingId,
      (c.team ?? []).map((t) => ({ name: t.name, role: t.role, bio: t.bio, image: t.image }))
    ),
    replaceLandingServiceMenu(
      landingId,
      (c.serviceMenu ?? []).map((s) => ({
        category: s.category,
        name: s.name,
        description: s.description,
        price: s.price,
        duration: s.duration ?? "",
        image: s.image ?? "",
      }))
    ),
    replaceLandingBenefits(
      landingId,
      (c.benefits ?? []).map((b) => ({
        title: b.title,
        description: b.description,
        icon: b.icon,
        image: b.image ?? "",
      }))
    ),
    replaceLandingFaq(
      landingId,
      (c.faq ?? []).map((f) => ({ question: f.question, answer: f.answer }))
    ),
  ]);
}

export async function ensureLandingHasDefaultContent(landingId: string) {
  const landing = await getLandingPageById(landingId);
  if (!landing) return;

  const isEmpty =
    !landing.hero?.title &&
    !landing.hero?.image &&
    landing.stats.length === 0 &&
    landing.spaces.length === 0;

  if (!isEmpty) return;

  await seedLandingSections(landingId, landing.template);
}
