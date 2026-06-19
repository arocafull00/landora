import { cache } from "react";
import { getLandingPageBySlug } from "@/data/landing-pages";
import { getBookingSettings } from "@/data/booking-settings";
import { getUserAddon } from "@/data/user-addons";
import { getUserByInternalId } from "@/data/users";
import { hasBookingModuleAccess } from "@/lib/subscription-access";

export const resolveTenantBySlug = cache(async (slug: string) => {
  const landing = await getLandingPageBySlug(slug);
  if (!landing) {
    return null;
  }

  const [settings, user, addon] = await Promise.all([
    getBookingSettings(landing.userId),
    getUserByInternalId(landing.userId),
    getUserAddon(landing.userId, "bookings"),
  ]);

  const moduleEnabled = user
    ? hasBookingModuleAccess({
        type: user.type,
        accessType: user.accessType,
        suspended: user.suspended,
        bookingAddonStatus: addon?.status ?? null,
      })
    : false;

  return {
    tenantId: landing.userId,
    timezone: settings.timezone,
    enabled: settings.enabled && moduleEnabled,
    moduleEnabled,
    landingId: landing.id,
  };
});
