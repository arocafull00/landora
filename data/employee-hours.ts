import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { employeeHours } from "@/db/schema";
import type { EmployeeHours } from "@/db/schema";
import { assertEmployeeBelongsToTenant } from "@/data/employees";


export async function replaceEmployeeHours(
  tenantId: string,
  employeeId: string,
  hours: Pick<EmployeeHours, "dayOfWeek" | "isWorking" | "startTime" | "endTime">[],
) {
  try {
    if (hours.length === 0) {
      await assertEmployeeBelongsToTenant(tenantId, employeeId);
      await db.delete(employeeHours).where(eq(employeeHours.employeeId, employeeId));
      return [];
    }

    await assertEmployeeBelongsToTenant(tenantId, employeeId);
    await db.delete(employeeHours).where(eq(employeeHours.employeeId, employeeId));
    return await db
      .insert(employeeHours)
      .values(hours.map((h) => ({ employeeId, ...h })))
      .returning();
  } catch (error) {
    if (error instanceof Error && error.message === "Employee not found") {
      throw error;
    }
    throw new Error("Failed to replace employee hours");
  }
}

export async function getEmployeeHoursForDay(
  tenantId: string,
  employeeId: string,
  dayOfWeek: number,
) {
  try {
    await assertEmployeeBelongsToTenant(tenantId, employeeId);
    return await db.query.employeeHours.findFirst({
      where: and(
        eq(employeeHours.employeeId, employeeId),
        eq(employeeHours.dayOfWeek, dayOfWeek),
      ),
    }) ?? null;
  } catch (error) {
    if (error instanceof Error && error.message === "Employee not found") {
      throw error;
    }
    throw new Error("Failed to fetch employee hours for day");
  }
}
