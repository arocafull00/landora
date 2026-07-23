import { cacheLife, cacheTag } from "next/cache";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { getBookingSettings } from "@/data/booking-settings";
import { getUserAddon } from "@/data/user-addons";
import { getUserByInternalId } from "@/data/users";
import { hasBookingModuleAccess } from "@/lib/subscription-access";

export async function resolveTenantBySlug(slug: string) {
  "use cache";

  cacheLife("minutes");
  const landing = await getPublishedLandingBySlug(slug);
  if (!landing) {
    return null;
  }
  cacheTag(`booking-tenant:${landing.userId}`);

  const [settings, user, addon] = await Promise.all([
    getBookingSettings(landing.userId),
    getUserByInternalId(landing.userId),
    getUserAddon(landing.userId, "bookings"),
  ]);

  const moduleEnabled = user
    ? hasBookingModuleAccess({
        type: user.type,
        suspended: user.suspended,
        bookingManualAccess: addon?.manualAccess ?? false,
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
}
