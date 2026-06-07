import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { clients, landingPages } from "@/db/schema";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import type { Landing, LandingContent } from "@/lib/dashboard-data";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const client = await db.query.clients.findFirst({
    where: eq(clients.clerkUserId, userId),
  });

  if (!client) {
    redirect("/sign-in");
  }

  const dbLanding = await db.query.landingPages.findFirst({
    where: eq(landingPages.clientId, client.id),
  });

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
    owner: client.name,
    template: "toll-story",
    content: dbLanding.contentJson as LandingContent,
  };

  return <DashboardShell initialLanding={landing} />;
}
