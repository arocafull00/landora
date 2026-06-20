import type { Booking, Employee } from "@/db/schema";
import { toZonedTime } from "date-fns-tz";
import { AgendaBookingCard } from "@/components/dashboard/booking/bookings/agenda-booking-card";

const HOURS = Array.from({ length: 14 }, (_, i) => i + 8);

function groupBookingsByEmployee(
  bookings: (Booking & { employee: Employee | null })[],
) {
  const bookingsByEmployee = new Map<string, (Booking & { employee: Employee | null })[]>();
  for (const booking of bookings) {
    const employeeBookings = bookingsByEmployee.get(booking.employeeId);
    if (employeeBookings) {
      employeeBookings.push(booking);
      continue;
    }
    bookingsByEmployee.set(booking.employeeId, [booking]);
  }
  return bookingsByEmployee;
}

export function AgendaGrid({
  bookings,
  employees,
  timezone,
  date,
}: {
  bookings: (Booking & { employee: Employee | null })[];
  employees: Employee[];
  timezone: string;
  date: string;
}) {
  const activeEmployees = employees.filter((e) => e.isActive);
  const bookingsByEmployee = groupBookingsByEmployee(bookings);

  if (activeEmployees.length === 0) {
    return (
      <p className="font-body text-body-md text-on-surface-variant">
        No hay empleados activos para mostrar la agenda.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-outline-variant">
      <div
        className="grid min-w-max"
        style={{
          gridTemplateColumns: `4rem repeat(${activeEmployees.length}, minmax(8rem, 1fr))`,
        }}
      >
        <div className="border-b border-outline-variant bg-surface-container p-2" />
        {activeEmployees.map((employee) => (
          <div
            key={employee.id}
            className="border-b border-l border-outline-variant bg-surface-container p-2 font-body text-body-sm font-medium"
          >
            {employee.name}
          </div>
        ))}
        {HOURS.map((hour) => (
          <AgendaHourRow
            key={hour}
            hour={hour}
            date={date}
            timezone={timezone}
            employees={activeEmployees}
            bookingsByEmployee={bookingsByEmployee}
          />
        ))}
      </div>
    </div>
  );
}

function AgendaHourRow({
  hour,
  date,
  timezone,
  employees,
  bookingsByEmployee,
}: {
  hour: number;
  date: string;
  timezone: string;
  employees: Employee[];
  bookingsByEmployee: Map<string, (Booking & { employee: Employee | null })[]>;
}) {
  return (
    <>
      <div className="border-b border-outline-variant p-2 font-body text-body-xs text-on-surface-variant">
        {String(hour).padStart(2, "0")}:00
      </div>
      {employees.map((employee) => {
        const employeeBookings = bookingsByEmployee.get(employee.id) ?? [];
        const hourBookings = employeeBookings.filter((booking) => {
          const zonedStart = toZonedTime(booking.startsAt, timezone);
          const bookingDate = `${zonedStart.getFullYear()}-${String(zonedStart.getMonth() + 1).padStart(2, "0")}-${String(zonedStart.getDate()).padStart(2, "0")}`;
          return bookingDate === date && zonedStart.getHours() === hour;
        });
        return (
          <div
            key={`${hour}-${employee.id}`}
            className="relative min-h-16 overflow-visible border-b border-l border-outline-variant"
          >
            {hourBookings.map((booking) => (
              <AgendaBookingCard
                key={booking.id}
                booking={booking}
                timezone={timezone}
              />
            ))}
          </div>
        );
      })}
    </>
  );
}
