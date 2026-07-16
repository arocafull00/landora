import "server-only";

import { cache } from "react";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users, landingPages } from "@/db/schema";
import type { LandingPage, User } from "@/db/schema";

export const getAllUsers = cache(async () => {
  try {
    return await db.query.users.findMany({
      where: eq(users.type, "user"),
    });
  } catch {
    throw new Error("Failed to fetch users");
  }
});

export const getAllLandingPages = cache(async () => {
  try {
    return await db.query.landingPages.findMany();
  } catch {
    throw new Error("Failed to fetch landing pages");
  }
});

export async function getLandingBySlug(slug: string): Promise<LandingPage | undefined> {
  try {
    return await db.query.landingPages.findFirst({
      where: eq(landingPages.slug, slug),
    });
  } catch {
    throw new Error("Failed to check slug availability");
  }
}

export async function updateUserFields(
  id: string,
  data: Partial<
    Pick<
      User,
      | "name"
      | "email"
      | "subscriptionPlan"
      | "accessType"
      | "suspended"
      | "subscriptionStatus"
      | "subscriptionCurrentPeriodEnd"
    >
  >,
) {
  try {
    await db.update(users).set(data).where(eq(users.id, id));
  } catch {
    throw new Error("Failed to update user");
  }
}
