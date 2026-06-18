import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getEffectiveClientId, isImpersonating } from "@/lib/auth";
import { getUserByInternalId } from "@/data/users";
import { getLandingPageByUserId } from "@/data/landing-pages";
import { getSubscriptionStatus } from "@/data/subscriptions";
import { toLandingView } from "@/lib/landing-mapper";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SettingsSection } from "@/components/dashboard/settings/settings-section";
import { ensureLandingHasDefaultContent } from "@/lib/seed-landing-content";
import { isAdmin } from "@/lib/is-admin";

export async function SettingsDashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const clientId = await getEffectiveClientId();
  if (!clientId) {
    redirect("/sign-in");
  }

  const [user, dbLanding, impersonating, admin] = await Promise.all([
    getUserByInternalId(clientId),
    getLandingPageByUserId(clientId),
    isImpersonating(),
    isAdmin(),
  ]);

  if (!dbLanding) {
    redirect("/editor");
  }

  const subscription = user ? await getSubscriptionStatus(user.clerkUserId) : null;

  await ensureLandingHasDefaultContent(dbLanding.id);

  const refreshed = await getLandingPageByUserId(clientId);
  const landing = toLandingView(refreshed ?? dbLanding, user ?? undefined);

  return (
    <DashboardShell
      isAdmin={admin}
      impersonating={impersonating}
      initialLanding={landing}
      initialView="editor"
      settingsContent={
        <SettingsSection
          subscriptionCancelAtPeriodEnd={subscription?.subscriptionCancelAtPeriodEnd ?? null}
          subscriptionCurrentPeriodEnd={subscription?.subscriptionCurrentPeriodEnd ?? null}
          subscriptionStatus={subscription?.subscriptionStatus ?? null}
        />
      }
    />
  );
}
