import type { LandingContent, NavLink, TemplateId } from "@/lib/dashboard-data";
import type { LandingSectionKey } from "@/lib/landing-content-gaps";
import { ADMIN_EDITOR_TAB, getTemplate } from "@/lib/template-registry";
import type { EditorTab } from "@/lib/template-registry";

export type TemplateSectionDef = {
  anchor: string;
  label: string;
  editorTabId?: string;
  navHref?: string;
  required?: boolean;
  contentKeys?: LandingSectionKey[];
};

export type NavScrollTarget = {
  anchor: string;
  href: string;
  label: string;
};

export function getSectionScrollHref(section: TemplateSectionDef): string {
  return section.navHref ?? `#${section.anchor}`;
}

export function getNavScrollTargets(templateId: TemplateId): NavScrollTarget[] {
  return getTemplateSections(templateId)
    .filter((section) => section.anchor !== "hero")
    .map((section) => ({
      anchor: section.anchor,
      href: getSectionScrollHref(section),
      label: section.label,
    }));
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
  ristorante: {
    home: "hero",
    menu: "carta",
    gallery: "galeria",
    team: "equipo",
    hours: "horarios",
    reviews: "testimonios",
    contact: "contacto",
  },
  floristeria: {
    home: "hero",
    services: "servicios",
    gallery: "galeria",
    team: "equipo",
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
};

export function normalizeNavHref(templateId: TemplateId, href: string): string {
  if (!href.startsWith("#")) return href;

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

const VELAR_SECTIONS: TemplateSectionDef[] = [
  { anchor: "hero", label: "Hero", editorTabId: "Hero", required: true },
  { anchor: "story", label: "Historia", editorTabId: "Historia", navHref: "#story", contentKeys: ["story", "stats"] },
  { anchor: "listings", label: "Galería", editorTabId: "Galería", navHref: "#listings", contentKeys: ["gallery"] },
  { anchor: "residences", label: "Espacios", editorTabId: "Espacios", navHref: "#residences", contentKeys: ["spaces"] },
  { anchor: "servicios", label: "Servicios", editorTabId: "Servicios", navHref: "#servicios", contentKeys: ["services"] },
  { anchor: "proceso", label: "Proceso", editorTabId: "Proceso", navHref: "#proceso", contentKeys: ["workflow"] },
  { anchor: "testimonios", label: "Testimonios", editorTabId: "Testimonios", navHref: "#testimonios", contentKeys: ["testimonials"] },
  { anchor: "inquire", label: "Pie de página", editorTabId: "Footer", navHref: "#inquire", required: true },
];

const STUDIO_SECTIONS: TemplateSectionDef[] = [
  { anchor: "hero", label: "Hero", editorTabId: "Hero", required: true },
  { anchor: "story", label: "Historia", editorTabId: "Historia", navHref: "#story", contentKeys: ["story", "stats"] },
  { anchor: "servicios", label: "Servicios", editorTabId: "Servicios", navHref: "#servicios", contentKeys: ["serviceMenu"] },
  { anchor: "equipo", label: "Equipo", editorTabId: "Equipo", navHref: "#equipo", contentKeys: ["team"] },
  { anchor: "galeria", label: "Galería", editorTabId: "Galeria", navHref: "#galeria", contentKeys: ["gallery"] },
  { anchor: "testimonios", label: "Testimonios", navHref: "#testimonios", contentKeys: ["testimonials"] },
  { anchor: "faq", label: "FAQ", editorTabId: "FAQ", navHref: "#faq", contentKeys: ["faq"] },
  { anchor: "contacto", label: "Pie de página", editorTabId: "Footer", navHref: "#contacto", required: true },
];

const PORTFOLIO_SECTIONS: TemplateSectionDef[] = [
  { anchor: "hero", label: "Hero", editorTabId: "Hero", required: true },
  { anchor: "story", label: "Historia", navHref: "#story", contentKeys: ["story"] },
  { anchor: "experiencia", label: "Experiencia", editorTabId: "Experiencia", navHref: "#experiencia", contentKeys: ["workHistory"] },
  { anchor: "proyectos", label: "Proyectos", editorTabId: "Proyectos", navHref: "#proyectos", contentKeys: ["gallery"] },
  { anchor: "skills", label: "Habilidades", navHref: "#skills", contentKeys: ["benefits"] },
  { anchor: "servicios", label: "Servicios", editorTabId: "Servicios", navHref: "#servicios", contentKeys: ["serviceMenu"] },
  { anchor: "testimonios", label: "Testimonios", navHref: "#testimonios", contentKeys: ["testimonials"] },
  { anchor: "faq", label: "FAQ", editorTabId: "FAQ", navHref: "#faq", contentKeys: ["faq"] },
  { anchor: "contacto", label: "Pie de página", editorTabId: "Footer", navHref: "#contacto", required: true },
];

const RISTORANTE_SECTIONS: TemplateSectionDef[] = [
  { anchor: "hero", label: "Hero", editorTabId: "Hero", required: true },
  { anchor: "story", label: "Historia", navHref: "#story", contentKeys: ["story", "stats"] },
  { anchor: "carta", label: "Carta", editorTabId: "Carta", navHref: "#carta", contentKeys: ["serviceMenu"] },
  { anchor: "galeria", label: "Galería", editorTabId: "Galeria", navHref: "#galeria", contentKeys: ["gallery"] },
  { anchor: "equipo", label: "Equipo", editorTabId: "Equipo", navHref: "#equipo", contentKeys: ["team"] },
  { anchor: "horarios", label: "Horarios", editorTabId: "Horarios", navHref: "#horarios", contentKeys: ["workflow"] },
  { anchor: "testimonios", label: "Testimonios", navHref: "#testimonios", contentKeys: ["testimonials"] },
  { anchor: "faq", label: "FAQ", editorTabId: "FAQ", navHref: "#faq", contentKeys: ["faq"] },
  { anchor: "contacto", label: "Pie de página", editorTabId: "Footer", navHref: "#contacto", required: true },
];

const FLORISTERIA_SECTIONS: TemplateSectionDef[] = [
  { anchor: "hero", label: "Hero", editorTabId: "Hero", required: true },
  { anchor: "story", label: "Historia", navHref: "#story", contentKeys: ["story", "stats"] },
  { anchor: "servicios", label: "Servicios", editorTabId: "Servicios", navHref: "#servicios", contentKeys: ["serviceMenu"] },
  { anchor: "galeria", label: "Galería", editorTabId: "Galeria", navHref: "#galeria", contentKeys: ["gallery"] },
  { anchor: "equipo", label: "Equipo", editorTabId: "Equipo", navHref: "#equipo", contentKeys: ["team"] },
  { anchor: "testimonios", label: "Testimonios", navHref: "#testimonios", contentKeys: ["testimonials"] },
  { anchor: "faq", label: "FAQ", editorTabId: "FAQ", navHref: "#faq", contentKeys: ["faq"] },
  { anchor: "contacto", label: "Pie de página", editorTabId: "Footer", navHref: "#contacto", required: true },
];

const OFICIO_PRO_SECTIONS: TemplateSectionDef[] = [
  { anchor: "hero", label: "Hero", editorTabId: "Hero", required: true },
  { anchor: "servicios", label: "Servicios", editorTabId: "Servicios", navHref: "#servicios" },
  { anchor: "instalaciones", label: "Instalaciones", editorTabId: "Instalaciones", navHref: "#instalaciones" },
  { anchor: "testimonios", label: "Testimonios", editorTabId: "Testimonios", navHref: "#testimonios", contentKeys: ["testimonials"] },
  { anchor: "experiencia", label: "Experiencia", editorTabId: "Experiencia", navHref: "#experiencia", contentKeys: ["stats", "story"] },
  { anchor: "contacto", label: "Pie de página", editorTabId: "Footer", navHref: "#contacto", required: true },
];

const TEMPLATE_SECTIONS: Record<TemplateId, TemplateSectionDef[]> = {
  velar: VELAR_SECTIONS,
  studio: STUDIO_SECTIONS,
  portfolio: PORTFOLIO_SECTIONS,
  ristorante: RISTORANTE_SECTIONS,
  floristeria: FLORISTERIA_SECTIONS,
  "oficio-pro": OFICIO_PRO_SECTIONS,
};

export function getTemplateSections(templateId: TemplateId): TemplateSectionDef[] {
  return TEMPLATE_SECTIONS[templateId] ?? [];
}

export function getSectionByAnchor(templateId: TemplateId, anchor: string): TemplateSectionDef | undefined {
  return getTemplateSections(templateId).find((section) => section.anchor === anchor);
}

export function isSectionVisible(content: LandingContent, anchor: string): boolean {
  const hidden = content.hiddenSections ?? [];
  return !hidden.includes(anchor);
}

export function getVisibleEditorTabs(
  templateId: TemplateId,
  hiddenSections: string[] | undefined,
  isAdmin = false,
): EditorTab[] {
  const template = getTemplate(templateId);
  if (!template) return [];

  const hidden = new Set(hiddenSections ?? []);
  const hiddenTabIds = new Set(
    getTemplateSections(templateId)
      .filter((section) => hidden.has(section.anchor) && section.editorTabId)
      .map((section) => section.editorTabId),
  );

  const tabs = template.editorTabs.filter((tab) => !hiddenTabIds.has(tab.id));
  if (!isAdmin) return tabs;

  return [...tabs, ADMIN_EDITOR_TAB];
}

export function getVisibleNav(
  nav: NavLink[],
  hiddenSections: string[] | undefined,
  templateId: TemplateId,
): NavLink[] {
  const hidden = new Set(hiddenSections ?? []);
  const hiddenHrefs = new Set(
    getTemplateSections(templateId)
      .filter((section) => hidden.has(section.anchor))
      .map((section) => getSectionScrollHref(section)),
  );

  return nav
    .map((item) => ({
      ...item,
      href: normalizeNavHref(templateId, item.href),
    }))
    .filter((item) => !hiddenHrefs.has(item.href));
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
