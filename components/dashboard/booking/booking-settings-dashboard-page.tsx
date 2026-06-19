import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getEffectiveClientId, isImpersonating } from "@/lib/auth";
import { getUserByInternalId } from "@/data/users";
import { getLandingPageByUserId } from "@/data/landing-pages";
import { getBookingSettings } from "@/data/booking-settings";
import { toLandingView } from "@/lib/landing-mapper";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { BookingSettingsForm } from "@/components/dashboard/booking/booking-settings-form";
import { ensureLandingHasDefaultContent } from "@/lib/seed-landing-content";
import { isAdmin } from "@/lib/is-admin";

export async function BookingSettingsDashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const clientId = await getEffectiveClientId();
  if (!clientId) {
    redirect("/sign-in");
  }

  const [user, dbLanding, impersonating, admin, settings] = await Promise.all([
    getUserByInternalId(clientId),
    getLandingPageByUserId(clientId),
    isImpersonating(),
    isAdmin(),
    getBookingSettings(clientId),
  ]);

  if (!dbLanding) {
    redirect("/editor");
  }

  await ensureLandingHasDefaultContent(dbLanding.id);

  const refreshed = await getLandingPageByUserId(clientId);
  const landing = toLandingView(refreshed ?? dbLanding, user ?? undefined);

  return (
    <DashboardShell
      isAdmin={admin}
      impersonating={impersonating}
      initialLanding={landing}
      initialView="bookings"
      settingsContent={<BookingSettingsForm settings={settings} />}
    />
  );
}
