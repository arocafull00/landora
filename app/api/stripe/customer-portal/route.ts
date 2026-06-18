import { auth } from "@clerk/nextjs/server";
import { getSubscriptionStatus } from "@/data/subscriptions";
import { getStripe, getStripePaymentLinkUrl } from "@/lib/stripe";

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getSubscriptionStatus(userId);
    const paymentLink = getStripePaymentLinkUrl(userId);

    if (!user?.stripeCustomerId) {
      return Response.json({ redirect: paymentLink }, { status: 200 });
    }

    const session = await getStripe().billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
    });

    return Response.json({ url: session.url }, { status: 200 });
  } catch {
    return Response.json({ error: "Failed to create portal session" }, { status: 500 });
  }
}
