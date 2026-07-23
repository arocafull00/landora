import "server-only";

import { cache } from "react";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { assets, users, userAddons, landingPages } from "@/db/schema";
import type { LandingPage, User } from "@/db/schema";

export const getAllUsers = cache(async () => {
  try {
    return await db.select().from(users).where(eq(users.type, "user"));
  } catch {
    throw new Error("Failed to fetch users");
  }
});

export const getAllLandingPages = cache(async () => {
  try {
    return await db
      .select({
        id: landingPages.id,
        userId: landingPages.userId,
        name: landingPages.name,
        slug: landingPages.slug,
        template: landingPages.template,
        published: landingPages.published,
        customDomain: landingPages.customDomain,
        domainVerified: landingPages.domainVerified,
        updatedAt: landingPages.updatedAt,
        createdAt: landingPages.createdAt,
      })
      .from(landingPages);
  } catch {
    throw new Error("Failed to fetch landing pages");
  }
});

export const getAllBookingManualAccess = cache(async () => {
  try {
    return await db
      .select({
        userId: userAddons.userId,
        manualAccess: userAddons.manualAccess,
      })
      .from(userAddons)
      .where(eq(userAddons.addonType, "bookings"));
  } catch {
    throw new Error("Failed to fetch booking manual access");
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

export async function setUserManualAccess(
  id: string,
  bookingManualAccess: boolean,
) {
  try {
    await db.transaction(async (tx) => {
      await tx
        .update(users)
        .set({ accessType: "manual" })
        .where(eq(users.id, id));

      await tx
        .insert(userAddons)
        .values({
          userId: id,
          addonType: "bookings",
          manualAccess: bookingManualAccess,
        })
        .onConflictDoUpdate({
          target: [userAddons.userId, userAddons.addonType],
          set: { manualAccess: bookingManualAccess },
        });
    });
  } catch {
    throw new Error("Failed to set user manual access");
  }
}

export async function revokeUserManualAccess(id: string) {
  try {
    await db.transaction(async (tx) => {
      await tx
        .update(users)
        .set({ accessType: "subscription" })
        .where(eq(users.id, id));

      await tx
        .update(userAddons)
        .set({ manualAccess: false })
        .where(
          and(
            eq(userAddons.userId, id),
            eq(userAddons.addonType, "bookings"),
          ),
        );
    });
  } catch {
    throw new Error("Failed to revoke user manual access");
  }
}

export async function getUserDeletionSnapshot(id: string) {
  try {
    const [user, addons, landings, userAssets] = await Promise.all([
      db.query.users.findFirst({
        where: eq(users.id, id),
        columns: {
          id: true,
          clerkUserId: true,
          type: true,
          stripeSubscriptionId: true,
        },
      }),
      db.query.userAddons.findMany({
        where: eq(userAddons.userId, id),
        columns: { stripeSubscriptionId: true },
      }),
      db.query.landingPages.findMany({
        where: eq(landingPages.userId, id),
        columns: { customDomain: true },
      }),
      db.query.assets.findMany({
        where: eq(assets.userId, id),
        columns: { id: true },
        limit: 1,
      }),
    ]);

    if (!user) return null;

    return {
      ...user,
      addonSubscriptionIds: addons.flatMap((addon) =>
        addon.stripeSubscriptionId ? [addon.stripeSubscriptionId] : [],
      ),
      customDomains: landings.flatMap((landing) =>
        landing.customDomain ? [landing.customDomain] : [],
      ),
      hasAssets: userAssets.length > 0,
    };
  } catch {
    throw new Error("Failed to fetch user deletion snapshot");
  }
}

export async function deleteUserData(id: string) {
  try {
    await db.transaction(async (tx) => {
      await tx.delete(landingPages).where(eq(landingPages.userId, id));
      const [deleted] = await tx
        .delete(users)
        .where(eq(users.id, id))
        .returning({ id: users.id });

      if (!deleted) {
        throw new Error("User not found during deletion");
      }
    });
  } catch {
    throw new Error("Failed to delete user data");
  }
}
