import { getCurrentUser } from "@/data/users";

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.type === "admin";
}
