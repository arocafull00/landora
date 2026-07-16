"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getUserByIdForImpersonation } from "@/data/users";
import { checkAuth, IMPERSONATION_COOKIE } from "@/lib/auth";
import { impersonationUserIdSchema } from "@/lib/schemas/impersonation";

export async function startImpersonation(clientId: string) {
  const authError = await checkAuth();
  if (authError) redirect("/");

  const parsedClientId = impersonationUserIdSchema.safeParse(clientId);
  if (!parsedClientId.success) redirect("/admin");

  const target = await getUserByIdForImpersonation(parsedClientId.data);

  if (!target) redirect("/admin");

  const cookieStore = await cookies();
  cookieStore.set(IMPERSONATION_COOKIE, parsedClientId.data, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  redirect("/");
}

export async function exitImpersonation() {
  const authError = await checkAuth();
  if (authError) redirect("/");

  const cookieStore = await cookies();
  cookieStore.delete(IMPERSONATION_COOKIE);

  redirect("/admin");
}
