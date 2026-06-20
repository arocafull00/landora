import type { SubscriptionStatus } from "@/db/schema";

const ALLOWED_SUBSCRIPTION_STATUSES: SubscriptionStatus[] = [
  "active",
  "trialing",
];

export function hasActiveSubscription(status: SubscriptionStatus | null | undefined) {
  if (!status) return false;

  return ALLOWED_SUBSCRIPTION_STATUSES.includes(status);
}

export function hasDashboardAccess(user: {
  type: "user" | "admin";
  accessType: "subscription" | "manual";
  suspended: boolean;
  subscriptionStatus: SubscriptionStatus | null;
} | null | undefined) {
  if (!user) return false;

  if (user.type === "admin") return true;

  if (user.suspended) return false;

  if (user.accessType === "manual") return true;

  return hasActiveSubscription(user.subscriptionStatus);
}

export function hasBookingModuleAccess(user: {
  type: "user" | "admin";
  accessType: "subscription" | "manual";
  suspended: boolean;
  bookingAddonStatus: SubscriptionStatus | null;
} | null | undefined) {
  if (!user) return false;

  if (user.type === "admin") return true;

  if (user.suspended) return false;

  if (user.accessType === "manual") return true;

  return hasActiveSubscription(user.bookingAddonStatus);
}
