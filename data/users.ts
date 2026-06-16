import { cache } from "react";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import type { User } from "@/db/schema";

const getUserById = cache(async (userId: string) => {
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

export async function insertUser(data: {
  clerkUserId: string;
  name: string;
  type: User["type"];
}) {
  try {
    const [user] = await db.insert(users).values(data).returning({ id: users.id });
    return user;
  } catch {
    throw new Error("Failed to insert user");
  }
}

export async function deleteUserById(id: string) {
  try {
    await db.delete(users).where(eq(users.id, id));
  } catch {
    throw new Error("Failed to delete user");
  }
}

export async function getUserByIdForImpersonation(id: string) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });
    if (!user || user.type !== "user") return null;
    return user;
  } catch {
    throw new Error("Failed to fetch user for impersonation");
  }
}

export const getCurrentUser = cache(async () => {
  const { userId } = await auth();
  if (!userId) return null;
  return getUserById(userId);
});
