import { headers } from "next/headers";
import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import {
  updateSubscriptionFromCheckout,
  updateSubscriptionStatus,
} from "@/data/subscriptions";
import { getStripe } from "@/lib/stripe";

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const clerkUserId = session.client_reference_id;
  const stripeCustomerId = session.customer;
  const stripeSubscriptionId = session.subscription;

  if (!clerkUserId || typeof stripeCustomerId !== "string" || typeof stripeSubscriptionId !== "string") {
    console.error("Checkout session missing required fields:", {
      clerkUserId,
      stripeCustomerId,
      stripeSubscriptionId,
    });
    return;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.clerkUserId, clerkUserId),
  });

  if (!user) {
    console.error("User not found for checkout:", { clerkUserId });
    return;
  }

  await updateSubscriptionFromCheckout({
    clerkUserId,
    stripeCustomerId,
    stripeSubscriptionId,
  });
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const currentPeriodEnd = subscription.items.data[0]?.current_period_end;

  await updateSubscriptionStatus({
    stripeSubscriptionId: subscription.id,
    subscriptionStatus: subscription.status as
      | "active"
      | "trialing"
      | "past_due"
      | "canceled"
      | "unpaid",
    subscriptionCurrentPeriodEnd: currentPeriodEnd
      ? new Date(currentPeriodEnd * 1000)
      : null,
    subscriptionCancelAtPeriodEnd: subscription.cancel_at_period_end,
  });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  await updateSubscriptionStatus({
    stripeSubscriptionId: subscription.id,
    subscriptionStatus: "canceled",
    subscriptionCancelAtPeriodEnd: false,
  });
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const subscription = invoice.parent?.subscription_details?.subscription;
  const subscriptionId =
    typeof subscription === "string" ? subscription : subscription?.id;

  if (!subscriptionId) return;

  await updateSubscriptionStatus({
    stripeSubscriptionId: subscriptionId,
    subscriptionStatus: "past_due",
  });
}

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return new Response("Missing signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("Webhook signature invalid:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      case "invoice.payment_failed":
        await handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;
    }
  } catch (err) {
    console.error("Webhook handler failed:", err);
    return new Response("Webhook handler failed", { status: 500 });
  }

  return new Response("OK", { status: 200 });
}
