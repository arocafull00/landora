import { redirect } from "next/navigation";
import { getEffectiveClientId, isImpersonating } from "@/lib/auth";
import { getUserByInternalId } from "@/data/users";
import { getLandingPageByUserId } from "@/data/landing-pages";
import { toLandingView } from "@/lib/landing-mapper";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ensureLandingHasDefaultContent } from "@/data/seed-landing-sections";
import { DashboardView } from "@/lib/dashboard-data";

export async function DashboardViewPage({ view }: { view: DashboardView }) {
  const clientId = await getEffectiveClientId();

  if (!clientId) {
    redirect("/sign-in");
  }

  const [user, dbLanding, impersonating] = await Promise.all([
    getUserByInternalId(clientId),
    getLandingPageByUserId(clientId),
    isImpersonating(),
  ]);

  if (!dbLanding) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-bg">
        <div className="text-center">
          <h1 className="font-headline text-headline-md font-bold text-on-background">
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
      impersonating={impersonating}
      initialLanding={landing}
      initialView={view}
    />
  );
}
