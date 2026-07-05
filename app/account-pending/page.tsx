import { redirect } from "next/navigation";
import { AccountPendingSection } from "@/components/auth/account-pending-section";
import { getSubscriptionStatus } from "@/data/subscriptions";
import { getCurrentUser } from "@/data/users";
import { hasDashboardAccess } from "@/lib/subscription-access";
import { auth } from "@clerk/nextjs/server";

export default async function AccountPendingPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await getCurrentUser();
  if (user) {
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

    redirect("/subscribe");
  }

  return <AccountPendingSection />;
}
