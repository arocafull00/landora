"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { assertLandingAccess } from "@/lib/api/landing-auth";
import { upsertLandingSectionSelection } from "@/data/landing-section-selections";
import { logger } from "@/lib/logger";

const heroVariantSchema = z.enum([
  "velar",
  "studio",
  "portfolio",
  "ristorante",
  "floristeria",
  "oficio-pro",
  "coffee-shop",
  "lumen",
  "offset",
  "mosaico",
]);

const updateSectionSelectionSchema = z.object({
  landingId: z.uuid(),
  sectionKey: z.literal("hero"),
  variantId: heroVariantSchema,
});

export async function updateLandingSectionSelection(input: {
  landingId: string;
  sectionKey: "hero";
  variantId: z.infer<typeof heroVariantSchema>;
}) {
  const parsed = updateSectionSelectionSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "Selección de sección no válida" };
  }

  const landing = await assertLandingAccess(parsed.data.landingId);
  if (!landing) {
    return { error: "No autorizado" };
  }

  try {
    await upsertLandingSectionSelection(
      parsed.data.landingId,
      parsed.data.sectionKey,
      parsed.data.variantId,
    );
    const slug = landing.slug.replace(/^\//, "");
    revalidatePath(`/${slug}`);
    revalidatePath(`/preview/${landing.id}`);
    return { success: true as const };
  } catch (error) {
    logger.captureException(error, {
      action: "save-landing-section-selection",
      landingId: landing.id,
      tenantId: landing.userId,
    });
    return { error: "No se pudo guardar la selección de la sección" };
  }
}
