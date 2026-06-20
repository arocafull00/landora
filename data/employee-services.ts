import { cache } from "react";
import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { employeeServices, employees, bookingServices } from "@/db/schema";
import { assertEmployeeBelongsToTenant } from "@/data/employees";
import { assertServiceBelongsToTenant } from "@/data/booking-services";

const getServicesForEmployee = cache(async (tenantId: string, employeeId: string) => {
  try {
    await assertEmployeeBelongsToTenant(tenantId, employeeId);
    const links = await db.query.employeeServices.findMany({
      where: eq(employeeServices.employeeId, employeeId),
    });
    if (links.length === 0) {
      return [];
    }
    const serviceIds = links.map((l) => l.serviceId);
    return await db.query.bookingServices.findMany({
      where: and(
        eq(bookingServices.tenantId, tenantId),
        inArray(bookingServices.id, serviceIds),
      ),
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Employee not found") {
      throw error;
    }
    throw new Error("Failed to fetch services for employee");
  }
});

export const getEmployeesForService = cache(async (tenantId: string, serviceId: string) => {
  try {
    await assertServiceBelongsToTenant(tenantId, serviceId);
    const links = await db.query.employeeServices.findMany({
      where: eq(employeeServices.serviceId, serviceId),
    });
    if (links.length === 0) {
      return [];
    }
    const employeeIds = links.map((l) => l.employeeId);
    return await db.query.employees.findMany({
      where: and(
        eq(employees.tenantId, tenantId),
        eq(employees.isActive, true),
        inArray(employees.id, employeeIds),
      ),
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Service not found") {
      throw error;
    }
    throw new Error("Failed to fetch employees for service");
  }
});

export async function replaceEmployeeServices(
  tenantId: string,
  employeeId: string,
  serviceIds: string[],
) {
  try {
    if (serviceIds.length === 0) {
      await assertEmployeeBelongsToTenant(tenantId, employeeId);
      await db.delete(employeeServices).where(eq(employeeServices.employeeId, employeeId));
      return;
    }

    await assertEmployeeBelongsToTenant(tenantId, employeeId);
    await Promise.all(
      serviceIds.map((serviceId) => assertServiceBelongsToTenant(tenantId, serviceId)),
    );
    await db.delete(employeeServices).where(eq(employeeServices.employeeId, employeeId));
    await db
      .insert(employeeServices)
      .values(serviceIds.map((serviceId) => ({ employeeId, serviceId })));
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === "Employee not found" || error.message === "Service not found")
    ) {
      throw error;
    }
    throw new Error("Failed to replace employee services");
  }
}
