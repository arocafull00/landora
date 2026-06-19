import { cache } from "react";
import { getLandingPageBySlug } from "@/data/landing-pages";
import { getBookingSettings } from "@/data/booking-settings";

export const resolveTenantBySlug = cache(async (slug: string) => {
  const landing = await getLandingPageBySlug(slug);
  if (!landing) {
    return null;
  }

  const settings = await getBookingSettings(landing.userId);

  return {
    tenantId: landing.userId,
    timezone: settings.timezone,
    enabled: settings.enabled,
    landingId: landing.id,
  };
});
