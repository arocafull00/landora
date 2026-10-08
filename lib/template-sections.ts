import { getRequiredTemplate } from "@/lib/template-registry";
import type { TemplateSectionDef } from "@/lib/templates/types";
import type { LandingContent, NavLink, TemplateId } from "@/lib/dashboard-data";
import type { LandingSectionKey } from "@/lib/landing-content-gaps";
import { isSitePageEnabled } from "@/lib/site-pages";

export type NavScrollTarget = {
  anchor: string;
  href: string;
  label: string;
};

export function getSectionScrollHref(section: TemplateSectionDef): string {
  return section.navHref ?? `#${section.anchor}`;
}

const BLOG_NAV_ANCHOR = "__blog__";
const ABOUT_NAV_ANCHOR = "__about__";

function getBlogNavHref(): string {
  return "/blog";
}

export function isBlogNavHref(href: string): boolean {
  return /^\/(?:[^/]+\/)?blog\/?$/.test(href.trim());
}

function remapBlogNavHref(href: string): string {
  if (!isBlogNavHref(href)) return href;
  return getBlogNavHref();
}

export function syncBlogNavHrefs(nav: NavLink[]): NavLink[] {
  const blogHref = getBlogNavHref();
  return nav.map((item) => {
    if (!isBlogNavHref(item.href)) return item;
    if (item.href === blogHref) return item;
    return { ...item, href: blogHref };
  });
}

function getBlogNavTarget(): NavScrollTarget {
  return {
    anchor: BLOG_NAV_ANCHOR,
    href: getBlogNavHref(),
    label: "Blog",
  };
}

export function getAboutNavHref(): string {
  return "/about";
}

export function isPortfolioAboutNavHref(href: string): boolean {
  return /^\/(?:[^/]+\/)?about\/?$/.test(href.trim());
}

export function remapPortfolioAboutNavHref(
  href: string,
): string {
  if (!isPortfolioAboutNavHref(href)) return href;
  return getAboutNavHref();
}

export function syncPortfolioAboutNavHrefs(
  nav: NavLink[],
): NavLink[] {
  const aboutHref = getAboutNavHref();
  return nav.map((item) => {
    if (!isPortfolioAboutNavHref(item.href)) return item;
    if (item.href === aboutHref) return item;
    return { ...item, href: aboutHref };
  });
}

function getAboutNavTarget(): NavScrollTarget {
  return {
    anchor: ABOUT_NAV_ANCHOR,
    href: getAboutNavHref(),
    label: "About me",
  };
}

export function getNavScrollTargets(
  templateId: TemplateId,
  landingSlug?: string,
  sectionOrder?: string[],
  enabledPages?: readonly string[],
): NavScrollTarget[] {
  const targets: NavScrollTarget[] = [];

  for (const section of getOrderedTemplateSections(templateId, sectionOrder)) {
    if (section.anchor === "hero") continue;
    targets.push({
      anchor: section.anchor,
      href: getSectionScrollHref(section),
      label: section.label,
    });
  }

  if (!landingSlug) return targets;

  if (
    templateId === "portfolio" &&
    isSitePageEnabled(enabledPages, "about")
  ) {
    targets.push(getAboutNavTarget());
  }

  return [...targets, getBlogNavTarget()];
}

export function getVisibleNavScrollTargets(
  templateId: TemplateId,
  hiddenSections: string[] | undefined,
  landingSlug?: string,
  sectionOrder?: string[],
  enabledPages?: readonly string[],
): NavScrollTarget[] {
  const hidden = new Set(hiddenSections ?? []);
  return getNavScrollTargets(
    templateId,
    landingSlug,
    sectionOrder,
    enabledPages,
  ).filter(
    (target) =>
      target.anchor === BLOG_NAV_ANCHOR ||
      target.anchor === ABOUT_NAV_ANCHOR ||
      !hidden.has(target.anchor),
  );
}

const LEGACY_NAV_ALIASES: Partial<Record<TemplateId, Record<string, string>>> = {
  velar: {
    home: "hero",
    gallery: "listings",
    contact: "inquire",
  },
  studio: {
    home: "hero",
    services: "servicios",
    gallery: "galeria",
    team: "equipo",
    reviews: "testimonios",
    contact: "contacto",
  },
  portfolio: {
    home: "hero",
    gallery: "proyectos",
    projects: "proyectos",
    experience: "experiencia",
    services: "servicios",
    reviews: "testimonios",
    contact: "contacto",
  },
  floristeria: {
    home: "hero",
    services: "servicios",
    gallery: "galeria",
    reviews: "testimonios",
    contact: "contacto",
  },
  "oficio-pro": {
    home: "hero",
    services: "servicios",
    installations: "instalaciones",
    reviews: "testimonios",
    experience: "experiencia",
    contact: "contacto",
  },
  "coffee-shop": {
    home: "hero",
    menu: "carta",
    gallery: "galeria",
    hours: "horarios",
    reviews: "testimonios",
    contact: "contacto",
  },
  signal: {
    home: "hero",
    capabilities: "capacidades",
    access: "indice",
    contact: "contacto",
  },
  "pallet-ross": {
    home: "hero",
    ecommerce: "ecommerce",
    class: "class",
    contact: "contacto",
  },
};

export function normalizeNavHref(templateId: TemplateId, href: string): string {
  if (!href.startsWith("#")) {
    return remapBlogNavHref(href);
  }

  const sections = getTemplateSections(templateId);
  const validHrefs = new Set(sections.map(getSectionScrollHref));
  if (validHrefs.has(href)) return href;

  const slug = decodeURIComponent(href.slice(1));
  const alias = LEGACY_NAV_ALIASES[templateId]?.[slug];
  if (alias) {
    const section = sections.find((item) => item.anchor === alias);
    if (section) return getSectionScrollHref(section);
    return `#${alias}`;
  }

  const byAnchor = sections.find((item) => item.anchor === slug);
  if (byAnchor) return getSectionScrollHref(byAnchor);

  return href;
}

export function resolveSectionId(templateId: TemplateId, sectionIdOrHref: string): string {
  const href = sectionIdOrHref.startsWith("#")
    ? sectionIdOrHref
    : `#${sectionIdOrHref}`;
  return normalizeNavHref(templateId, href).slice(1);
}

export function getTemplateSections(templateId: TemplateId): TemplateSectionDef[] {
  return getRequiredTemplate(templateId).sections;
}

function splitTemplateSections(sections: TemplateSectionDef[]) {
  const startRequired = sections.filter((section) => section.required && section.anchor === "hero");
  const endRequired = sections.filter((section) => section.required && section.anchor !== "hero");
  const middle = sections.filter((section) => !section.required);
  return { startRequired, middle, endRequired };
}

function orderMiddleSections(
  middle: TemplateSectionDef[],
  sectionOrder: string[] | undefined,
): TemplateSectionDef[] {
  const middleByAnchor = new Map(middle.map((section) => [section.anchor, section]));
  const defaultOrder = middle.map((section) => section.anchor);
  const order = sectionOrder?.length ? sectionOrder : defaultOrder;
  const result: TemplateSectionDef[] = [];
  const seen = new Set<string>();

  for (const anchor of order) {
    const section = middleByAnchor.get(anchor);
    if (!section) continue;
    result.push(section);
    seen.add(anchor);
  }

  for (const section of middle) {
    if (seen.has(section.anchor)) continue;
    result.push(section);
  }

  return result;
}

export function getOrderedTemplateSections(
  templateId: TemplateId,
  sectionOrder?: string[],
): TemplateSectionDef[] {
  const sections = getTemplateSections(templateId);
  const { startRequired, middle, endRequired } = splitTemplateSections(sections);
  const orderedMiddle = orderMiddleSections(middle, sectionOrder);
  return [...startRequired, ...orderedMiddle, ...endRequired];
}

export function getOrderedRemovableSections(
  templateId: TemplateId,
  sectionOrder?: string[],
): TemplateSectionDef[] {
  return getOrderedTemplateSections(templateId, sectionOrder).filter((section) => !section.required);
}

export function getOrderedRemovableSectionAnchors(
  templateId: TemplateId,
  sectionOrder?: string[],
): string[] {
  return getOrderedRemovableSections(templateId, sectionOrder).map((section) => section.anchor);
}

export function getSectionByAnchor(templateId: TemplateId, anchor: string): TemplateSectionDef | undefined {
  return getTemplateSections(templateId).find((section) => section.anchor === anchor);
}

export function isSectionVisible(content: LandingContent, anchor: string): boolean {
  const hidden = content.hiddenSections ?? [];
  return !hidden.includes(anchor);
}

export function getOrderedVisibleBodySections(
  templateId: TemplateId,
  content: LandingContent,
): TemplateSectionDef[] {
  return getOrderedTemplateSections(templateId, content.sectionOrder).filter(
    (section) =>
      !section.required &&
      !section.separatePage &&
      isSectionVisible(content, section.anchor),
  );
}

export function getVisibleNav(
  nav: NavLink[],
  hiddenSections: string[] | undefined,
  templateId: TemplateId,
): NavLink[] {
  const hidden = new Set(hiddenSections ?? []);
  const hiddenHrefs = new Set<string>();

  for (const section of getTemplateSections(templateId)) {
    if (!hidden.has(section.anchor)) continue;
    hiddenHrefs.add(getSectionScrollHref(section));
  }

  const visibleNav: NavLink[] = [];

  for (const item of nav) {
    const href = normalizeNavHref(templateId, item.href);
    if (hiddenHrefs.has(href)) continue;
    visibleNav.push({ ...item, href });
  }

  return visibleNav;
}

export function getHiddenContentKeys(
  hiddenSections: string[] | undefined,
  templateId: TemplateId,
): LandingSectionKey[] {
  const hidden = new Set(hiddenSections ?? []);
  const keys = new Set<LandingSectionKey>();

  for (const section of getTemplateSections(templateId)) {
    if (!hidden.has(section.anchor) || !section.contentKeys) continue;
    for (const key of section.contentKeys) {
      keys.add(key);
    }
  }

  return [...keys];
}

export function restoreNavItem(nav: NavLink[], defaults: NavLink[], href: string): NavLink[] {
  if (nav.some((item) => item.href === href)) return nav;

  const defaultItem = defaults.find((item) => item.href === href);
  if (!defaultItem) return nav;

  const defaultIndex = defaults.findIndex((item) => item.href === href);
  const beforeHrefs = new Set(defaults.slice(0, defaultIndex).map((item) => item.href));
  let insertAt = 0;

  for (const item of nav) {
    if (beforeHrefs.has(item.href)) insertAt++;
  }

  const result = [...nav];
  result.splice(insertAt, 0, defaultItem);
  return result;
}

export function getRemovableSections(templateId: TemplateId): TemplateSectionDef[] {
  return getTemplateSections(templateId).filter((section) => !section.required);
}

export function getEditorScrollTarget(
  templateId: TemplateId,
  editorTabId: string,
): string | undefined {
  const section = getTemplateSections(templateId).find(
    (item) => item.editorTabId === editorTabId,
  );
  if (!section) return undefined;
  return getSectionScrollHref(section).slice(1);
}
