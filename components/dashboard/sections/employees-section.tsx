import { getEffectiveClientId } from "@/lib/auth";
import { getEmployeesWithDetails } from "@/data/employees";
import { getBookingServices } from "@/data/booking-services";
import { EmployeesSectionClient } from "@/components/dashboard/booking/employees/employees-section-client";
import type { EmployeeHours } from "@/db/schema";

export async function EmployeesSection() {
  const tenantId = await getEffectiveClientId();
  if (!tenantId) {
    return null;
  }

  const [employeesWithDetails, services] = await Promise.all([
    getEmployeesWithDetails(tenantId),
    getBookingServices(tenantId, { activeOnly: false }),
  ]);

  const hoursByEmployee: Record<string, EmployeeHours[]> = {};
  const servicesByEmployee: Record<string, string[]> = {};

  for (const employee of employeesWithDetails) {
    hoursByEmployee[employee.id] = employee.hours;
    servicesByEmployee[employee.id] = employee.services.map((s) => s.serviceId);
  }

  return (
    <EmployeesSectionClient
      employees={employeesWithDetails}
      services={services}
      hoursByEmployee={hoursByEmployee}
      servicesByEmployee={servicesByEmployee}
    />
  );
}
