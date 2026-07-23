import type {
  TemplateId,
  TemplateContentMap,
  LandingContent,
  LandingSectionSelections,
} from "@/lib/dashboard-data";
import { STUDIO_DEFAULT_CONTENT, VELAR_DEFAULT_CONTENT, PORTFOLIO_DEFAULT_CONTENT, RISTORANTE_DEFAULT_CONTENT, FLORISTERIA_DEFAULT_CONTENT, OFICIO_PRO_DEFAULT_CONTENT, COFFEE_SHOP_DEFAULT_CONTENT } from "@/lib/default-content";
import { getTemplateSections } from "@/lib/template-sections";

export type EditorTabGroup = "section" | "config";

export type EditorTab = {
  id: string;
  label: string;
  group?: EditorTabGroup;
};

const SECTIONS_EDITOR_TAB: EditorTab = {
  id: "Secciones",
  label: "Secciones",
  group: "config",
};

export const NAV_EDITOR_TAB: EditorTab = {
  id: "Navegación",
  label: "Navegación",
  group: "config",
};

const DESIGN_EDITOR_TAB: EditorTab = {
  id: "Diseño",
  label: "Diseño",
  group: "config",
};

const ADMIN_EDITOR_TAB: EditorTab = {
  id: "Admin",
  label: "Admin",
  group: "config",
};

const FOOTER_EDITOR_TAB: EditorTab = {
  id: "Footer",
  label: "Pie de página",
};

const BLOG_EDITOR_TAB: EditorTab = {
  id: "Blog",
  label: "Blog",
};

const CONTACT_EDITOR_TAB: EditorTab = {
  id: "Contacto",
  label: "Contacto",
};

const OFFERS_EDITOR_TAB: EditorTab = {
  id: "Ofertas",
  label: "Ofertas",
};

const RESERVAS_EDITOR_TAB: EditorTab = {
  id: "Reservas",
  label: "Reservas",
};

const SEO_EDITOR_TAB: EditorTab = {
  id: "SEO",
  label: "SEO",
  group: "config",
};

export type TemplateComponent = React.ComponentType<{
  bookingEnabled?: boolean;
  content: LandingContent;
  sectionSelections?: LandingSectionSelections;
  slug?: string;
  topOffset?: number;
}>;

export type TemplateDefinition<T extends TemplateId = TemplateId> = {
  id: T;
  label: string;
  description: string;
  demoContent: TemplateContentMap[T];
  editorTabs: EditorTab[];
  getComponent: () => Promise<Record<string, TemplateComponent>>;
};

const TEMPLATE_REGISTRY: Record<TemplateId, TemplateDefinition> = {
  velar: {
    id: "velar",
    label: "Velar",
    description:
      "Landing para espacios de eventos: hero, estadísticas, salas, servicios, workflow y testimonios.",
    demoContent: VELAR_DEFAULT_CONTENT,
    editorTabs: [
      { id: "Hero", label: "Hero" },
      NAV_EDITOR_TAB,
      DESIGN_EDITOR_TAB,
      { id: "Historia", label: "Historia" },
      { id: "Galería", label: "Galería" },
      { id: "Espacios", label: "Espacios" },
      { id: "Servicios", label: "Servicios" },
      { id: "Proceso", label: "Proceso" },
      { id: "Testimonios", label: "Testimonios" },
      OFFERS_EDITOR_TAB,
      RESERVAS_EDITOR_TAB,
      CONTACT_EDITOR_TAB,
      BLOG_EDITOR_TAB,
      FOOTER_EDITOR_TAB,
      SEO_EDITOR_TAB,
      SECTIONS_EDITOR_TAB,
    ],
    getComponent: () => import("@/components/templates/velar/velar-template"),
  },
  studio: {
    id: "studio",
    label: "Studio",
    description:
      "Landing para peluquerías y salones: servicios con precios, equipo, galería, FAQ y reservas.",
    demoContent: STUDIO_DEFAULT_CONTENT,
    editorTabs: [
      { id: "Hero", label: "Hero" },
      NAV_EDITOR_TAB,
      DESIGN_EDITOR_TAB,
      { id: "Historia", label: "Historia" },
      { id: "Servicios", label: "Servicios" },
      { id: "Equipo", label: "Equipo" },
      { id: "Galeria", label: "Galería" },
      { id: "FAQ", label: "FAQ" },
      OFFERS_EDITOR_TAB,
      RESERVAS_EDITOR_TAB,
      BLOG_EDITOR_TAB,
      FOOTER_EDITOR_TAB,
      SEO_EDITOR_TAB,
      SECTIONS_EDITOR_TAB,
    ],
    getComponent: () => import("@/components/templates/studio/studio-template"),
  },
  portfolio: {
    id: "portfolio",
    label: "Portfolio",
    description:
      "Landing para profesionales creativos: proyectos, servicios, testimonios y contacto.",
    demoContent: PORTFOLIO_DEFAULT_CONTENT,
    editorTabs: [
      { id: "Hero", label: "Hero" },
      NAV_EDITOR_TAB,
      DESIGN_EDITOR_TAB,
      { id: "Experiencia", label: "Experiencia" },
      { id: "Proyectos", label: "Proyectos" },
      { id: "Cómo trabajo", label: "Cómo trabajo" },
      { id: "Servicios", label: "Servicios" },
      { id: "FAQ", label: "FAQ" },
      OFFERS_EDITOR_TAB,
      RESERVAS_EDITOR_TAB,
      BLOG_EDITOR_TAB,
      FOOTER_EDITOR_TAB,
      SEO_EDITOR_TAB,
      SECTIONS_EDITOR_TAB,
    ],
    getComponent: () => import("@/components/templates/portfolio/portfolio-template"),
  },
  ristorante: {
    id: "ristorante",
    label: "Ristorante",
    description:
      "Landing para restaurantes: carta con precios, galería, equipo, horarios y reservas.",
    demoContent: RISTORANTE_DEFAULT_CONTENT,
    editorTabs: [
      { id: "Hero", label: "Hero" },
      NAV_EDITOR_TAB,
      DESIGN_EDITOR_TAB,
      { id: "Carta", label: "Carta" },
      { id: "Galeria", label: "Galería" },
      { id: "Equipo", label: "Equipo" },
      { id: "Horarios", label: "Horarios" },
      { id: "FAQ", label: "FAQ" },
      OFFERS_EDITOR_TAB,
      RESERVAS_EDITOR_TAB,
      BLOG_EDITOR_TAB,
      FOOTER_EDITOR_TAB,
      SEO_EDITOR_TAB,
      SECTIONS_EDITOR_TAB,
    ],
    getComponent: () => import("@/components/templates/ristorante/ristorante-template"),
  },
  floristeria: {
    id: "floristeria",
    label: "Floristería",
    description:
      "Landing para floristerías: servicios florales, galería y pedidos.",
    demoContent: FLORISTERIA_DEFAULT_CONTENT,
    editorTabs: [
      { id: "Hero", label: "Hero" },
      NAV_EDITOR_TAB,
      DESIGN_EDITOR_TAB,
      { id: "Historia", label: "Historia" },
      { id: "Servicios", label: "Servicios" },
      { id: "Galeria", label: "Galería" },
      { id: "FAQ", label: "FAQ" },
      OFFERS_EDITOR_TAB,
      RESERVAS_EDITOR_TAB,
      BLOG_EDITOR_TAB,
      FOOTER_EDITOR_TAB,
      SEO_EDITOR_TAB,
      SECTIONS_EDITOR_TAB,
    ],
    getComponent: () => import("@/components/templates/floristeria/floristeria-template"),
  },
  "oficio-pro": {
    id: "oficio-pro",
    label: "Oficio Pro",
    description:
      "Landing para fontaneros, electricistas y servicios técnicos: urgencias, instalaciones, reseñas y contacto.",
    demoContent: OFICIO_PRO_DEFAULT_CONTENT,
    editorTabs: [
      { id: "Hero", label: "Hero" },
      NAV_EDITOR_TAB,
      DESIGN_EDITOR_TAB,
      { id: "Servicios", label: "Servicios" },
      { id: "Instalaciones", label: "Instalaciones" },
      { id: "Testimonios", label: "Testimonios" },
      { id: "Experiencia", label: "Experiencia" },
      OFFERS_EDITOR_TAB,
      RESERVAS_EDITOR_TAB,
      BLOG_EDITOR_TAB,
      FOOTER_EDITOR_TAB,
      SEO_EDITOR_TAB,
      SECTIONS_EDITOR_TAB,
    ],
    getComponent: () => import("@/components/templates/oficio-pro/oficio-pro-template"),
  },
  "coffee-shop": {
    id: "coffee-shop",
    label: "Coffee Shop",
    description:
      "Landing para cafeterías y panaderías: carta de café, galería, horarios y reservas.",
    demoContent: COFFEE_SHOP_DEFAULT_CONTENT,
    editorTabs: [
      { id: "Hero", label: "Hero" },
      NAV_EDITOR_TAB,
      DESIGN_EDITOR_TAB,
      { id: "Carta", label: "Carta" },
      { id: "Galeria", label: "Galería" },
      { id: "Horarios", label: "Horarios" },
      { id: "FAQ", label: "FAQ" },
      OFFERS_EDITOR_TAB,
      RESERVAS_EDITOR_TAB,
      BLOG_EDITOR_TAB,
      FOOTER_EDITOR_TAB,
      SEO_EDITOR_TAB,
      SECTIONS_EDITOR_TAB,
    ],
    getComponent: () => import("@/components/templates/coffee-shop/coffee-shop-template"),
  },
};

export function getAllTemplates() {
  return Object.values(TEMPLATE_REGISTRY);
}

export function getTemplate(id: string): TemplateDefinition | undefined {
  if (!isValidTemplateId(id)) return undefined;
  return TEMPLATE_REGISTRY[id];
}

export function getVisibleEditorTabs(
  templateId: TemplateId,
  hiddenSections: string[] | undefined,
  isAdmin = false,
): EditorTab[] {
  const template = getTemplate(templateId);
  if (!template) return [];

  const hidden = new Set(hiddenSections ?? []);
  const hiddenTabIds = new Set<string>();

  for (const section of getTemplateSections(templateId)) {
    if (!hidden.has(section.anchor) || !section.editorTabId) continue;
    hiddenTabIds.add(section.editorTabId);
  }

  const tabs = template.editorTabs.filter((tab) => !hiddenTabIds.has(tab.id));
  if (!isAdmin) return tabs;

  return [...tabs, ADMIN_EDITOR_TAB];
}

export function isValidTemplateId(id: string): id is TemplateId {
  return id in TEMPLATE_REGISTRY;
}
