import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { isAdmin } from "@/lib/is-admin";
import { IMPERSONATION_COOKIE } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ clientId: string }> }
) {
  if (!(await isAdmin())) redirect("/");

  const { clientId } = await params;

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
