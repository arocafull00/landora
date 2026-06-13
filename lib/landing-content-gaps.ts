import type { LandingWithSections } from "@/data/landing-pages";
import type { TemplateId } from "@/lib/dashboard-data";
import { getHiddenContentKeys } from "@/lib/template-sections";

export type LandingSectionKey =
  | "hero"
  | "branding"
  | "story"
  | "stats"
  | "gallery"
  | "nav"
  | "spaces"
  | "services"
  | "workflow"
  | "testimonials"
  | "cta"
  | "team"
  | "serviceMenu"
  | "benefits"
  | "workHistory"
  | "faq";

const VELAR_SECTIONS: LandingSectionKey[] = [
  "hero",
  "branding",
  "story",
  "stats",
  "gallery",
  "nav",
  "spaces",
  "services",
  "workflow",
  "testimonials",
  "cta",
];

const STUDIO_SECTIONS: LandingSectionKey[] = [
  "hero",
  "branding",
  "story",
  "stats",
  "gallery",
  "nav",
  "testimonials",
  "cta",
  "team",
  "serviceMenu",
  "benefits",
  "faq",
];

const PORTFOLIO_SECTIONS: LandingSectionKey[] = [
  "hero",
  "branding",
  "story",
  "gallery",
  "nav",
  "testimonials",
  "cta",
  "serviceMenu",
  "benefits",
  "workHistory",
  "faq",
];

const RISTORANTE_SECTIONS: LandingSectionKey[] = [
  "hero",
  "branding",
  "story",
  "stats",
  "gallery",
  "nav",
  "workflow",
  "testimonials",
  "cta",
  "team",
  "serviceMenu",
  "faq",
];

const FLORISTERIA_SECTIONS: LandingSectionKey[] = [
  "hero",
  "branding",
  "story",
  "stats",
  "gallery",
  "nav",
  "testimonials",
  "cta",
  "team",
  "serviceMenu",
  "benefits",
  "faq",
];

const OFICIO_PRO_SECTIONS: LandingSectionKey[] = [
  "hero",
  "branding",
  "story",
  "stats",
  "gallery",
  "nav",
  "testimonials",
  "cta",
  "serviceMenu",
];

function isHeroEmpty(landing: LandingWithSections) {
  return !landing.hero?.title && !landing.hero?.image;
}

function isBrandingEmpty(landing: LandingWithSections) {
  return !landing.branding?.brand;
}

function isStoryEmpty(landing: LandingWithSections) {
  return !landing.story?.statement;
}

function isCtaEmpty(landing: LandingWithSections) {
  return (
    !landing.cta?.phone && !landing.cta?.email && !landing.cta?.address
  );
}

function isSectionEmpty(landing: LandingWithSections, section: LandingSectionKey) {
  if (section === "hero") return isHeroEmpty(landing);
  if (section === "branding") return isBrandingEmpty(landing);
  if (section === "story") return isStoryEmpty(landing);
  if (section === "cta") return isCtaEmpty(landing);
  if (section === "stats") return landing.stats.length === 0;
  if (section === "gallery") return landing.gallery.length === 0;
  if (section === "nav") return landing.nav.length === 0;
  if (section === "spaces") return landing.spaces.length === 0;
  if (section === "services") return landing.services.length === 0;
  if (section === "workflow") return landing.workflow.length === 0;
  if (section === "testimonials") return landing.testimonials.length === 0;
  if (section === "team") return landing.team.length === 0;
  if (section === "serviceMenu") return landing.serviceMenu.length === 0;
  if (section === "benefits") return landing.benefits.length === 0;
  if (section === "faq") return landing.faq.length === 0;
  if (section === "workHistory") return landing.workHistory.length === 0;
  return false;
}

export function getTemplateSectionKeys(template: TemplateId): LandingSectionKey[] {
  if (template === "studio") return STUDIO_SECTIONS;
  if (template === "portfolio") return PORTFOLIO_SECTIONS;
  if (template === "ristorante") return RISTORANTE_SECTIONS;
  if (template === "floristeria") return FLORISTERIA_SECTIONS;
  if (template === "oficio-pro") return OFICIO_PRO_SECTIONS;
  return VELAR_SECTIONS;
}

export function getMissingLandingSections(landing: LandingWithSections) {
  const hiddenKeys = new Set(
    getHiddenContentKeys(landing.branding?.hiddenSections ?? [], landing.template),
  );

  return getTemplateSectionKeys(landing.template).filter((section) => {
    if (hiddenKeys.has(section)) return false;
    return isSectionEmpty(landing, section);
  });
}

export function isLandingFullyEmpty(landing: LandingWithSections) {
  return (
    isHeroEmpty(landing) &&
    landing.stats.length === 0 &&
    landing.spaces.length === 0
  );
}
