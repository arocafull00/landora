import { z } from "zod";
import type { LandingContent, TemplateId } from "@/lib/dashboard-data";
import { getRequiredTemplate } from "@/lib/template-registry";
import { landingContentSchema } from "@/lib/schemas/landing-content";
import { getTemplateDataSchema } from "@/lib/templates/template-data";
import { getTemplateRendererVersionSchema } from "@/lib/templates/renderer";

export function migrateTemplateContent(templateId: TemplateId, value: Record<string, unknown>): Record<string, unknown> & { schemaVersion: number } {
  const template = getRequiredTemplate(templateId);
  const version = z.number().int().min(1).max(template.contentVersion).parse(value.schemaVersion ?? 1);
  let content = value;
  for (let currentVersion = version; currentVersion < template.contentVersion; currentVersion++) {
    const migrate = template.contentMigrations?.[currentVersion];
    if (!migrate) throw new Error("Missing template content migration");
    content = migrate(content);
  }
  return { ...content, schemaVersion: template.contentVersion };
}

export function getTemplateContentSchema(templateId: TemplateId) {
  const template = getRequiredTemplate(templateId);
  return z.record(z.string().min(1).max(80), z.unknown())
    .refine((value) => JSON.stringify(value).length <= 1_000_000, "Landing content too large")
    .transform((value, ctx): LandingContent | typeof z.NEVER => {
      let content: Record<string, unknown>;
      try {
        content = migrateTemplateContent(templateId, value);
      } catch {
        ctx.addIssue({ code: "custom", message: "Unsupported template content version" });
        return z.NEVER;
      }
      const parsed = landingContentSchema.safeParse(content);
      const templateData = getTemplateDataSchema(templateId).safeParse(content.templateData ?? {});
      const rendererVersion = getTemplateRendererVersionSchema(templateId).safeParse(content.rendererVersion ?? 1);
      if (!parsed.success || !templateData.success || !rendererVersion.success) {
        ctx.addIssue({ code: "custom", message: "Invalid template content" });
        return z.NEVER;
      }
      if (template.validateContent && !template.validateContent(content)) {
        ctx.addIssue({ code: "custom", message: "Invalid template content" });
        return z.NEVER;
      }
      return { ...parsed.data, templateData: templateData.data, rendererVersion: rendererVersion.data, schemaVersion: template.contentVersion } as LandingContent;
    });
}
