import { cache } from "react";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  userAddons,
  users,
  type AddonType,
  type SubscriptionStatus,
} from "@/db/schema";

async function fetchUserAddon(userId: string, addonType: AddonType) {
  try {
    return await db.query.userAddons.findFirst({
      where: and(
        eq(userAddons.userId, userId),
        eq(userAddons.addonType, addonType),
      ),
    });
  } catch {
    throw new Error("Failed to fetch user addon");
  }
}

export const getUserAddon = cache(fetchUserAddon);

export async function getUserAddonByStripeSubscriptionId(
  subscriptionId: string,
) {
  try {
    return await db.query.userAddons.findFirst({
      where: eq(userAddons.stripeSubscriptionId, subscriptionId),
    });
  } catch {
    throw new Error("Failed to fetch user addon by subscription id");
  }
}

export async function getBookingModuleAccessContextForClerkUser(
  clerkUserId: string,
) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.clerkUserId, clerkUserId),
      columns: {
        id: true,
        type: true,
        accessType: true,
        suspended: true,
      },
    });

    if (!user) return null;

    const addon = await db.query.userAddons.findFirst({
      where: and(
        eq(userAddons.userId, user.id),
        eq(userAddons.addonType, "bookings"),
      ),
      columns: { status: true },
    });

    return {
      type: user.type,
      accessType: user.accessType,
      suspended: user.suspended,
      bookingAddonStatus: addon?.status ?? null,
    };
  } catch {
    throw new Error("Failed to fetch booking module access context");
  }
}

export async function upsertUserAddon(data: {
  userId: string;
  addonType: AddonType;
  stripeSubscriptionId: string;
  status: SubscriptionStatus;
  currentPeriodEnd?: Date | null;
  cancelAtPeriodEnd?: boolean;
}) {
  try {
    await db
      .insert(userAddons)
      .values({
        userId: data.userId,
        addonType: data.addonType,
        stripeSubscriptionId: data.stripeSubscriptionId,
        status: data.status,
        currentPeriodEnd: data.currentPeriodEnd,
        cancelAtPeriodEnd: data.cancelAtPeriodEnd ?? false,
      })
      .onConflictDoUpdate({
        target: [userAddons.userId, userAddons.addonType],
        set: {
          stripeSubscriptionId: data.stripeSubscriptionId,
          status: data.status,
          currentPeriodEnd: data.currentPeriodEnd,
          cancelAtPeriodEnd: data.cancelAtPeriodEnd ?? false,
        },
      });
  } catch {
    throw new Error("Failed to upsert user addon");
  }
}

export async function setUserAddonStatus(data: {
  stripeSubscriptionId: string;
  status: SubscriptionStatus;
  currentPeriodEnd?: Date | null;
  cancelAtPeriodEnd?: boolean;
}) {
  try {
    await db
      .update(userAddons)
      .set({
        status: data.status,
        currentPeriodEnd: data.currentPeriodEnd,
        cancelAtPeriodEnd: data.cancelAtPeriodEnd,
      })
      .where(eq(userAddons.stripeSubscriptionId, data.stripeSubscriptionId));
  } catch {
    throw new Error("Failed to update user addon status");
  }
}
