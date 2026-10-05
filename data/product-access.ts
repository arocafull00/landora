import "server-only";
import { cache } from "react";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { users, userAddons } from "@/db/schema";

export const hasProductsAccess = cache(async (userId: string) => {
  try {
    const [row] = await db.select({ enabled: userAddons.manualAccess, suspended: users.suspended })
      .from(users).innerJoin(userAddons, and(eq(userAddons.userId, users.id), eq(userAddons.addonType, "products")))
      .where(eq(users.id, userId)).limit(1);
    return Boolean(row?.enabled && !row.suspended);
  } catch (error) { throw new Error("Failed to fetch products access", { cause: error }); }
});

export const getAllProductsAccess = cache(async () => {
  try {
    return await db.select({ userId: userAddons.userId, manualAccess: userAddons.manualAccess }).from(userAddons).where(eq(userAddons.addonType, "products"));
  } catch (error) { throw new Error("Failed to fetch products access list", { cause: error }); }
});

export async function setProductsAccess(userId: string, enabled: boolean) {
  try {
    await db.insert(userAddons).values({ userId, addonType: "products", manualAccess: enabled })
      .onConflictDoUpdate({ target: [userAddons.userId, userAddons.addonType], set: { manualAccess: enabled } });
  } catch (error) { throw new Error("Failed to update products access", { cause: error }); }
}
