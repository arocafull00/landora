import { headers } from "next/headers";
import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import {
  getUserAddonByStripeSubscriptionId,
  setUserAddonStatus,
  upsertUserAddon,
} from "@/data/user-addons";
import {
  updateSubscriptionFromCheckout,
  updateSubscriptionStatus,
} from "@/data/subscriptions";
import { getStripe } from "@/lib/stripe";

type LandoraProduct = "main" | "booking";

function resolveLandoraProduct(
  metadata: Stripe.Metadata | null | undefined,
): LandoraProduct | null {
  const product = metadata?.landora_product;
  if (product === "main" || product === "booking") return product;
  return null;
}

function isBookingSubscription(
  subscription: Stripe.Subscription,
  productHint: LandoraProduct | null = null,
) {
  if (productHint === "booking") return true;
  if (productHint === "main") return false;

  const bookingPriceId = process.env.STRIPE_BOOKING_PRICE_ID;
  if (!bookingPriceId) return false;

  return subscription.items.data.some((item) => item.price.id === bookingPriceId);
}

function getStripeCustomerId(
  customer: Stripe.Subscription["customer"] | Stripe.Checkout.Session["customer"],
) {
  if (typeof customer === "string") return customer;
  return customer?.id ?? null;
}

function getSubscriptionPeriodEnd(subscription: Stripe.Subscription) {
  const currentPeriodEnd = subscription.items.data[0]?.current_period_end;
  if (!currentPeriodEnd) return null;
  return new Date(currentPeriodEnd * 1000);
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const clerkUserId = session.client_reference_id;
  const stripeCustomerId = getStripeCustomerId(session.customer);
  const stripeSubscriptionId = session.subscription;

  if (!clerkUserId || typeof stripeSubscriptionId !== "string") {
    throw new Error("Checkout session missing required fields");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.clerkUserId, clerkUserId),
  });

  if (!user) {
    throw new Error(`User not found for checkout: ${clerkUserId}`);
  }

  const subscription = await getStripe().subscriptions.retrieve(stripeSubscriptionId);
  const productHint = resolveLandoraProduct(session.metadata);

  if (isBookingSubscription(subscription, productHint)) {
    await upsertUserAddon({
      userId: user.id,
      addonType: "bookings",
      stripeSubscriptionId,
      status: subscription.status as
        | "active"
        | "trialing"
        | "past_due"
        | "canceled"
        | "unpaid",
      currentPeriodEnd: getSubscriptionPeriodEnd(subscription),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    });
    return;
  }

  if (!stripeCustomerId) {
    throw new Error("Checkout session missing customer for main subscription");
  }

  await updateSubscriptionFromCheckout({
    clerkUserId,
    stripeCustomerId,
    stripeSubscriptionId,
  });
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const stripeCustomerId = getStripeCustomerId(subscription.customer);
  const productHint = resolveLandoraProduct(subscription.metadata);
  const status = subscription.status as
    | "active"
    | "trialing"
    | "past_due"
    | "canceled"
    | "unpaid";

  const bookingAddon = await getUserAddonByStripeSubscriptionId(subscription.id);

  if (bookingAddon) {
    await setUserAddonStatus({
      stripeSubscriptionId: subscription.id,
      status,
      currentPeriodEnd: getSubscriptionPeriodEnd(subscription),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    });
    return;
  }

  if (isBookingSubscription(subscription, productHint)) {
    return;
  }

  await updateSubscriptionStatus({
    stripeSubscriptionId: subscription.id,
    stripeCustomerId,
    subscriptionStatus: status,
    subscriptionCurrentPeriodEnd: getSubscriptionPeriodEnd(subscription),
    subscriptionCancelAtPeriodEnd: subscription.cancel_at_period_end,
  });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const stripeCustomerId = getStripeCustomerId(subscription.customer);
  const productHint = resolveLandoraProduct(subscription.metadata);
  const bookingAddon = await getUserAddonByStripeSubscriptionId(subscription.id);

  if (bookingAddon) {
    await setUserAddonStatus({
      stripeSubscriptionId: subscription.id,
      status: "canceled",
      cancelAtPeriodEnd: false,
    });
    return;
  }

  if (isBookingSubscription(subscription, productHint)) {
    return;
  }

  await updateSubscriptionStatus({
    stripeSubscriptionId: subscription.id,
    stripeCustomerId,
    subscriptionStatus: "canceled",
    subscriptionCancelAtPeriodEnd: false,
  });
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const subscription = invoice.parent?.subscription_details?.subscription;
  const subscriptionId =
    typeof subscription === "string" ? subscription : subscription?.id;

  if (!subscriptionId) return;

  const bookingAddon = await getUserAddonByStripeSubscriptionId(subscriptionId);

  if (bookingAddon) {
    await setUserAddonStatus({
      stripeSubscriptionId: subscriptionId,
      status: "past_due",
    });
    return;
  }

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
