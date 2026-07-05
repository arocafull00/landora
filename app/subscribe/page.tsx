import { redirect } from "next/navigation";
import { SubscribeSection } from "@/components/dashboard/subscribe/subscribe-section";
import { getSubscriptionStatus } from "@/data/subscriptions";
import { getUserByInternalId } from "@/data/users";
import { getEffectiveClientId } from "@/lib/auth";
import { hasDashboardAccess } from "@/lib/subscription-access";
import { getStripePaymentLinkUrl } from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";

export default async function SubscribePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const clientId = await getEffectiveClientId();
  if (!clientId) redirect("/account-pending");

  const user = await getUserByInternalId(clientId);
  if (!user) redirect("/account-pending");

  const subscription = await getSubscriptionStatus(userId);

  if (
    hasDashboardAccess({
      type: user.type,
      accessType: user.accessType,
      suspended: user.suspended,
      subscriptionStatus: subscription?.subscriptionStatus ?? null,
    })
  ) {
    redirect("/editor");
  }

  const paymentLink = getStripePaymentLinkUrl(user.clerkUserId);

  return (
    <div className="min-h-screen bg-canvas">
      <SubscribeSection paymentLink={paymentLink} />
    </div>
  );
}
