import "server-only";

import Stripe from "stripe";
import { requireServerEnv, serverEnv } from "@/lib/env/server";

let stripeClient: Stripe | null = null;

export function getStripe() {
  if (stripeClient) return stripeClient;

  stripeClient = new Stripe(requireServerEnv("STRIPE_SECRET_KEY"));

  return stripeClient;
}

export function getStripePaymentLinkUrl(clerkUserId: string) {
  const paymentLink = serverEnv.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;
  if (!paymentLink) return null;

  const url = new URL(paymentLink);
  url.searchParams.set("client_reference_id", clerkUserId);
  return url.toString();
}

export function getStripeBookingPaymentLinkUrl(clerkUserId: string) {
  const paymentLink = serverEnv.NEXT_PUBLIC_STRIPE_BOOKING_PAYMENT_LINK;
  if (!paymentLink) return null;

  const url = new URL(paymentLink);
  url.searchParams.set("client_reference_id", clerkUserId);
  return url.toString();
}
