import { z } from "zod";
import type { TemplateId } from "@/lib/dashboard-data";
import { getRequiredTemplate } from "@/lib/template-registry";

export function getTemplateRendererVersionSchema(templateId: TemplateId) {
  const template = getRequiredTemplate(templateId);
  return z.number().int().min(1).refine(
    (version) => version === template.rendererVersion || Object.hasOwn(template.previousRenderers ?? {}, version),
    "Unsupported template renderer version",
  );
}

export function getTemplateRendererLoader(templateId: TemplateId, rendererVersion: number) {
  const template = getRequiredTemplate(templateId);
  const version = getTemplateRendererVersionSchema(templateId).parse(rendererVersion);
  if (version === template.rendererVersion) return template.loadComponent;
  const loader = template.previousRenderers?.[version];
  if (!loader) throw new Error("Missing template renderer");
  return loader;
}
