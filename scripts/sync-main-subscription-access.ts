import { eq } from "drizzle-orm";
import Stripe from "stripe";
import { db } from "../db";
import * as schema from "../db/schema";
import { getStripe } from "../lib/stripe";

const bookingPriceId = process.env.STRIPE_BOOKING_PRICE_ID;
const mainPriceId = process.env.STRIPE_MAIN_PRICE_ID;

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("STRIPE_SECRET_KEY is required");
  process.exit(1);
}

function getSubscriptionPeriodEnd(subscription: Stripe.Subscription) {
  const currentPeriodEnd = subscription.items.data[0]?.current_period_end;
  if (!currentPeriodEnd) return null;
  return new Date(currentPeriodEnd * 1000);
}

function isMainSubscription(subscription: Stripe.Subscription) {
  if (subscription.metadata?.landora_product === "booking") return false;
  if (subscription.metadata?.landora_product === "main") return true;

  if (mainPriceId) {
    return subscription.items.data.some((item) => item.price.id === mainPriceId);
  }

  if (!bookingPriceId) return true;

  return !subscription.items.data.some((item) => item.price.id === bookingPriceId);
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

  const userBySubscription = await db.query.users.findFirst({
    where: eq(schema.users.stripeSubscriptionId, subscription.id),
  });
  if (userBySubscription) return userBySubscription;

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

async function syncMainSubscriptionAccess() {
  const stripe = getStripe();
  let synced = 0;
  let skipped = 0;

  let startingAfter: string | undefined;

  do {
    const page = await stripe.subscriptions.list({
      status: "all",
      limit: 100,
      starting_after: startingAfter,
    });

    for (const subscription of page.data) {
      if (!isMainSubscription(subscription)) {
        skipped += 1;
        continue;
      }

      const user = await resolveUserForSubscription(subscription);
      if (!user) {
        console.warn(`No user found for subscription ${subscription.id}`);
        skipped += 1;
        continue;
      }

      const customerId =
        typeof subscription.customer === "string"
          ? subscription.customer
          : subscription.customer?.id;

      await db
        .update(schema.users)
        .set({
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: customerId ?? user.stripeCustomerId,
          subscriptionStatus: subscription.status as schema.SubscriptionStatus,
          subscriptionCurrentPeriodEnd: getSubscriptionPeriodEnd(subscription),
          subscriptionCancelAtPeriodEnd: subscription.cancel_at_period_end,
        })
        .where(eq(schema.users.id, user.id));

      synced += 1;
    }

    startingAfter = page.has_more ? page.data.at(-1)?.id : undefined;
  } while (startingAfter);

  console.log(`Synced ${synced} main subscriptions, skipped ${skipped}`);
}

syncMainSubscriptionAccess().catch((error) => {
  console.error("Sync failed:", error);
  process.exit(1);
});
