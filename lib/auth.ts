import { cache } from "react";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSubscriptionStatus } from "@/data/subscriptions";
import {
  getCurrentUser,
  getUserByClerkUserId,
  getUserByIdForImpersonation,
} from "@/data/users";
import { hasDashboardAccess } from "@/lib/subscription-access";

export const IMPERSONATION_COOKIE = "impersonating";

export async function checkAuth(): Promise<{ error: string } | null> {
  const { userId } = await auth();
  if (!userId) return { error: "No autorizado" };

  const user = await getCurrentUser();
  if (user?.type !== "admin") return { error: "No autorizado" };

  return null;
}

export async function requireAuth(): Promise<{ error: string } | { authorized: true }> {
  const { userId } = await auth();
  if (!userId) return { error: "No autorizado" };

  return { authorized: true };
}

async function resolveImpersonatedUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const cookieStore = await cookies();
  const impersonatingId = cookieStore.get(IMPERSONATION_COOKIE)?.value;
  if (!impersonatingId) return null;

  const currentUser = await getCurrentUser();
  if (currentUser?.type !== "admin") return null;

  const targetUser = await getUserByIdForImpersonation(impersonatingId);

  if (!targetUser) return null;

  return targetUser;
}

export const getImpersonationContext = cache(async (): Promise<{
  clientId: string;
  clientName: string;
} | null> => {
  const target = await resolveImpersonatedUser();
  if (!target) return null;
  return { clientId: target.id, clientName: target.name };
});

export const isImpersonating = cache(async (): Promise<boolean> => {
  const ctx = await getImpersonationContext();
  return ctx !== null;
});

export const getEffectiveClientId = cache(async (): Promise<string | null> => {
  const ctx = await getImpersonationContext();
  if (ctx) return ctx.clientId;

  const currentUser = await getCurrentUser();
  return currentUser?.id ?? null;
});

export const resolveAuthenticatedDestination = cache(async (
  userId: string | null,
  impersonatingId: string | null,
): Promise<string> => {
  if (!userId) return "/sign-in";

  const currentUser = await getUserByClerkUserId(userId);
  if (!currentUser) return "/account-pending";

  if (currentUser.type === "admin") {
    const impersonatedUser = impersonatingId
      ? await getUserByIdForImpersonation(impersonatingId)
      : null;
    if (!impersonatedUser) return "/admin";
  }

  const subscription = await getSubscriptionStatus(userId);

  if (
    !hasDashboardAccess({
      type: currentUser.type,
      accessType: currentUser.accessType,
      suspended: currentUser.suspended,
      subscriptionStatus: subscription?.subscriptionStatus ?? null,
    })
  ) {
    return "/subscribe";
  }

  return "/editor";
});

export async function requireEffectiveClientId(): Promise<string> {
  const { userId } = await auth();
  const clientId = await getEffectiveClientId();
  if (clientId) return clientId;

  redirect(userId ? "/account-pending" : "/sign-in");
}
