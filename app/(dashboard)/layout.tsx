import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { isAdmin } from "@/lib/is-admin";
import { isImpersonating, getEffectiveClientId } from "@/lib/auth";
import { getUserByInternalId } from "@/data/users";
import { ImpersonationBanner } from "@/components/dashboard/impersonation-banner";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (await isAdmin() && !(await isImpersonating())) redirect("/admin");

  const clientId = await getEffectiveClientId();
  const user = clientId ? await getUserByInternalId(clientId) : null;
  const impersonating = await isImpersonating();

  if (!user) {
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

  return (
    <>
      {impersonating && <ImpersonationBanner />}
      <div className={impersonating ? "pt-10" : undefined}>{children}</div>
    </>
  );
}
