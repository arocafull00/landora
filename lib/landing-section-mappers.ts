import type {
  LandingBenefit,
  LandingFaqItem,
  LandingGalleryItem,
  LandingNavItem,
  LandingService,
  LandingServiceMenuItem,
  LandingSpace,
  LandingStat,
  LandingTeamMember,
  LandingTestimonial,
  LandingWorkflowStep,
  LandingWorkHistoryItem,
} from "@/db/schema";
import type { LandingContent, TemplateContentMap, TemplateId } from "@/lib/dashboard-data";

function getDefaultStoryStatement(templateId: TemplateId, content: LandingContent) {
  if (templateId === "studio" || templateId === "oficio-pro") {
    return (
      (content as TemplateContentMap["studio"] | TemplateContentMap["oficio-pro"]).about
        ?.statement ??
      content.story?.statement ??
      ""
    );
  }
  return content.story?.statement ?? "";
}

export function mapDefaultSeo(content: LandingContent) {
  return { title: content.hero.title, description: content.hero.subtitle };
}

export function mapDefaultBranding(
  content: LandingContent,
  hiddenSections: string[] = []
) {
  return {
    brand: content.brand,
    brandLogoType: content.brandLogoType,
    brandLogoImage: content.brandLogoImage,
    sectionHeadings: (content.sectionHeadings ?? {}) as Record<
      string,
      { title: string; subtitle: string }
    >,
    hiddenSections,
  };
}

export function mapDefaultHero(content: LandingContent) {
  return {
    eyebrow: content.hero.eyebrow,
    title: content.hero.title,
    subtitle: content.hero.subtitle,
    description: content.hero.description,
    image: content.hero.image,
    houseImage: content.hero.houseImage ?? "",
    fanImages: content.hero.fanImages ?? [],
    ctaLabel: content.hero.ctaLabel ?? "",
  };
}

export function mapDefaultStory(templateId: TemplateId, content: LandingContent) {
  return { statement: getDefaultStoryStatement(templateId, content) };
}

export function mapDefaultCta(content: LandingContent) {
  return {
    phone: content.contact.phone,
    email: content.contact.email,
    address: content.contact.address,
    ctaLabel: content.contact.ctaLabel ?? "",
    copyrightSuffix: content.contact.copyrightSuffix ?? "| Todos los derechos reservados",
    copyrightExtra: content.contact.copyrightExtra ?? "",
    socialLinks: content.contact.socialLinks ?? [],
    whatsappEnabled: content.contact.whatsappEnabled ?? false,
  };
}

export function mapDefaultStats(content: LandingContent) {
  return content.stats.map(
    (s): Pick<LandingStat, "value" | "label" | "countTo" | "suffix"> => ({
      value: s.value,
      label: s.label,
      countTo: s.countTo ?? null,
      suffix: s.suffix ?? "",
    })
  );
}

export function mapDefaultGallery(content: LandingContent) {
  return (content.gallery ?? []).map(
    (g): Pick<LandingGalleryItem, "image" | "video" | "title" | "description" | "tags"> => ({
      image: g.image ?? "",
      video: g.video ?? "",
      title: g.title ?? "",
      description: g.description ?? "",
      tags: (g.tags ?? []).join(", "),
    })
  );
}

export function mapDefaultNav(content: LandingContent) {
  return content.nav.map(
    (n): Pick<LandingNavItem, "label" | "href"> => ({
      label: n.label,
      href: n.href,
    })
  );
}

export function mapDefaultSpaces(content: LandingContent) {
  return (content.spaces ?? []).map(
    (s): Pick<LandingSpace, "name" | "description" | "image"> => ({
      name: s.name,
      description: s.description,
      image: s.image,
    })
  );
}

export function mapDefaultServices(content: LandingContent) {
  return (content.services ?? []).map(
    (s): Pick<LandingService, "title" | "subtitle" | "label" | "image"> => ({
      title: s.title,
      subtitle: s.subtitle,
      label: s.label,
      image: s.image,
    })
  );
}

export function mapDefaultWorkflow(content: LandingContent) {
  return (content.workflow ?? []).map(
    (w): Pick<LandingWorkflowStep, "number" | "title" | "description"> => ({
      number: w.number,
      title: w.title,
      description: w.description,
    })
  );
}

export function mapDefaultTestimonials(content: LandingContent) {
  return content.testimonials.map(
    (
      t
    ): Pick<LandingTestimonial, "author" | "date" | "rating" | "comment" | "verified"> => ({
      author: t.author,
      date: t.date,
      rating: t.rating,
      comment: t.comment,
      verified: t.verified,
    })
  );
}

export function mapDefaultTeam(content: LandingContent) {
  return (content.team ?? []).map(
    (t): Pick<LandingTeamMember, "name" | "role" | "bio" | "image"> => ({
      name: t.name,
      role: t.role,
      bio: t.bio,
      image: t.image,
    })
  );
}

export function mapDefaultServiceMenu(content: LandingContent) {
  return (content.serviceMenu ?? []).map(
    (
      s
    ): Pick<
      LandingServiceMenuItem,
      "category" | "name" | "description" | "price" | "duration" | "image"
    > => ({
      category: s.category,
      name: s.name,
      description: s.description,
      price: s.price,
      duration: s.duration ?? "",
      image: s.image ?? "",
    })
  );
}

export function mapDefaultBenefits(content: LandingContent) {
  return (content.benefits ?? []).map(
    (b): Pick<LandingBenefit, "title" | "description" | "icon" | "image"> => ({
      title: b.title,
      description: b.description,
      icon: b.icon,
      image: b.image ?? "",
    })
  );
}

export function mapDefaultFaq(content: LandingContent) {
  return (content.faq ?? []).map(
    (f): Pick<LandingFaqItem, "question" | "answer"> => ({
      question: f.question,
      answer: f.answer,
    })
  );
}

export function mapDefaultWorkHistory(content: LandingContent) {
  return (content.workHistory ?? []).map(
    (
      item
    ): Pick<
      LandingWorkHistoryItem,
      | "dateRange"
      | "location"
      | "company"
      | "title"
      | "summary"
      | "highlights"
      | "technologies"
    > => ({
      dateRange: item.dateRange,
      location: item.location,
      company: item.company,
      title: item.title,
      summary: item.summary,
      highlights: item.highlights.join("\n"),
      technologies: item.technologies.join(","),
    })
  );
}
