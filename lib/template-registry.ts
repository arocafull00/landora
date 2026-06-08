import type { TemplateId, TemplateContentMap, LandingContent } from "@/lib/dashboard-data";
import { STUDIO_DEFAULT_CONTENT, VELAR_DEFAULT_CONTENT, PORTFOLIO_DEFAULT_CONTENT, RISTORANTE_DEFAULT_CONTENT, FLORISTERIA_DEFAULT_CONTENT } from "@/lib/default-content";

export type EditorTab = {
  id: string;
  label: string;
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
      { id: "Historia", label: "Historia" },
      { id: "Espacios", label: "Espacios" },
      { id: "Servicios", label: "Servicios" },
      { id: "Posts", label: "Posts" },
      { id: "Presentaciones", label: "Presentaciones" },
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
      { id: "Servicios", label: "Servicios" },
      { id: "Equipo", label: "Equipo" },
      { id: "Galeria", label: "Galería" },
      { id: "FAQ", label: "FAQ" },
      { id: "Posts", label: "Posts" },
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
      { id: "Proyectos", label: "Proyectos" },
      { id: "Servicios", label: "Servicios" },
      { id: "FAQ", label: "FAQ" },
      { id: "Posts", label: "Posts" },
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
      { id: "Carta", label: "Carta" },
      { id: "Galeria", label: "Galería" },
      { id: "Equipo", label: "Equipo" },
      { id: "Horarios", label: "Horarios" },
      { id: "FAQ", label: "FAQ" },
    ],
    getComponent: () => import("@/components/templates/ristorante/ristorante-template"),
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
