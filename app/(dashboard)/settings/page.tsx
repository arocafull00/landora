import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSubscriptionStatus } from "@/data/subscriptions";
import { SettingsSection } from "@/components/dashboard/settings/settings-section";

export default async function SettingsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const subscription = await getSubscriptionStatus(userId);

  return (
    <SettingsSection
      subscriptionCancelAtPeriodEnd={subscription?.subscriptionCancelAtPeriodEnd ?? null}
      subscriptionCurrentPeriodEnd={subscription?.subscriptionCurrentPeriodEnd ?? null}
      subscriptionStatus={subscription?.subscriptionStatus ?? null}
    />
  );
}
