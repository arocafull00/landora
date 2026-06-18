import type { SubscriptionStatus } from "@/db/schema";

export const ALLOWED_SUBSCRIPTION_STATUSES: SubscriptionStatus[] = [
  "active",
  "trialing",
];

export function hasActiveSubscription(status: SubscriptionStatus | null | undefined) {
  if (!status) return false;

  return ALLOWED_SUBSCRIPTION_STATUSES.includes(status);
}
