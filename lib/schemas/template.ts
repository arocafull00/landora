import { z } from "zod";
import type { TemplateId } from "@/lib/dashboard-data";
import { isAvailableTemplateId, isValidTemplateId } from "@/lib/template-registry";

export const templateIdSchema = z.custom<TemplateId>(
  (value) => typeof value === "string" && value.length <= 80 && isValidTemplateId(value),
  "Plantilla no válida",
);

export const availableTemplateIdSchema = templateIdSchema.refine(isAvailableTemplateId, "Plantilla no disponible");
