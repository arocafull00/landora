import { db } from "@/db";
import {
  landingBranding,
  landingCta,
  landingFaq,
  landingGallery,
  landingHero,
  landingNav,
  landingBenefits,
  landingSeo,
  landingServices,
  landingSpaces,
  landingStats,
  landingStory,
  landingTestimonials,
  landingWorkflow,
} from "@/db/schema";
import { VELAR_DEFAULT_CONTENT, TOLL_STORY_DEFAULT_CONTENT } from "@/lib/default-content";
import type { TemplateId } from "@/lib/template-registry";

export async function seedLandingSections(landingId: string, template: TemplateId) {
  const c = template === "velar" ? VELAR_DEFAULT_CONTENT : TOLL_STORY_DEFAULT_CONTENT;

  await db.transaction(async (tx) => {
    await tx.insert(landingSeo).values({ landingId, title: c.hero.title, description: c.hero.subtitle });
    await tx.insert(landingBranding).values({ landingId, brand: c.brand });
    await tx.insert(landingHero).values({
      landingId,
      eyebrow: c.hero.eyebrow,
      title: c.hero.title,
      subtitle: c.hero.subtitle,
      description: c.hero.description,
      image: c.hero.image,
      houseImage: c.hero.houseImage,
    });
    await tx.insert(landingStory).values({ landingId, statement: c.story.statement });
    await tx.insert(landingCta).values({
      landingId,
      phone: c.contact.phone,
      email: c.contact.email,
      address: c.contact.address,
    });

    if (c.stats.length > 0) {
      await tx.insert(landingStats).values(
        c.stats.map((s, i) => ({
          landingId,
          sortOrder: i,
          value: s.value,
          label: s.label,
          countTo: s.countTo ?? null,
          suffix: s.suffix ?? "",
        }))
      );
    }

    if (c.gallery.length > 0) {
      await tx.insert(landingGallery).values(
        c.gallery.map((g, i) => ({ landingId, sortOrder: i, video: g.video }))
      );
    }

    if (c.nav.length > 0) {
      await tx.insert(landingNav).values(
        c.nav.map((n, i) => ({ landingId, sortOrder: i, label: n.label, href: n.href }))
      );
    }

    if (c.spaces.length > 0) {
      await tx.insert(landingSpaces).values(
        c.spaces.map((s, i) => ({
          landingId,
          sortOrder: i,
          name: s.name,
          description: s.description,
          image: s.image,
        }))
      );
    }

    if (c.services.length > 0) {
      await tx.insert(landingServices).values(
        c.services.map((s, i) => ({
          landingId,
          sortOrder: i,
          title: s.title,
          subtitle: s.subtitle,
          label: s.label,
          image: s.image,
        }))
      );
    }

    if (c.workflow.length > 0) {
      await tx.insert(landingWorkflow).values(
        c.workflow.map((w, i) => ({
          landingId,
          sortOrder: i,
          number: w.number,
          title: w.title,
          description: w.description,
        }))
      );
    }

    if (c.testimonials.length > 0) {
      await tx.insert(landingTestimonials).values(
        c.testimonials.map((t, i) => ({
          landingId,
          sortOrder: i,
          author: t.author,
          date: t.date,
          rating: t.rating,
          comment: t.comment,
          verified: t.verified,
        }))
      );
    }

  });
}
