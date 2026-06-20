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

const nameSchema = z.string().trim().min(1).max(80);

const hoursSchema = z.array(
  z.object({
    dayOfWeek: z.number().int().min(0).max(6),
    isWorking: z.boolean(),
    startTime: z.string().regex(/^\d{2}:\d{2}$/),
    endTime: z.string().regex(/^\d{2}:\d{2}$/),
  }),
);

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

  const parsed = nameSchema.safeParse(name);
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

  const parsed = nameSchema.safeParse(name);
  if (!parsed.success) {
    return { error: "Nombre inválido" };
  }

  try {
    const updated = await updateEmployee(tenantId, id, parsed.data);
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

  try {
    const updated = await setEmployeeActive(tenantId, id, isActive);
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

  try {
    await deleteEmployee(tenantId, id);
    revalidatePath("/employees");
    return { success: true };
  } catch {
    return { error: "No se pudo eliminar el empleado" };
  }
}

export async function replaceEmployeeHoursAction(
  employeeId: string,
  hours: z.infer<typeof hoursSchema>,
): Promise<ActionResult> {
  const authResult = await requireAuth();
  if ("error" in authResult) return { error: authResult.error };
  const access = await requireBookingModuleAccessForCurrentUser();
  if ("error" in access) return { error: access.error };
  const tenantId = access.tenantId;

  const parsed = hoursSchema.safeParse(hours);
  if (!parsed.success) {
    return { error: "Horario inválido" };
  }

  try {
    await replaceEmployeeHours(tenantId, employeeId, parsed.data);
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

  try {
    await replaceEmployeeServices(tenantId, employeeId, serviceIds);
    revalidatePath("/employees");
    return { success: true };
  } catch {
    return { error: "No se pudieron guardar los servicios" };
  }
}
