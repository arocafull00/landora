import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe() {
  if (stripeClient) return stripeClient;

  stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!);

  return stripeClient;
}

export function getStripePaymentLinkUrl(clerkUserId: string) {
  const paymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;
  if (!paymentLink) return null;

  const url = new URL(paymentLink);
  url.searchParams.set("client_reference_id", clerkUserId);
  return url.toString();
}
