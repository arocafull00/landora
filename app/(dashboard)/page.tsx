import { redirect } from "next/navigation";
import { getEffectiveClientId } from "@/lib/auth";
import { getUserByInternalId } from "@/data/users";
import { getLandingPageByUserId } from "@/data/landing-pages";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import type { Landing } from "@/lib/dashboard-data";
import { parseLandingContent } from "@/lib/landing-schema";

export default async function DashboardPage() {
  const clientId = await getEffectiveClientId();

  if (!clientId) {
    redirect("/sign-in");
  }

  const [user, dbLanding] = await Promise.all([
    getUserByInternalId(clientId),
    getLandingPageByUserId(clientId),
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

  const landing: Landing = {
    id: dbLanding.id,
    name: dbLanding.name,
    slug: dbLanding.slug,
    status: dbLanding.published ? "Published" : "Draft",
    edited: dbLanding.updatedAt
      ? new Intl.DateTimeFormat("es", { dateStyle: "short", timeStyle: "short" }).format(new Date(dbLanding.updatedAt))
      : "—",
    seoTitle: dbLanding.name,
    owner: user?.name ?? "—",
    template: (dbLanding.template as "toll-story" | "velar") ?? "toll-story",
    content: parseLandingContent(dbLanding.contentJson),
  };

  return <DashboardShell initialLanding={landing} />;
}
