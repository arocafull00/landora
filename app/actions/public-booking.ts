"use server";

import { getBookingServices } from "@/data/booking-services";
import { getEmployeesForService } from "@/data/employee-services";
import { getAvailableSlots } from "@/lib/booking/availability";
import { resolveTenantBySlug } from "@/lib/booking/resolve-tenant";

type ServiceItem = { id: string; name: string; durationMinutes: number };
type EmployeeItem = { id: string; name: string };
type SlotItem = { startsAt: string; endsAt: string; employeeId: string };

export async function getPublicBookingServicesAction(slug: string) {
  const tenant = await resolveTenantBySlug(slug);
  if (!tenant || !tenant.enabled) {
    return { error: "Not found" };
  }

  const services = await getBookingServices(tenant.tenantId, { activeOnly: true });

  return {
    data: services.map((service) => ({
      id: service.id,
      name: service.name,
      durationMinutes: service.durationMinutes,
    })) satisfies ServiceItem[],
  };
}

export async function getPublicBookingEmployeesAction(slug: string, serviceId: string) {
  const tenant = await resolveTenantBySlug(slug);
  if (!tenant || !tenant.enabled) {
    return { error: "Not found" };
  }

  const employees = await getEmployeesForService(tenant.tenantId, serviceId);

  return {
    data: employees.map((employee) => ({
      id: employee.id,
      name: employee.name,
    })) satisfies EmployeeItem[],
  };
}

export async function getPublicBookingSlotsAction(
  slug: string,
  serviceId: string,
  employeeId: string,
  date: string,
) {
  const tenant = await resolveTenantBySlug(slug);
  if (!tenant || !tenant.enabled) {
    return { error: "Not found" };
  }

  const slots = await getAvailableSlots({
    tenantId: tenant.tenantId,
    serviceId,
    employeeId: employeeId === "any" ? "any" : employeeId,
    date,
    timezone: tenant.timezone,
  });

  return {
    data: slots.map((slot) => ({
      startsAt: slot.startsAt.toISOString(),
      endsAt: slot.endsAt.toISOString(),
      employeeId: slot.employeeId,
    })) satisfies SlotItem[],
  };
}
