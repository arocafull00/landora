"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  createBlockedPeriod,
  deleteBlockedPeriod,
} from "@/data/blocked-periods";
import { requireAuth } from "@/lib/auth";
import { requireBookingModuleAccessForCurrentUser } from "@/lib/require-booking-module-access";

const blockedPeriodSchema = z.object({
  employeeId: z.uuid().nullable(),
  startsAt: z.iso.datetime(),
  endsAt: z.iso.datetime(),
  reason: z.string().max(200),
});

type ActionResult = { success: true } | { error: string };

export async function createBlockedPeriodAction(
  input: z.infer<typeof blockedPeriodSchema>,
): Promise<ActionResult> {
  const authResult = await requireAuth();
  if ("error" in authResult) return { error: authResult.error };
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) return { error: access.error };
  const tenantId = access.tenantId;

  const parsed = blockedPeriodSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "Datos inválidos" };
  }

  const startsAt = new Date(parsed.data.startsAt);
  const endsAt = new Date(parsed.data.endsAt);
  if (startsAt >= endsAt) {
    return { error: "La fecha de fin debe ser posterior al inicio" };
  }

  try {
    await createBlockedPeriod(tenantId, {
      employeeId: parsed.data.employeeId,
      startsAt,
      endsAt,
      reason: parsed.data.reason,
    });
    revalidatePath("/settings/blocked-periods");
    revalidatePath("/bookings");
    return { success: true };
  } catch {
    return { error: "No se pudo crear el bloqueo" };
  }
}

export async function deleteBlockedPeriodAction(id: string): Promise<ActionResult> {
  const authResult = await requireAuth();
  if ("error" in authResult) return { error: authResult.error };
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) return { error: access.error };
  const tenantId = access.tenantId;

  try {
    await deleteBlockedPeriod(tenantId, id);
    revalidatePath("/settings/blocked-periods");
    revalidatePath("/bookings");
    return { success: true };
  } catch {
    return { error: "No se pudo eliminar el bloqueo" };
  }
}
