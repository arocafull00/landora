import { getEffectiveClientId } from "@/lib/auth";
import { getBookingServices } from "@/data/booking-services";
import { ServicesSectionClient } from "@/components/dashboard/booking/services/services-section-client";

export async function ServicesSection() {
  const tenantId = await getEffectiveClientId();
  if (!tenantId) {
    return null;
  }

  const services = await getBookingServices(tenantId);

  return <ServicesSectionClient services={services} />;
}
