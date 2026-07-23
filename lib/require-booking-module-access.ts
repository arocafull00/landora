import { getEffectiveClientId } from "@/lib/auth";
import { getUserByInternalId } from "@/data/users";
import { getUserAddon } from "@/data/user-addons";
import { hasBookingModuleAccess } from "@/lib/subscription-access";

type AccessDenied = { error: string };
type AccessGranted = { tenantId: string };

export async function requireBookingModuleAccessForCurrentUser(): Promise<
  AccessDenied | AccessGranted
> {
  const tenantId = await getEffectiveClientId();
  if (!tenantId) {
    return { error: "No autorizado" };
  }

  const user = await getUserByInternalId(tenantId);
  if (!user) {
    return { error: "No autorizado" };
  }

  const addon = await getUserAddon(tenantId, "bookings");

  if (
    !hasBookingModuleAccess({
      type: user.type,
      suspended: user.suspended,
      bookingManualAccess: addon?.manualAccess ?? false,
      bookingAddonStatus: addon?.status ?? null,
    })
  ) {
    return { error: "No tienes acceso al módulo de reservas" };
  }

  return { tenantId };
}

