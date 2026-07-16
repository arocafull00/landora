import { redirect } from "next/navigation";
import { DashboardAccountActions } from "@/components/dashboard/dashboard-account-actions";
import { DashboardThemeScope } from "@/components/dashboard/dashboard-theme-scope";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ImpersonationBanner } from "@/components/dashboard/impersonation-banner";
import { isAdmin } from "@/lib/is-admin";
import { isImpersonating, getEffectiveClientId } from "@/lib/auth";
import { getUserByInternalId } from "@/data/users";
import { getLandingPageByUserId } from "@/data/landing-pages";
import { toLandingView } from "@/lib/landing-mapper";
import { getBookingSettings } from "@/data/booking-settings";
import { getUserAddon } from "@/data/user-addons";
import { hasBookingModuleAccess } from "@/lib/subscription-access";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (await isAdmin() && !(await isImpersonating())) redirect("/admin");

  const clientId = await getEffectiveClientId();
  if (!clientId) redirect("/sign-in");

  const [user, dbLanding, impersonating, admin, bookingSettings, bookingsAddon] =
    await Promise.all([
    getUserByInternalId(clientId),
    getLandingPageByUserId(clientId),
    isImpersonating(),
    isAdmin(),
    getBookingSettings(clientId),
    getUserAddon(clientId, "bookings"),
  ]);

  if (!dbLanding) {
    return (
      <>
        <DashboardThemeScope />
        <div className="relative flex min-h-screen items-center justify-center bg-surface-bg">
          {!admin ? (
            <div className="absolute right-4 top-4">
              <DashboardAccountActions />
            </div>
          ) : null}
          <div className="text-center">
            <h1 className="font-headline text-headline-lg font-semibold text-on-background">
              Cuenta pendiente de configuración
            </h1>
            <p className="mt-2 font-body text-body-md text-on-surface-variant">
              Tu cuenta no tiene ninguna landing asignada todavía. Contacta con el
              administrador.
            </p>
          </div>
        </div>
      </>
    );
  }

  const landing = toLandingView(dbLanding, user ?? undefined);
  const bookingModuleEnabled = user
    ? hasBookingModuleAccess({
        type: user.type,
        accessType: user.accessType,
        suspended: user.suspended,
        bookingAddonStatus: bookingsAddon?.status ?? null,
      })
    : false;

  return (
    <>
      <DashboardThemeScope />
      {impersonating && <ImpersonationBanner />}
      <DashboardShell
        landing={landing}
        isAdmin={admin}
        impersonating={impersonating}
        bookingEnabled={bookingSettings.enabled && bookingModuleEnabled}
        bookingModuleEnabled={bookingModuleEnabled}
      >
        {children}
      </DashboardShell>
    </>
  );
}
