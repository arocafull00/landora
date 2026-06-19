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
import { getVisibleNav } from "@/lib/template-sections";
import type { TemplateId, LandingContent } from "@/lib/dashboard-data";
import type { LandingWithSections } from "@/data/landing-pages";
import {
  getMissingLandingSections,
  isLandingFullyEmpty,
  type LandingSectionKey,
} from "@/lib/landing-content-gaps";
import {
  mapDefaultBenefits,
  mapDefaultBranding,
  mapDefaultCta,
  mapDefaultFaq,
  mapDefaultGallery,
  mapDefaultHero,
  mapDefaultNav,
  mapDefaultSeo,
  mapDefaultServiceMenu,
  mapDefaultServices,
  mapDefaultSpaces,
  mapDefaultStats,
  mapDefaultStory,
  mapDefaultTeam,
  mapDefaultTestimonials,
  mapDefaultWorkHistory,
  mapDefaultWorkflow,
} from "@/lib/landing-section-mappers";

const FULL_SECTION_KEYS: LandingSectionKey[] = [
  "hero",
  "branding",
  "story",
  "cta",
  "stats",
  "gallery",
  "nav",
  "spaces",
  "services",
  "workflow",
  "testimonials",
  "team",
  "serviceMenu",
  "benefits",
  "faq",
  "workHistory",
];

type ApplySectionDefaultsOptions = {
  templateId: TemplateId;
  hiddenSections: string[];
  includeSeo: boolean;
  useVisibleNav: boolean;
};

async function applySectionDefaults(
  landingId: string,
  sections: LandingSectionKey[],
  content: LandingContent,
  options: ApplySectionDefaultsOptions
) {
  const ops: Promise<unknown>[] = [];
  const { templateId, hiddenSections, includeSeo, useVisibleNav } = options;

  if (includeSeo) {
    ops.push(upsertLandingSeo(landingId, mapDefaultSeo(content)));
  }

  if (sections.includes("hero")) {
    ops.push(upsertLandingHero(landingId, mapDefaultHero(content)));
  }

  if (sections.includes("branding")) {
    ops.push(upsertLandingBranding(landingId, mapDefaultBranding(content, hiddenSections)));
  }

  if (sections.includes("story")) {
    ops.push(upsertLandingStory(landingId, mapDefaultStory(templateId, content)));
  }

  if (sections.includes("cta")) {
    ops.push(upsertLandingCta(landingId, mapDefaultCta(content)));
  }

  if (sections.includes("stats")) {
    ops.push(replaceLandingStats(landingId, mapDefaultStats(content)));
  }

  if (sections.includes("gallery")) {
    ops.push(replaceLandingGallery(landingId, mapDefaultGallery(content)));
  }

  if (sections.includes("nav")) {
    const nav = useVisibleNav
      ? getVisibleNav(content.nav, hiddenSections, templateId)
      : content.nav;
    ops.push(replaceLandingNav(landingId, mapDefaultNav({ ...content, nav })));
  }

  if (sections.includes("spaces")) {
    ops.push(replaceLandingSpaces(landingId, mapDefaultSpaces(content)));
  }

  if (sections.includes("services")) {
    ops.push(replaceLandingServices(landingId, mapDefaultServices(content)));
  }

  if (sections.includes("workflow")) {
    ops.push(replaceLandingWorkflow(landingId, mapDefaultWorkflow(content)));
  }

  if (sections.includes("testimonials")) {
    ops.push(replaceLandingTestimonials(landingId, mapDefaultTestimonials(content)));
  }

  if (sections.includes("team")) {
    ops.push(replaceLandingTeam(landingId, mapDefaultTeam(content)));
  }

  if (sections.includes("serviceMenu")) {
    ops.push(replaceLandingServiceMenu(landingId, mapDefaultServiceMenu(content)));
  }

  if (sections.includes("benefits")) {
    ops.push(replaceLandingBenefits(landingId, mapDefaultBenefits(content)));
  }

  if (sections.includes("faq")) {
    ops.push(replaceLandingFaq(landingId, mapDefaultFaq(content)));
  }

  if (sections.includes("workHistory")) {
    ops.push(replaceLandingWorkHistory(landingId, mapDefaultWorkHistory(content)));
  }

  await Promise.all(ops);
}

export async function seedLandingSections(landingId: string, templateId: TemplateId = "velar") {
  const content = getDefaultContent(templateId) as LandingContent;

  await applySectionDefaults(landingId, FULL_SECTION_KEYS, content, {
    templateId,
    hiddenSections: [],
    includeSeo: true,
    useVisibleNav: false,
  });
}

async function seedMissingLandingSections(landingId: string, landing: LandingWithSections) {
  const missing = getMissingLandingSections(landing);
  if (missing.length === 0) return;

  const content = getDefaultContent(landing.template) as LandingContent;

  await applySectionDefaults(landingId, missing, content, {
    templateId: landing.template,
    hiddenSections: landing.branding?.hiddenSections ?? [],
    includeSeo: false,
    useVisibleNav: true,
  });
}

export async function ensureLandingHasDefaultContent(
  landing: LandingWithSections,
): Promise<LandingWithSections> {
  if (isLandingFullyEmpty(landing)) {
    await seedLandingSections(landing.id, landing.template);
    const refreshed = await getLandingPageById(landing.id);
    if (!refreshed) {
      return landing;
    }
    return refreshed;
  }

  const missing = getMissingLandingSections(landing);
  if (missing.length === 0) {
    return landing;
  }

  await seedMissingLandingSections(landing.id, landing);
  const refreshed = await getLandingPageById(landing.id);
  if (!refreshed) {
    return landing;
  }
  return refreshed;
}
