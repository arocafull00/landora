import { cache } from "react";
import { and, asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { employees, employeeHours } from "@/db/schema";

export const getEmployees = cache(async (tenantId: string, activeOnly = false) => {
  try {
    const conditions = activeOnly
      ? and(eq(employees.tenantId, tenantId), eq(employees.isActive, true))
      : eq(employees.tenantId, tenantId);
    return await db.query.employees.findMany({
      where: conditions,
      orderBy: [asc(employees.createdAt)],
    });
  } catch {
    throw new Error("Failed to fetch employees");
  }
});

export const getEmployeesWithDetails = cache(async (tenantId: string) => {
  try {
    return await db.query.employees.findMany({
      where: eq(employees.tenantId, tenantId),
      orderBy: [asc(employees.createdAt)],
      with: {
        hours: {
          orderBy: [asc(employeeHours.dayOfWeek)],
        },
        services: true,
      },
    });
  } catch {
    throw new Error("Failed to fetch employees with details");
  }
});

export const getEmployeeById = cache(async (tenantId: string, id: string) => {
  try {
    return await db.query.employees.findFirst({
      where: and(eq(employees.tenantId, tenantId), eq(employees.id, id)),
    }) ?? null;
  } catch {
    throw new Error("Failed to fetch employee");
  }
});

export async function createEmployee(tenantId: string, name: string, isActive = true) {
  try {
    const [row] = await db
      .insert(employees)
      .values({ tenantId, name, isActive })
      .returning();
    return row;
  } catch {
    throw new Error("Failed to create employee");
  }
}

export async function updateEmployee(tenantId: string, id: string, name: string) {
  try {
    const [row] = await db
      .update(employees)
      .set({ name, updatedAt: new Date() })
      .where(and(eq(employees.tenantId, tenantId), eq(employees.id, id)))
      .returning();
    return row ?? null;
  } catch {
    throw new Error("Failed to update employee");
  }
}

export async function setEmployeeActive(tenantId: string, id: string, isActive: boolean) {
  try {
    const [row] = await db
      .update(employees)
      .set({ isActive, updatedAt: new Date() })
      .where(and(eq(employees.tenantId, tenantId), eq(employees.id, id)))
      .returning();
    return row ?? null;
  } catch {
    throw new Error("Failed to update employee status");
  }
}

export async function deleteEmployee(tenantId: string, id: string) {
  try {
    await db
      .delete(employees)
      .where(and(eq(employees.tenantId, tenantId), eq(employees.id, id)));
  } catch {
    throw new Error("Failed to delete employee");
  }
}

export async function assertEmployeeBelongsToTenant(tenantId: string, employeeId: string) {
  const employee = await getEmployeeById(tenantId, employeeId);
  if (!employee) {
    throw new Error("Employee not found");
  }
  return employee;
}
