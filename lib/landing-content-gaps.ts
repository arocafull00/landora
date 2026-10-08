import type { LandingWithSections } from "@/data/landing-pages";
import { getRequiredTemplate } from "@/lib/template-registry";
import { getHiddenContentKeys } from "@/lib/template-sections";

export type LandingSectionKey =
  | "nuvolets"
  | "hero"
  | "branding"
  | "story"
  | "portfolioAbout"
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
  if (section === "nuvolets") return !landing.nuvolets;
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

export function getMissingLandingSections(landing: LandingWithSections) {
  if (landing.template === "nuvolets" && landing.nuvolets) return [];
  const hiddenKeys = new Set(
    getHiddenContentKeys(landing.branding?.hiddenSections ?? [], landing.template),
  );

  return getRequiredTemplate(landing.template).storageSections.filter((section) => {
    if (hiddenKeys.has(section)) return false;
    return isSectionEmpty(landing, section);
  });
}

export function isLandingFullyEmpty(landing: LandingWithSections) {
  if (landing.template === "nuvolets") return !landing.nuvolets && !landing.branding;
  return (
    isHeroEmpty(landing) &&
    landing.stats.length === 0 &&
    landing.spaces.length === 0
  );
}
