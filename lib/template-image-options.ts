import type { TemplateId } from "@/lib/dashboard-data";
import { getRequiredTemplate } from "@/lib/template-registry";

export function getTemplateImageOptions(templateId: TemplateId): Promise<readonly { value: string; label: string }[]> {
  return getRequiredTemplate(templateId).loadImageOptions();
}
