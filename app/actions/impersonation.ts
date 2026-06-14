"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { checkAuth, IMPERSONATION_COOKIE } from "@/lib/auth";

export async function startImpersonation(clientId: string) {
  const authError = await checkAuth();
  if (authError) redirect("/");

  const target = await db.query.users.findFirst({
    where: eq(users.id, clientId),
  });

  if (!target || target.type !== "user") redirect("/admin");

  const cookieStore = await cookies();
  cookieStore.set(IMPERSONATION_COOKIE, clientId, {
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
