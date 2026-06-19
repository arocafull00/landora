import { BookingViewPage } from "@/components/dashboard/booking/booking-view-page";
import { EmployeesSection } from "@/components/dashboard/sections/employees-section";

export default async function EmployeesPage() {
  return (
    <BookingViewPage view="employees">
      <EmployeesSection />
    </BookingViewPage>
  );
}
