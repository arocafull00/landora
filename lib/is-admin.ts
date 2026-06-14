import { checkAuth } from "@/lib/auth";

export async function isAdmin(): Promise<boolean> {
  const authError = await checkAuth();
  return authError === null;
}
