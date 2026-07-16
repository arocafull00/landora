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
import {
  bookingServiceSchema,
  resourceIdSchema,
  resourceIdsSchema,
} from "@/lib/schemas/booking-admin";

type ActionResult = { success: true } | { error: string };

export async function createBookingServiceAction(
  input: z.infer<typeof bookingServiceSchema>,
): Promise<ActionResult> {
  const authResult = await requireAuth();
  if ("error" in authResult) return { error: authResult.error };
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) return { error: access.error };
  const tenantId = access.tenantId;

  const parsed = bookingServiceSchema.safeParse(input);
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
  input: z.infer<typeof bookingServiceSchema>,
): Promise<ActionResult> {
  const authResult = await requireAuth();
  if ("error" in authResult) return { error: authResult.error };
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) return { error: access.error };
  const tenantId = access.tenantId;

  const parsedId = resourceIdSchema.safeParse(id);
  const parsed = bookingServiceSchema.safeParse(input);
  if (!parsedId.success || !parsed.success) {
    return { error: "Datos inválidos" };
  }

  try {
    const updated = await updateBookingService(tenantId, parsedId.data, parsed.data);
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

  const parsedId = resourceIdSchema.safeParse(id);
  if (!parsedId.success) return { error: "Datos inválidos" };

  try {
    const updated = await setBookingServiceActive(tenantId, parsedId.data, isActive);
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

  const parsedIds = resourceIdsSchema.safeParse(orderedIds);
  if (!parsedIds.success) return { error: "Datos inválidos" };

  try {
    await reorderBookingServices(tenantId, parsedIds.data);
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

  const parsedId = resourceIdSchema.safeParse(id);
  if (!parsedId.success) return { error: "Datos inválidos" };

  try {
    await deleteBookingService(tenantId, parsedId.data);
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

  const parsedId = resourceIdSchema.safeParse(id);
  if (!parsedId.success) return { error: "Datos inválidos" };

  try {
    const source = await getBookingServiceById(tenantId, parsedId.data);
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
