"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  createEmployee,
  deleteEmployee,
  setEmployeeActive,
  updateEmployee,
} from "@/data/employees";
import { replaceEmployeeHours } from "@/data/employee-hours";
import { replaceEmployeeServices } from "@/data/employee-services";
import { DEFAULT_HOUR_DRAFTS } from "@/lib/employee-schedule";
import { requireAuth } from "@/lib/auth";
import { requireBookingModuleAccessForCurrentUser } from "@/lib/require-booking-module-access";
import {
  employeeHoursSchema,
  employeeNameSchema,
  resourceIdSchema,
  resourceIdsSchema,
} from "@/lib/schemas/booking-admin";

type ActionResult = { success: true } | { error: string };

export async function createEmployeeAction(
  name: string,
  isActive = true,
): Promise<ActionResult> {
  const authResult = await requireAuth();
  if ("error" in authResult) return { error: authResult.error };
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) return { error: access.error };
  const tenantId = access.tenantId;

  const parsed = employeeNameSchema.safeParse(name);
  if (!parsed.success) {
    return { error: "Nombre inválido" };
  }

  try {
    const employee = await createEmployee(tenantId, parsed.data, isActive);
    await replaceEmployeeHours(tenantId, employee.id, DEFAULT_HOUR_DRAFTS);
    revalidatePath("/employees");
    return { success: true };
  } catch {
    return { error: "No se pudo crear el empleado" };
  }
}

export async function updateEmployeeAction(id: string, name: string): Promise<ActionResult> {
  const authResult = await requireAuth();
  if ("error" in authResult) return { error: authResult.error };
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) return { error: access.error };
  const tenantId = access.tenantId;

  const parsedId = resourceIdSchema.safeParse(id);
  const parsed = employeeNameSchema.safeParse(name);
  if (!parsedId.success || !parsed.success) {
    return { error: "Nombre inválido" };
  }

  try {
    const updated = await updateEmployee(tenantId, parsedId.data, parsed.data);
    if (!updated) {
      return { error: "Empleado no encontrado" };
    }
    revalidatePath("/employees");
    return { success: true };
  } catch {
    return { error: "No se pudo actualizar el empleado" };
  }
}

export async function setEmployeeActiveAction(
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
    const updated = await setEmployeeActive(tenantId, parsedId.data, isActive);
    if (!updated) {
      return { error: "Empleado no encontrado" };
    }
    revalidatePath("/employees");
    revalidatePath("/bookings");
    return { success: true };
  } catch {
    return { error: "No se pudo actualizar el empleado" };
  }
}

export async function deleteEmployeeAction(id: string): Promise<ActionResult> {
  const authResult = await requireAuth();
  if ("error" in authResult) return { error: authResult.error };
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) return { error: access.error };
  const tenantId = access.tenantId;

  const parsedId = resourceIdSchema.safeParse(id);
  if (!parsedId.success) return { error: "Datos inválidos" };

  try {
    await deleteEmployee(tenantId, parsedId.data);
    revalidatePath("/employees");
    return { success: true };
  } catch {
    return { error: "No se pudo eliminar el empleado" };
  }
}

export async function replaceEmployeeHoursAction(
  employeeId: string,
  hours: z.infer<typeof employeeHoursSchema>,
): Promise<ActionResult> {
  const authResult = await requireAuth();
  if ("error" in authResult) return { error: authResult.error };
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) return { error: access.error };
  const tenantId = access.tenantId;

  const parsedId = resourceIdSchema.safeParse(employeeId);
  const parsed = employeeHoursSchema.safeParse(hours);
  if (!parsedId.success || !parsed.success) {
    return { error: "Horario inválido" };
  }

  try {
    await replaceEmployeeHours(tenantId, parsedId.data, parsed.data);
    revalidatePath("/employees");
    return { success: true };
  } catch {
    return { error: "No se pudo guardar el horario" };
  }
}

export async function replaceEmployeeServicesAction(
  employeeId: string,
  serviceIds: string[],
): Promise<ActionResult> {
  const authResult = await requireAuth();
  if ("error" in authResult) return { error: authResult.error };
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) return { error: access.error };
  const tenantId = access.tenantId;

  const parsedEmployeeId = resourceIdSchema.safeParse(employeeId);
  const parsedServiceIds = resourceIdsSchema.safeParse(serviceIds);
  if (!parsedEmployeeId.success || !parsedServiceIds.success) {
    return { error: "Datos inválidos" };
  }

  try {
    await replaceEmployeeServices(
      tenantId,
      parsedEmployeeId.data,
      parsedServiceIds.data,
    );
    revalidatePath("/employees");
    return { success: true };
  } catch {
    return { error: "No se pudieron guardar los servicios" };
  }
}
