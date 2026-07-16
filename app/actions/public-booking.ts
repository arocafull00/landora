"use server";

import { getBookingServices } from "@/data/booking-services";
import { getEmployeesForService } from "@/data/employee-services";
import { getAvailableSlots } from "@/lib/booking/availability";
import { resolveTenantBySlug } from "@/lib/booking/resolve-tenant";
import {
  publicBookingEmployeesSchema,
  publicBookingServicesSchema,
  publicBookingSlotsSchema,
} from "@/lib/schemas/booking";

type ServiceItem = { id: string; name: string; durationMinutes: number };
type EmployeeItem = { id: string; name: string };
type SlotItem = { startsAt: string; endsAt: string; employeeId: string };

export async function getPublicBookingServicesAction(slug: string) {
  const parsed = publicBookingServicesSchema.safeParse({ slug });
  if (!parsed.success) {
    return { error: "Invalid request" };
  }

  const tenant = await resolveTenantBySlug(parsed.data.slug);
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
  const parsed = publicBookingEmployeesSchema.safeParse({ slug, serviceId });
  if (!parsed.success) {
    return { error: "Invalid request" };
  }

  const tenant = await resolveTenantBySlug(parsed.data.slug);
  if (!tenant || !tenant.enabled) {
    return { error: "Not found" };
  }

  const employees = await getEmployeesForService(
    tenant.tenantId,
    parsed.data.serviceId,
  );

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
  const parsed = publicBookingSlotsSchema.safeParse({
    slug,
    serviceId,
    employeeId,
    date,
  });
  if (!parsed.success) {
    return { error: "Invalid request" };
  }

  const tenant = await resolveTenantBySlug(parsed.data.slug);
  if (!tenant || !tenant.enabled) {
    return { error: "Not found" };
  }

  const slots = await getAvailableSlots({
    tenantId: tenant.tenantId,
    serviceId: parsed.data.serviceId,
    employeeId: parsed.data.employeeId,
    date: parsed.data.date,
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
