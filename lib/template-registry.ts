import type { TemplateId } from "@/lib/dashboard-data";
import type { EditorTab, TemplateDefinition } from "@/lib/templates/types";
import { ADMIN_EDITOR_TAB, RESERVAS_EDITOR_TAB } from "@/lib/templates/editor-tabs";
import { RISTORANTE_TEMPLATE } from "@/lib/templates/ristorante/definition";
import { NUVOLETS_TEMPLATE } from "@/lib/templates/nuvolets/definition";
import { VELAR_TEMPLATE } from "@/lib/templates/velar/definition";
import { STUDIO_TEMPLATE } from "@/lib/templates/studio/definition";
import { PORTFOLIO_TEMPLATE } from "@/lib/templates/portfolio/definition";
import { FLORISTERIA_TEMPLATE } from "@/lib/templates/floristeria/definition";
import { OFICIO_PRO_TEMPLATE } from "@/lib/templates/oficio-pro/definition";
import { COFFEE_SHOP_TEMPLATE } from "@/lib/templates/coffee-shop/definition";
import { SIGNAL_TEMPLATE } from "@/lib/templates/signal/definition";
import { PALLET_ROSS_TEMPLATE } from "@/lib/templates/pallet-ross/definition";

const TEMPLATE_REGISTRY: Record<TemplateId, TemplateDefinition> = {
  "ristorante": RISTORANTE_TEMPLATE,
  "nuvolets": NUVOLETS_TEMPLATE,
  "velar": VELAR_TEMPLATE,
  "studio": STUDIO_TEMPLATE,
  "portfolio": PORTFOLIO_TEMPLATE,
  "floristeria": FLORISTERIA_TEMPLATE,
  "oficio-pro": OFICIO_PRO_TEMPLATE,
  "coffee-shop": COFFEE_SHOP_TEMPLATE,
  "signal": SIGNAL_TEMPLATE,
  "pallet-ross": PALLET_ROSS_TEMPLATE,
};

export function getAllTemplates() {
  return Object.values(TEMPLATE_REGISTRY).filter(
    (template) => isAvailableTemplateId(template.id),
  );
}

export function getTemplate(id: string): TemplateDefinition | undefined {
  if (!isValidTemplateId(id)) return undefined;
  return TEMPLATE_REGISTRY[id];
}

export function getVisibleEditorTabs(
  templateId: TemplateId,
  hiddenSections: string[] | undefined,
  isAdmin = false,
  bookingModuleEnabled = false,
): EditorTab[] {
  const template = getTemplate(templateId);
  if (!template) return [];

  const hidden = new Set(hiddenSections ?? []);
  const hiddenTabIds = new Set<string>();

  for (const section of template.sections) {
    if (!hidden.has(section.anchor) || !section.editorTabId) continue;
    hiddenTabIds.add(section.editorTabId);
  }

  const tabs = template.editorTabs.filter((tab) => {
    if (hiddenTabIds.has(tab.id)) return false;
    if (tab.id === RESERVAS_EDITOR_TAB.id && (!bookingModuleEnabled || !template.capabilities.booking)) return false;
    return true;
  });
  if (!isAdmin) return tabs;

  return [...tabs, ADMIN_EDITOR_TAB];
}

export function isValidTemplateId(id: string): id is TemplateId {
  return Object.hasOwn(TEMPLATE_REGISTRY, id);
}

export function isAvailableTemplateId(id: string): id is TemplateId {
  return isValidTemplateId(id) && !TEMPLATE_REGISTRY[id].retired;
}

export function getRegisteredTemplates(): TemplateDefinition[] {
  return Object.values(TEMPLATE_REGISTRY);
}

export function getRequiredTemplate(id: TemplateId): TemplateDefinition {
  const template = getTemplate(id);
  if (!template) throw new Error("Unknown template");
  return template;
}

export function templateSupports(id: TemplateId, capability: keyof TemplateDefinition["capabilities"]) {
  return getRequiredTemplate(id).capabilities[capability];
}
