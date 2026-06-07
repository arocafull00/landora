import type { TemplateId, TemplateContentMap, LandingContent } from "@/lib/dashboard-data";
import { STUDIO_DEFAULT_CONTENT, VELAR_DEFAULT_CONTENT } from "@/lib/default-content";

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
      { id: "Story", label: "Story" },
      { id: "Spaces", label: "Spaces" },
      { id: "Services", label: "Services" },
      { id: "Posts", label: "Posts" },
      { id: "Presentations", label: "Presentations" },
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
