import type { TemplateContentMap, TemplateId } from "@/lib/dashboard-data";
import { getRequiredTemplate } from "@/lib/template-registry";

export async function getDefaultContent<T extends TemplateId>(templateId: T): Promise<TemplateContentMap[T]> {
  const template = getRequiredTemplate(templateId);
  const content = await template.loadContent();
  return { ...content, schemaVersion: template.contentVersion, rendererVersion: template.rendererVersion } as TemplateContentMap[T];
}
