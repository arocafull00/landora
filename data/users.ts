import { cache } from "react";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";

export const getUserById = cache(async (userId: string) => {
  try {
    return await db.query.users.findFirst({
      where: eq(users.clerkUserId, userId),
    });
  } catch {
    throw new Error("Failed to fetch user");
  }
});

export const getUserByInternalId = cache(async (id: string) => {
  try {
    return await db.query.users.findFirst({
      where: eq(users.id, id),
    });
  } catch {
    throw new Error("Failed to fetch user");
  }
});

export const getCurrentUser = cache(async () => {
  const { userId } = await auth();
  if (!userId) return null;
  return getUserById(userId);
});
