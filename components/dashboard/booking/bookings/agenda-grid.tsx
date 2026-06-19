import type { Booking, BookingStatus, Employee } from "@/db/schema";
import { AgendaBookingCard } from "@/components/dashboard/booking/bookings/agenda-booking-card";

const HOURS = Array.from({ length: 14 }, (_, i) => i + 8);

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
            bookings={bookings}
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
  bookings,
}: {
  hour: number;
  date: string;
  timezone: string;
  employees: Employee[];
  bookings: (Booking & { employee: Employee | null })[];
}) {
  return (
    <>
      <div className="border-b border-outline-variant p-2 font-body text-body-xs text-on-surface-variant">
        {String(hour).padStart(2, "0")}:00
      </div>
      {employees.map((employee) => (
        <div
          key={`${hour}-${employee.id}`}
          className="relative min-h-16 border-b border-l border-outline-variant"
        >
          {bookings
            .filter((b) => b.employeeId === employee.id)
            .map((booking) => (
              <AgendaBookingCard
                key={booking.id}
                booking={booking}
                timezone={timezone}
                date={date}
                gridStartHour={8}
              />
            ))}
        </div>
      ))}
    </>
  );
}
