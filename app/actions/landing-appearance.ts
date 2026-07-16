"use server";

import { revalidatePath } from "next/cache";
import { updateLandingAppearance } from "@/data/landing-sections";
import { assertLandingAccess } from "@/lib/api/landing-auth";
import {
  isValidPaletteId,
  isValidTypographyId,
} from "@/lib/site-appearance";
import {
  landingAppearanceSchema,
  type LandingAppearanceInput,
} from "@/lib/schemas/landing-appearance";
import { logger } from "@/lib/logger";

type ActionResult = { success: true } | { error: string };

export async function saveLandingAppearanceAction(
  input: LandingAppearanceInput,
): Promise<ActionResult> {
  const parsed = landingAppearanceSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "Configuración visual no válida" };
  }

  const landing = await assertLandingAccess(parsed.data.landingId);
  if (!landing) {
    return { error: "No tienes acceso a esta web" };
  }

  if (!isValidPaletteId(landing.template, parsed.data.paletteId)) {
    return { error: "La paleta no está disponible para esta plantilla" };
  }

  if (!isValidTypographyId(parsed.data.typographyId)) {
    return { error: "La tipografía seleccionada no está disponible" };
  }

  try {
    await updateLandingAppearance(landing.id, {
      paletteId: parsed.data.paletteId,
      typographyId: parsed.data.typographyId,
    });
    revalidatePath(`/${landing.slug.replace(/^\//, "")}`);
    revalidatePath(`/${landing.slug.replace(/^\//, "")}/blog`);
    revalidatePath(`/${landing.slug.replace(/^\//, "")}/book`);
    revalidatePath(`/preview/${landing.id}`);
    return { success: true };
  } catch (error) {
    logger.captureException(error, {
      action: "save-landing-appearance",
      tenantId: landing.userId,
      landingId: landing.id,
    });
    return { error: "No se pudo guardar el diseño" };
  }
}
