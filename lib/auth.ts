import { cache } from "react";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { getCurrentUser } from "@/data/users";

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

  const targetUser = await db.query.users.findFirst({
    where: eq(users.id, impersonatingId),
  });

  if (!targetUser || targetUser.type !== "user") return null;

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
