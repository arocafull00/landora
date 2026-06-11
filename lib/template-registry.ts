import type { TemplateId, TemplateContentMap, LandingContent } from "@/lib/dashboard-data";
import { STUDIO_DEFAULT_CONTENT, VELAR_DEFAULT_CONTENT, PORTFOLIO_DEFAULT_CONTENT, RISTORANTE_DEFAULT_CONTENT, FLORISTERIA_DEFAULT_CONTENT } from "@/lib/default-content";

export type EditorTabGroup = "section" | "config";

export type EditorTab = {
  id: string;
  label: string;
  group?: EditorTabGroup;
};

export const SECTIONS_EDITOR_TAB: EditorTab = {
  id: "Secciones",
  label: "Secciones",
  group: "config",
};

export const NAV_EDITOR_TAB: EditorTab = {
  id: "Navegación",
  label: "Navegación",
  group: "config",
};

export const ADMIN_EDITOR_TAB: EditorTab = {
  id: "Admin",
  label: "Admin",
  group: "config",
};

export const FOOTER_EDITOR_TAB: EditorTab = {
  id: "Footer",
  label: "Pie de página",
};

export const CONTACT_EDITOR_TAB: EditorTab = {
  id: "Contacto",
  label: "Contacto",
};

export type TemplateComponent = React.ComponentType<{ content: LandingContent; topOffset?: number }>;

export type TemplateDefinition<T extends TemplateId = TemplateId> = {
  id: T;
  label: string;
  description: string;
  demoContent: TemplateContentMap[T];
  editorTabs: EditorTab[];
  getComponent: () => Promise<Record<string, TemplateComponent>>;
};

export const TEMPLATE_REGISTRY: Record<TemplateId, TemplateDefinition> = {
  velar: {
    id: "velar",
    label: "Velar",
    description:
      "Landing para espacios de eventos: hero, estadísticas, salas, servicios, workflow y testimonios.",
    demoContent: VELAR_DEFAULT_CONTENT,
    editorTabs: [
      { id: "Hero", label: "Hero" },
      NAV_EDITOR_TAB,
      { id: "Historia", label: "Historia" },
      { id: "Galería", label: "Galería" },
      { id: "Espacios", label: "Espacios" },
      { id: "Servicios", label: "Servicios" },
      { id: "Proceso", label: "Proceso" },
      { id: "Testimonios", label: "Testimonios" },
      CONTACT_EDITOR_TAB,
      FOOTER_EDITOR_TAB,
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
      { id: "Historia", label: "Historia" },
      { id: "Servicios", label: "Servicios" },
      { id: "Equipo", label: "Equipo" },
      { id: "Galeria", label: "Galería" },
      { id: "FAQ", label: "FAQ" },
      { id: "Posts", label: "Posts" },
      FOOTER_EDITOR_TAB,
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
      { id: "Experiencia", label: "Experiencia" },
      { id: "Proyectos", label: "Proyectos" },
      { id: "Servicios", label: "Servicios" },
      { id: "FAQ", label: "FAQ" },
      { id: "Posts", label: "Posts" },
      FOOTER_EDITOR_TAB,
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
      { id: "Carta", label: "Carta" },
      { id: "Galeria", label: "Galería" },
      { id: "Equipo", label: "Equipo" },
      { id: "Horarios", label: "Horarios" },
      { id: "FAQ", label: "FAQ" },
      FOOTER_EDITOR_TAB,
      SECTIONS_EDITOR_TAB,
    ],
    getComponent: () => import("@/components/templates/ristorante/ristorante-template"),
  },
  floristeria: {
    id: "floristeria",
    label: "Floristería",
    description:
      "Landing para floristerías: servicios florales, galería, equipo y pedidos.",
    demoContent: FLORISTERIA_DEFAULT_CONTENT,
    editorTabs: [
      { id: "Hero", label: "Hero" },
      NAV_EDITOR_TAB,
      { id: "Servicios", label: "Servicios" },
      { id: "Galeria", label: "Galería" },
      { id: "Equipo", label: "Equipo" },
      { id: "FAQ", label: "FAQ" },
      FOOTER_EDITOR_TAB,
      SECTIONS_EDITOR_TAB,
    ],
    getComponent: () => import("@/components/templates/floristeria/floristeria-template"),
  },
};

export function getAllTemplates() {
  return Object.values(TEMPLATE_REGISTRY);
}

export function getTemplate(id: string): TemplateDefinition | undefined {
  if (!isValidTemplateId(id)) return undefined;
  return TEMPLATE_REGISTRY[id];
}

export function isValidTemplateId(id: string): id is TemplateId {
  return id in TEMPLATE_REGISTRY;
}
