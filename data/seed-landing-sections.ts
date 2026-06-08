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
  replaceLandingWorkHistory,
} from "@/data/landing-sections";
import { getDefaultContent } from "@/lib/default-content";
import type { TemplateId, LandingContent, TemplateContentMap } from "@/lib/dashboard-data";
import type { LandingWithSections } from "@/data/landing-pages";
import {
  getMissingLandingSections,
  isLandingFullyEmpty,
} from "@/lib/landing-content-gaps";

function getDefaultStoryStatement(templateId: TemplateId, content: LandingContent) {
  if (templateId === "studio") {
    return (content as TemplateContentMap["studio"]).about?.statement ?? content.story?.statement ?? "";
  }
  return content.story?.statement ?? "";
}

export async function seedLandingSections(landingId: string, templateId: TemplateId = "velar") {
  const c = getDefaultContent(templateId) as LandingContent;

  await Promise.all([
    upsertLandingSeo(landingId, { title: c.hero.title, description: c.hero.subtitle }),
    upsertLandingBranding(landingId, {
      brand: c.brand,
      sectionHeadings: (c.sectionHeadings ?? {}) as Record<string, { title: string; subtitle: string }>,
    }),
    upsertLandingHero(landingId, {
      eyebrow: c.hero.eyebrow,
      title: c.hero.title,
      subtitle: c.hero.subtitle,
      description: c.hero.description,
      image: c.hero.image,
      houseImage: c.hero.houseImage ?? "",
    }),
    upsertLandingStory(landingId, { statement: getDefaultStoryStatement(templateId, c) }),
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
    replaceLandingWorkHistory(
      landingId,
      (c.workHistory ?? []).map((item) => ({
        dateRange: item.dateRange,
        location: item.location,
        company: item.company,
        title: item.title,
        summary: item.summary,
        highlights: item.highlights.join("\n"),
        technologies: item.technologies.join(","),
      }))
    ),
  ]);
}

async function seedMissingLandingSections(
  landingId: string,
  landing: LandingWithSections
) {
  const missing = getMissingLandingSections(landing);
  if (missing.length === 0) return;

  const c = getDefaultContent(landing.template) as LandingContent;
  const ops: Promise<unknown>[] = [];

  if (missing.includes("hero")) {
    ops.push(
      upsertLandingHero(landingId, {
        eyebrow: c.hero.eyebrow,
        title: c.hero.title,
        subtitle: c.hero.subtitle,
        description: c.hero.description,
        image: c.hero.image,
        houseImage: c.hero.houseImage ?? "",
      })
    );
  }

  if (missing.includes("branding")) {
    ops.push(
      upsertLandingBranding(landingId, {
        brand: c.brand,
        sectionHeadings: (c.sectionHeadings ?? {}) as Record<string, { title: string; subtitle: string }>,
      }),
    );
  }

  if (missing.includes("story")) {
    ops.push(
      upsertLandingStory(landingId, {
        statement: getDefaultStoryStatement(landing.template, c),
      })
    );
  }

  if (missing.includes("cta")) {
    ops.push(
      upsertLandingCta(landingId, {
        phone: c.contact.phone,
        email: c.contact.email,
        address: c.contact.address,
      })
    );
  }

  if (missing.includes("stats")) {
    ops.push(
      replaceLandingStats(
        landingId,
        c.stats.map((s) => ({
          value: s.value,
          label: s.label,
          countTo: s.countTo ?? null,
          suffix: s.suffix ?? "",
        }))
      )
    );
  }

  if (missing.includes("gallery")) {
    ops.push(
      replaceLandingGallery(
        landingId,
        (c.gallery ?? []).map((g) => ({ image: g.image ?? "", video: g.video ?? "" }))
      )
    );
  }

  if (missing.includes("nav")) {
    ops.push(
      replaceLandingNav(landingId, c.nav.map((n) => ({ label: n.label, href: n.href })))
    );
  }

  if (missing.includes("spaces")) {
    ops.push(
      replaceLandingSpaces(
        landingId,
        (c.spaces ?? []).map((s) => ({
          name: s.name,
          description: s.description,
          image: s.image,
        }))
      )
    );
  }

  if (missing.includes("services")) {
    ops.push(
      replaceLandingServices(
        landingId,
        (c.services ?? []).map((s) => ({
          title: s.title,
          subtitle: s.subtitle,
          label: s.label,
          image: s.image,
        }))
      )
    );
  }

  if (missing.includes("workflow")) {
    ops.push(
      replaceLandingWorkflow(
        landingId,
        (c.workflow ?? []).map((w) => ({
          number: w.number,
          title: w.title,
          description: w.description,
        }))
      )
    );
  }

  if (missing.includes("testimonials")) {
    ops.push(
      replaceLandingTestimonials(
        landingId,
        c.testimonials.map((t) => ({
          author: t.author,
          date: t.date,
          rating: t.rating,
          comment: t.comment,
          verified: t.verified,
        }))
      )
    );
  }

  if (missing.includes("team")) {
    ops.push(
      replaceLandingTeam(
        landingId,
        (c.team ?? []).map((t) => ({
          name: t.name,
          role: t.role,
          bio: t.bio,
          image: t.image,
        }))
      )
    );
  }

  if (missing.includes("serviceMenu")) {
    ops.push(
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
      )
    );
  }

  if (missing.includes("benefits")) {
    ops.push(
      replaceLandingBenefits(
        landingId,
        (c.benefits ?? []).map((b) => ({
          title: b.title,
          description: b.description,
          icon: b.icon,
          image: b.image ?? "",
        }))
      )
    );
  }

  if (missing.includes("faq")) {
    ops.push(
      replaceLandingFaq(
        landingId,
        (c.faq ?? []).map((f) => ({ question: f.question, answer: f.answer }))
      )
    );
  }

  if (missing.includes("workHistory")) {
    ops.push(
      replaceLandingWorkHistory(
        landingId,
        (c.workHistory ?? []).map((item) => ({
          dateRange: item.dateRange,
          location: item.location,
          company: item.company,
          title: item.title,
          summary: item.summary,
          highlights: item.highlights.join("\n"),
          technologies: item.technologies.join(","),
        }))
      )
    );
  }

  await Promise.all(ops);
}

export async function ensureLandingHasDefaultContent(landingId: string) {
  const landing = await getLandingPageById(landingId);
  if (!landing) return;

  if (isLandingFullyEmpty(landing)) {
    await seedLandingSections(landingId, landing.template);
    return;
  }

  await seedMissingLandingSections(landingId, landing);
}
