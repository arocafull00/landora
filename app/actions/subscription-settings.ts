"use server";

import { revalidatePath, updateTag } from "next/cache";
import { saveSubscriptionSettings } from "@/data/subscription-settings";
import { assertLandingAccess } from "@/lib/api/landing-auth";
import { saveSubscriptionSettingsSchema } from "@/lib/schemas/subscription-settings";
import { SUBSCRIPTIONS_COPY as copy } from "@/lib/email-subscriptions/copy";
import { logger } from "@/lib/logger";

export async function saveSubscriptionSettingsAction(input: unknown): Promise<{ success: true } | { error: string }> {
  const parsed = saveSubscriptionSettingsSchema.safeParse(input);
  if (!parsed.success) return { error: copy.invalid };
  try {
    const landing = await assertLandingAccess(parsed.data.landingId);
    if (!landing) return { error: copy.failed };
    await saveSubscriptionSettings(landing.id, parsed.data.settings);
    updateTag(`subscription-settings:${landing.id}`);
    revalidatePath("/email-subscriptions");
    return { success: true };
  } catch (error) {
    logger.captureException(error, { action: "save-subscription-settings" });
    return { error: copy.failed };
  }
}
