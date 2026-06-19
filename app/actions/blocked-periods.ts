"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getEffectiveClientId } from "@/lib/auth";
import {
  createBlockedPeriod,
  deleteBlockedPeriod,
  updateBlockedPeriod,
} from "@/data/blocked-periods";

const blockedPeriodSchema = z.object({
  employeeId: z.string().uuid().nullable(),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
  reason: z.string().max(200),
});

type ActionResult = { success: true } | { error: string };

async function getTenantId() {
  const tenantId = await getEffectiveClientId();
  if (!tenantId) {
    return null;
  }
  return tenantId;
}

export async function createBlockedPeriodAction(
  input: z.infer<typeof blockedPeriodSchema>,
): Promise<ActionResult> {
  const tenantId = await getTenantId();
  if (!tenantId) {
    return { error: "No autorizado" };
  }

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

export async function updateBlockedPeriodAction(
  id: string,
  input: z.infer<typeof blockedPeriodSchema>,
): Promise<ActionResult> {
  const tenantId = await getTenantId();
  if (!tenantId) {
    return { error: "No autorizado" };
  }

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
    const updated = await updateBlockedPeriod(tenantId, id, {
      employeeId: parsed.data.employeeId,
      startsAt,
      endsAt,
      reason: parsed.data.reason,
    });
    if (!updated) {
      return { error: "Bloqueo no encontrado" };
    }
    revalidatePath("/settings/blocked-periods");
    revalidatePath("/bookings");
    return { success: true };
  } catch {
    return { error: "No se pudo actualizar el bloqueo" };
  }
}

export async function deleteBlockedPeriodAction(id: string): Promise<ActionResult> {
  const tenantId = await getTenantId();
  if (!tenantId) {
    return { error: "No autorizado" };
  }

  try {
    await deleteBlockedPeriod(tenantId, id);
    revalidatePath("/settings/blocked-periods");
    revalidatePath("/bookings");
    return { success: true };
  } catch {
    return { error: "No se pudo eliminar el bloqueo" };
  }
}
