import type { LandingContent } from "@/lib/dashboard-data";
import { VELAR_DEFAULT_CONTENT } from "@/lib/default-content";

export type TemplateId = "velar";

export type TemplateDefinition = {
  id: TemplateId;
  label: string;
  description: string;
  demoContent: LandingContent;
};

export const TEMPLATE_REGISTRY: Record<TemplateId, TemplateDefinition> = {
  velar: {
    id: "velar",
    label: "Velar",
    description:
      "Landing para espacios de eventos: hero, estadísticas, salas, servicios, workflow y testimonios.",
    demoContent: VELAR_DEFAULT_CONTENT,
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
