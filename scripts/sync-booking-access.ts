import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import Stripe from "stripe";
import * as schema from "../db/schema";
import { getStripe } from "../lib/stripe";

const bookingPriceId = process.env.STRIPE_BOOKING_PRICE_ID;

if (!bookingPriceId) {
  console.error("STRIPE_BOOKING_PRICE_ID is required");
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("STRIPE_SECRET_KEY is required");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

function getSubscriptionPeriodEnd(subscription: Stripe.Subscription) {
  const currentPeriodEnd = subscription.items.data[0]?.current_period_end;
  if (!currentPeriodEnd) return null;
  return new Date(currentPeriodEnd * 1000);
}

async function resolveUserForSubscription(subscription: Stripe.Subscription) {
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer?.id;

  if (customerId) {
    const userByCustomer = await db.query.users.findFirst({
      where: eq(schema.users.stripeCustomerId, customerId),
    });
    if (userByCustomer) return userByCustomer;
  }

  const stripe = getStripe();
  const sessions = await stripe.checkout.sessions.list({
    subscription: subscription.id,
    limit: 1,
  });

  const clerkUserId = sessions.data[0]?.client_reference_id;
  if (!clerkUserId) return null;

  return db.query.users.findFirst({
    where: eq(schema.users.clerkUserId, clerkUserId),
  });
}

async function syncBookingAccess() {
  const stripe = getStripe();
  const syncedSubscriptionIds = new Set<string>();
  let synced = 0;
  let skipped = 0;

  let startingAfter: string | undefined;

  do {
    const page = await stripe.subscriptions.list({
      price: bookingPriceId,
      status: "all",
      limit: 100,
      starting_after: startingAfter,
    });

    for (const subscription of page.data) {
      syncedSubscriptionIds.add(subscription.id);

      const user = await resolveUserForSubscription(subscription);
      if (!user) {
        console.warn(`No user found for subscription ${subscription.id}`);
        skipped += 1;
        continue;
      }

      await db
        .insert(schema.userAddons)
        .values({
          userId: user.id,
          addonType: "bookings",
          stripeSubscriptionId: subscription.id,
          status: subscription.status as schema.SubscriptionStatus,
          currentPeriodEnd: getSubscriptionPeriodEnd(subscription),
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
        })
        .onConflictDoUpdate({
          target: [schema.userAddons.userId, schema.userAddons.addonType],
          set: {
            stripeSubscriptionId: subscription.id,
            status: subscription.status as schema.SubscriptionStatus,
            currentPeriodEnd: getSubscriptionPeriodEnd(subscription),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
          },
        });

      synced += 1;
    }

    startingAfter = page.has_more ? page.data.at(-1)?.id : undefined;
  } while (startingAfter);

  const existingAddons = await db.query.userAddons.findMany({
    where: eq(schema.userAddons.addonType, "bookings"),
  });

  let canceled = 0;

  for (const addon of existingAddons) {
    if (!addon.stripeSubscriptionId) continue;
    if (syncedSubscriptionIds.has(addon.stripeSubscriptionId)) continue;

    await db
      .update(schema.userAddons)
      .set({ status: "canceled" })
      .where(eq(schema.userAddons.id, addon.id));

    canceled += 1;
  }

  console.log(`Synced ${synced} booking subscriptions, skipped ${skipped}, canceled ${canceled} orphans`);
}

syncBookingAccess().catch((error) => {
  console.error("Sync failed:", error);
  process.exit(1);
});
