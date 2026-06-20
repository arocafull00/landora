"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { upsertBookingSettings } from "@/data/booking-settings";
import { requireAuth } from "@/lib/auth";
import { requireBookingModuleAccessForCurrentUser } from "@/lib/require-booking-module-access";

const settingsSchema = z.object({
  enabled: z.boolean(),
  timezone: z.string().trim().min(1),
  autoConfirmBookings: z.boolean(),
  minAdvanceHours: z.number().int().min(0).max(168),
  maxAdvanceDays: z.number().int().min(1).max(365),
  slotGranularityMinutes: z.number().int().refine((v) => [5, 10, 15, 30, 60].includes(v)),
  notificationEmail: z.email().or(z.literal("")),
});

type ActionResult = { success: true } | { error: string };

export async function upsertBookingSettingsAction(
  input: z.infer<typeof settingsSchema>,
): Promise<ActionResult> {
  const authResult = await requireAuth();
  if ("error" in authResult) return { error: authResult.error };
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) return { error: access.error };
  const tenantId = access.tenantId;

  const parsed = settingsSchema.safeParse(input);
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
