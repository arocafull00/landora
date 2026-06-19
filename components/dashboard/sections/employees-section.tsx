import { getEffectiveClientId } from "@/lib/auth";
import { getEmployees } from "@/data/employees";
import { getBookingServices } from "@/data/booking-services";
import { getEmployeeHours } from "@/data/employee-hours";
import { getServicesForEmployee } from "@/data/employee-services";
import { EmployeesSectionClient } from "@/components/dashboard/booking/employees/employees-section-client";

export async function EmployeesSection() {
  const tenantId = await getEffectiveClientId();
  if (!tenantId) {
    return null;
  }

  const [employees, services] = await Promise.all([
    getEmployees(tenantId),
    getBookingServices(tenantId, { activeOnly: false }),
  ]);

  const hoursByEmployee: Record<string, Awaited<ReturnType<typeof getEmployeeHours>>> = {};
  const servicesByEmployee: Record<string, string[]> = {};

  await Promise.all(
    employees.map(async (employee) => {
      const [hours, employeeServices] = await Promise.all([
        getEmployeeHours(tenantId, employee.id),
        getServicesForEmployee(tenantId, employee.id),
      ]);
      hoursByEmployee[employee.id] = hours;
      servicesByEmployee[employee.id] = employeeServices.map((s) => s.id);
    }),
  );

  return (
    <EmployeesSectionClient
      employees={employees}
      services={services}
      hoursByEmployee={hoursByEmployee}
      servicesByEmployee={servicesByEmployee}
    />
  );
}
