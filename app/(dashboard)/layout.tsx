import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardAccountActions } from "@/components/dashboard/dashboard-account-actions";
import { isAdmin } from "@/lib/is-admin";
import { isImpersonating, getEffectiveClientId } from "@/lib/auth";
import { getUserByInternalId } from "@/data/users";
import { ImpersonationBanner } from "@/components/dashboard/impersonation-banner";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
  },
  manifest: "/favicon_io/site.webmanifest",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (await isAdmin() && !(await isImpersonating())) redirect("/admin");

  const clientId = await getEffectiveClientId();
  const [user, impersonating, admin] = await Promise.all([
    clientId ? getUserByInternalId(clientId) : null,
    isImpersonating(),
    isAdmin(),
  ]);

  if (!user) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-surface-bg">
        {!admin ? (
          <div className="absolute right-4 top-4">
            <DashboardAccountActions />
          </div>
        ) : null}
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
