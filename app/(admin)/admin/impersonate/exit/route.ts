import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { isAdmin } from "@/lib/is-admin";
import { IMPERSONATION_COOKIE } from "@/lib/auth";

export async function GET() {
  if (!(await isAdmin())) redirect("/");

  const cookieStore = await cookies();
  cookieStore.delete(IMPERSONATION_COOKIE);

  redirect("/admin");
}
