import { BookingViewPage } from "@/components/dashboard/booking/booking-view-page";
import { ServicesSection } from "@/components/dashboard/sections/services-section";

export default async function ServicesPage() {
  return (
    <BookingViewPage view="services">
      <ServicesSection />
    </BookingViewPage>
  );
}
