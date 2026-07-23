"use server";

import { auth } from "@clerk/nextjs/server";
import { getSubscriptionStatus } from "@/data/subscriptions";
import { requireServerEnv } from "@/lib/env/server";
import { logger } from "@/lib/logger";
import { getStripe, getStripePaymentLinkUrl } from "@/lib/stripe";

export async function createCustomerPortalAction(): Promise<
  { success: true; data: { url: string } } | { error: string }
> {
  const { userId } = await auth();
  if (!userId) return { error: "No autorizado" };

  try {
    const user = await getSubscriptionStatus(userId);
    if (!user?.stripeCustomerId) {
      const paymentLink = getStripePaymentLinkUrl(userId);
      if (!paymentLink) {
        return { error: "No se pudo abrir la gestión de suscripción" };
      }
      return { success: true, data: { url: paymentLink } };
    }

    const appUrl = requireServerEnv("NEXT_PUBLIC_APP_URL");
    const session = await getStripe().billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: new URL("/settings", appUrl).toString(),
    });

    return { success: true, data: { url: session.url } };
  } catch (error) {
    logger.captureException(error, {
      action: "create-customer-portal",
      userId,
    });
    return { error: "No se pudo abrir la gestión de suscripción" };
  }
}
