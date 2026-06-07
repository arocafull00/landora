import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { clients } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const client = await db.query.clients.findFirst({
    where: eq(clients.clerkUserId, userId),
  });

  if (!client) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-surface-bg">
        <div className="absolute right-4 top-4">
          <UserButton />
        </div>
        <div className="text-center">
          <h1 className="font-headline text-headline-md font-bold text-on-background">
            Cuenta pendiente de configuración
          </h1>
          <p className="mt-2 font-body text-body-md text-on-surface-variant">
            Tu cuenta no tiene ninguna landing asignada todavía. Contacta con el
            administrador.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
