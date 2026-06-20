import { cache } from "react";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users, type SubscriptionStatus } from "@/db/schema";

async function fetchSubscriptionStatus(clerkUserId: string) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.clerkUserId, clerkUserId),
      columns: {
        type: true,
        accessType: true,
        suspended: true,
        subscriptionStatus: true,
        subscriptionCurrentPeriodEnd: true,
        subscriptionCancelAtPeriodEnd: true,
        stripeCustomerId: true,
      },
    });

    if (!user) return null;

    return user;
  } catch {
    throw new Error("Failed to fetch subscription status");
  }
}

export const getSubscriptionStatus = cache(fetchSubscriptionStatus);

export async function getSubscriptionStatusForProxy(clerkUserId: string) {
  return fetchSubscriptionStatus(clerkUserId);
}



export async function updateSubscriptionFromCheckout(data: {
  clerkUserId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
}) {
  try {
    await db
      .update(users)
      .set({
        stripeCustomerId: data.stripeCustomerId,
        stripeSubscriptionId: data.stripeSubscriptionId,
        subscriptionStatus: "active",
      })
      .where(eq(users.clerkUserId, data.clerkUserId));
  } catch {
    throw new Error("Failed to update subscription from checkout");
  }
}

export async function updateSubscriptionStatus(data: {
  stripeSubscriptionId: string;
  subscriptionStatus: SubscriptionStatus;
  subscriptionCurrentPeriodEnd?: Date | null;
  subscriptionCancelAtPeriodEnd?: boolean;
}) {
  try {
    await db
      .update(users)
      .set({
        subscriptionStatus: data.subscriptionStatus,
        subscriptionCurrentPeriodEnd: data.subscriptionCurrentPeriodEnd,
        subscriptionCancelAtPeriodEnd: data.subscriptionCancelAtPeriodEnd,
      })
      .where(eq(users.stripeSubscriptionId, data.stripeSubscriptionId));
  } catch {
    throw new Error("Failed to update subscription status");
  }
}
