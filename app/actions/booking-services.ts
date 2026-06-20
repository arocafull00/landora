"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  createBookingService,
  deleteBookingService,
  getBookingServiceById,
  reorderBookingServices,
  setBookingServiceActive,
  updateBookingService,
} from "@/data/booking-services";
import { requireAuth } from "@/lib/auth";
import { requireBookingModuleAccessForCurrentUser } from "@/lib/require-booking-module-access";

const serviceSchema = z.object({
  name: z.string().trim().min(1).max(80),
  durationMinutes: z.number().int().min(5).max(480),
  priceCents: z.number().int().min(0).max(999_999_99),
  bufferAfterMinutes: z.number().int().min(0).max(120),
  isActive: z.boolean().optional(),
});

type ActionResult = { success: true } | { error: string };

export async function createBookingServiceAction(
  input: z.infer<typeof serviceSchema>,
): Promise<ActionResult> {
  const authResult = await requireAuth();
  if ("error" in authResult) return { error: authResult.error };
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) return { error: access.error };
  const tenantId = access.tenantId;

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
  const authResult = await requireAuth();
  if ("error" in authResult) return { error: authResult.error };
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) return { error: access.error };
  const tenantId = access.tenantId;

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
  const authResult = await requireAuth();
  if ("error" in authResult) return { error: authResult.error };
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) return { error: access.error };
  const tenantId = access.tenantId;

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
  const authResult = await requireAuth();
  if ("error" in authResult) return { error: authResult.error };
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) return { error: access.error };
  const tenantId = access.tenantId;

  try {
    await reorderBookingServices(tenantId, orderedIds);
    revalidatePath("/services");
    return { success: true };
  } catch {
    return { error: "No se pudo reordenar los servicios" };
  }
}

export async function deleteBookingServiceAction(id: string): Promise<ActionResult> {
  const authResult = await requireAuth();
  if ("error" in authResult) return { error: authResult.error };
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) return { error: access.error };
  const tenantId = access.tenantId;

  try {
    await deleteBookingService(tenantId, id);
    revalidatePath("/services");
    return { success: true };
  } catch {
    return { error: "No se pudo eliminar el servicio. Puede tener reservas asociadas." };
  }
}

export async function duplicateBookingServiceAction(id: string): Promise<ActionResult> {
  const authResult = await requireAuth();
  if ("error" in authResult) return { error: authResult.error };
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) return { error: access.error };
  const tenantId = access.tenantId;

  try {
    const source = await getBookingServiceById(tenantId, id);
    if (!source) {
      return { error: "Servicio no encontrado" };
    }

    await createBookingService(tenantId, {
      name: `${source.name} (copia)`,
      durationMinutes: source.durationMinutes,
      priceCents: source.priceCents,
      bufferAfterMinutes: source.bufferAfterMinutes,
      isActive: false,
    });
    revalidatePath("/services");
    return { success: true };
  } catch {
    return { error: "No se pudo duplicar el servicio" };
  }
}
