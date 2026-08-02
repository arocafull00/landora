import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardAccountActions } from "@/components/dashboard/dashboard-account-actions";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardThemeScope } from "@/components/dashboard/dashboard-theme-scope";
import { ImpersonationBanner } from "@/components/dashboard/impersonation-banner";
import { AppInteractionProviders } from "@/components/shared/app-interaction-providers";
import { getBookingSettings } from "@/data/booking-settings";
import { getLandingPageByUserId } from "@/data/landing-pages";
import { getUserAddon } from "@/data/user-addons";
import { getUserByInternalId } from "@/data/users";
import { getEffectiveClientId, isImpersonating } from "@/lib/auth";
import { isAdmin } from "@/lib/is-admin";
import { toLandingView } from "@/lib/landing-mapper";
import {
  hasBookingModuleAccess,
  hasDashboardAccess,
} from "@/lib/subscription-access";

export async function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  if (await isAdmin() && !(await isImpersonating())) redirect("/admin");

  const { userId } = await auth();
  const clientId = await getEffectiveClientId();
  if (!clientId) redirect(userId ? "/account-pending" : "/sign-in");

  const [user, dbLanding, impersonating, admin, bookingSettings, bookingsAddon] =
    await Promise.all([
      getUserByInternalId(clientId),
      getLandingPageByUserId(clientId),
      isImpersonating(),
      isAdmin(),
      getBookingSettings(clientId),
      getUserAddon(clientId, "bookings"),
    ]);

  if (!admin && !hasDashboardAccess(user)) {
    redirect("/subscribe");
  }

  if (!dbLanding) {
    return (
      <ClerkProvider>
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
      </ClerkProvider>
    );
  }

  const landing = toLandingView(dbLanding, user ?? undefined);
  const bookingModuleEnabled = user
    ? hasBookingModuleAccess({
        type: user.type,
        suspended: user.suspended,
        bookingManualAccess: bookingsAddon?.manualAccess ?? false,
        bookingAddonStatus: bookingsAddon?.status ?? null,
      })
    : false;

  return (
    <ClerkProvider>
      <AppInteractionProviders>
        <DashboardThemeScope />
        {impersonating ? <ImpersonationBanner /> : null}
        <DashboardShell
          bookingEnabled={bookingSettings.enabled && bookingModuleEnabled}
          bookingModuleEnabled={bookingModuleEnabled}
          impersonating={impersonating}
          isAdmin={admin}
          landing={landing}
        >
          {children}
        </DashboardShell>
      </AppInteractionProviders>
    </ClerkProvider>
  );
}
