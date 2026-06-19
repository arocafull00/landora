import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getEffectiveClientId, isImpersonating } from "@/lib/auth";
import { getUserByInternalId } from "@/data/users";
import { getLandingPageByUserId } from "@/data/landing-pages";
import { toLandingView } from "@/lib/landing-mapper";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ensureLandingHasDefaultContent } from "@/lib/seed-landing-content";
import type { DashboardView } from "@/lib/dashboard-data";
import { isAdmin } from "@/lib/is-admin";

export async function BookingViewPage({
  view,
  children,
}: {
  view: DashboardView;
  children: ReactNode;
}) {
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

  await ensureLandingHasDefaultContent(dbLanding.id);

  const refreshed = await getLandingPageByUserId(clientId);
  const landing = toLandingView(refreshed ?? dbLanding, user ?? undefined);

  return (
    <DashboardShell
      isAdmin={admin}
      impersonating={impersonating}
      initialLanding={landing}
      initialView={view}
      customContent={children}
    />
  );
}
