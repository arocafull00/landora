import { redirect } from "next/navigation";
import { BookingUpgradeSection } from "@/components/dashboard/booking-upgrade/booking-upgrade-section";
import { getUserAddon } from "@/data/user-addons";
import { getUserByInternalId } from "@/data/users";
import { getEffectiveClientId } from "@/lib/auth";
import { hasBookingModuleAccess } from "@/lib/subscription-access";
import { getStripeBookingPaymentLinkUrl } from "@/lib/stripe";

export default async function BookingUpgradePage() {
  const clientId = await getEffectiveClientId();
  if (!clientId) redirect("/sign-in");

  const user = await getUserByInternalId(clientId);
  if (!user) redirect("/sign-in");

  const bookingsAddon = await getUserAddon(clientId, "bookings");

  if (
    hasBookingModuleAccess({
      type: user.type,
      accessType: user.accessType,
      suspended: user.suspended,
      bookingAddonStatus: bookingsAddon?.status ?? null,
    })
  ) {
    redirect("/bookings");
  }

  const paymentLink = getStripeBookingPaymentLinkUrl(user.clerkUserId);

  return <BookingUpgradeSection paymentLink={paymentLink} />;
}
