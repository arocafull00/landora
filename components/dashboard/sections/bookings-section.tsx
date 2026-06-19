import { format } from "date-fns";
import { getEffectiveClientId } from "@/lib/auth";
import { getBookings, getBookingsForDay } from "@/data/bookings";
import { getEmployees } from "@/data/employees";
import { getBookingSettings } from "@/data/booking-settings";
import { getDayBoundsInUtc } from "@/lib/booking/timezone";
import type { BookingStatus } from "@/db/schema";
import { BookingsSectionClient } from "@/components/dashboard/booking/bookings/bookings-section-client";

export async function BookingsSection({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const tenantId = await getEffectiveClientId();
  if (!tenantId) {
    return null;
  }

  const params = await searchParams;
  const view = typeof params.view === "string" ? params.view : "list";
  const date =
    typeof params.date === "string" ? params.date : format(new Date(), "yyyy-MM-dd");
  const status = (typeof params.status === "string" ? params.status : "") as BookingStatus | "";
  const employeeId = typeof params.employeeId === "string" ? params.employeeId : "";

  const settings = await getBookingSettings(tenantId);
  const employees = await getEmployees(tenantId);

  let bookings;

  if (view === "agenda") {
    const { dayStart, dayEnd } = getDayBoundsInUtc(date, settings.timezone);
    bookings = await getBookingsForDay(tenantId, dayStart, dayEnd);
  } else {
    const filters: Parameters<typeof getBookings>[1] = {};
    if (status) {
      filters.status = status;
    }
    if (employeeId) {
      filters.employeeId = employeeId;
    }
    if (typeof params.dateFrom === "string") {
      filters.rangeStart = new Date(`${params.dateFrom}T00:00:00`);
    }
    if (typeof params.dateTo === "string") {
      filters.rangeEnd = new Date(`${params.dateTo}T23:59:59`);
    }
    bookings = await getBookings(tenantId, filters);
  }

  return (
    <BookingsSectionClient
      bookings={bookings}
      employees={employees}
      settings={settings}
      view={view}
      date={date}
      status={status}
      employeeId={employeeId}
    />
  );
}
