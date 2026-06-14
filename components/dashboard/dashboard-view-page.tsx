import { redirect } from "next/navigation";
import { getEffectiveClientId, isImpersonating } from "@/lib/auth";
import { getUserByInternalId } from "@/data/users";
import { getLandingPageByUserId } from "@/data/landing-pages";
import { toLandingView } from "@/lib/landing-mapper";
import { DashboardAccountActions } from "@/components/dashboard/dashboard-account-actions";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ensureLandingHasDefaultContent } from "@/data/seed-landing-sections";
import { DashboardView } from "@/lib/dashboard-data";
import { isAdmin } from "@/lib/is-admin";

export async function DashboardViewPage({ view }: { view: DashboardView }) {
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
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-surface-bg">
        {!admin ? (
          <div className="absolute right-4 top-4">
            <DashboardAccountActions />
          </div>
        ) : null}
        <div className="text-center">
          <h1 className="font-headline text-headline-lg font-semibold text-on-background">
            No hay ninguna landing asignada
          </h1>
          <p className="mt-2 font-body text-body-md text-on-surface-variant">
            Contacta con el administrador para que configure tu página.
          </p>
        </div>
      </div>
    );
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
    />
  );
}
