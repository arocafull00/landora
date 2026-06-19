"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getEffectiveClientId } from "@/lib/auth";
import {
  createBookingService,
  reorderBookingServices,
  setBookingServiceActive,
  updateBookingService,
} from "@/data/booking-services";

const serviceSchema = z.object({
  name: z.string().trim().min(1).max(80),
  durationMinutes: z.number().int().min(5).max(480),
  bufferAfterMinutes: z.number().int().min(0).max(120),
});

type ActionResult = { success: true } | { error: string };

async function getTenantId() {
  const tenantId = await getEffectiveClientId();
  if (!tenantId) {
    return null;
  }
  return tenantId;
}

export async function createBookingServiceAction(
  input: z.infer<typeof serviceSchema>,
): Promise<ActionResult> {
  const tenantId = await getTenantId();
  if (!tenantId) {
    return { error: "No autorizado" };
  }

  const parsed = serviceSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "Datos inválidos" };
  }

  try {
    await createBookingService(tenantId, parsed.data);
    revalidatePath("/services");
    return { success: true };
  } catch {
    return { error: "No se pudo crear el servicio" };
  }
}

export async function updateBookingServiceAction(
  id: string,
  input: z.infer<typeof serviceSchema>,
): Promise<ActionResult> {
  const tenantId = await getTenantId();
  if (!tenantId) {
    return { error: "No autorizado" };
  }

  const parsed = serviceSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "Datos inválidos" };
  }

  try {
    const updated = await updateBookingService(tenantId, id, parsed.data);
    if (!updated) {
      return { error: "Servicio no encontrado" };
    }
    revalidatePath("/services");
    return { success: true };
  } catch {
    return { error: "No se pudo actualizar el servicio" };
  }
}

export async function toggleBookingServiceActiveAction(
  id: string,
  isActive: boolean,
): Promise<ActionResult> {
  const tenantId = await getTenantId();
  if (!tenantId) {
    return { error: "No autorizado" };
  }

  try {
    const updated = await setBookingServiceActive(tenantId, id, isActive);
    if (!updated) {
      return { error: "Servicio no encontrado" };
    }
    revalidatePath("/services");
    return { success: true };
  } catch {
    return { error: "No se pudo actualizar el servicio" };
  }
}

export async function reorderBookingServicesAction(orderedIds: string[]): Promise<ActionResult> {
  const tenantId = await getTenantId();
  if (!tenantId) {
    return { error: "No autorizado" };
  }

  try {
    await reorderBookingServices(tenantId, orderedIds);
    revalidatePath("/services");
    return { success: true };
  } catch {
    return { error: "No se pudo reordenar los servicios" };
  }
}
