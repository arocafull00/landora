"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { upsertBookingSettings } from "@/data/booking-settings";
import { requireAuth } from "@/lib/auth";
import { requireBookingModuleAccessForCurrentUser } from "@/lib/require-booking-module-access";
import { bookingSettingsSchema } from "@/lib/schemas/booking-admin";

type ActionResult = { success: true } | { error: string };

export async function upsertBookingSettingsAction(
  input: z.infer<typeof bookingSettingsSchema>,
): Promise<ActionResult> {
  const authResult = await requireAuth();
  if ("error" in authResult) return { error: authResult.error };
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) return { error: access.error };
  const tenantId = access.tenantId;

  const parsed = bookingSettingsSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "Datos inválidos" };
  }

  try {
    await upsertBookingSettings(tenantId, parsed.data);
    revalidatePath("/bookings");
    revalidatePath("/bookings", "layout");
    return { success: true };
  } catch {
    return { error: "No se pudieron guardar los ajustes" };
  }
}
