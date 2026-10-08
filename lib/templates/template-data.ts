import { z } from "zod";
import type { TemplateId } from "@/lib/dashboard-data";
import { getRequiredTemplate } from "@/lib/template-registry";

const templateDataEnvelopeSchema = z.record(z.string().min(1).max(80), z.unknown())
  .refine((value) => JSON.stringify(value).length <= 1_000_000, "Template data too large");

export function getTemplateDataSchema(templateId: TemplateId) {
  const schema = getRequiredTemplate(templateId).templateDataSchema ?? z.strictObject({});
  return templateDataEnvelopeSchema.pipe(schema);
}
