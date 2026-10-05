import "server-only";

import { cache } from "react";
import { eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/db";
import { landingSubscriptionSettings } from "@/db/schema";
import { DEFAULT_SUBSCRIPTION_SETTINGS } from "@/lib/email-subscriptions/defaults";
import { logger } from "@/lib/logger";
import { subscriptionSettingsSchema, type SubscriptionSettings } from "@/lib/schemas/subscription-settings";

function isUndefinedTable(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const details = error as Error & { code?: string; cause?: unknown };
  if (details.code === "42P01") return true;
  if (details.cause) return isUndefinedTable(details.cause);
  return false;
}

export const getSubscriptionSettings = cache(async (landingId: string): Promise<SubscriptionSettings> => {
  try {
    const [row] = await db.select({ settings: landingSubscriptionSettings.settings }).from(landingSubscriptionSettings).where(eq(landingSubscriptionSettings.landingId, landingId)).limit(1);
    return row ? subscriptionSettingsSchema.parse(row.settings) : { ...DEFAULT_SUBSCRIPTION_SETTINGS };
  } catch (error) {
    if (isUndefinedTable(error)) {
      logger.warn(logger.fmt`landing_subscription_settings table missing, using defaults`);
      return { ...DEFAULT_SUBSCRIPTION_SETTINGS };
    }
    throw new Error("Failed to fetch subscription settings", { cause: error });
  }
});

export async function getPublicSubscriptionSettings(landingId: string) {
  "use cache";
  cacheLife("max");
  cacheTag(`subscription-settings:${landingId}`);
  return getSubscriptionSettings(landingId);
}

export async function saveSubscriptionSettings(landingId: string, settings: SubscriptionSettings) {
  try {
    await db.insert(landingSubscriptionSettings).values({ landingId, settings }).onConflictDoUpdate({ target: landingSubscriptionSettings.landingId, set: { settings, updatedAt: new Date() } });
  } catch (error) {
    throw new Error("Failed to save subscription settings", { cause: error });
  }
}
