"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { getPublishedLandingBySlug } from "@/data/landing-publications";
import { createEmailSubscription, deleteEmailSubscription, getEmailSubscriptionsForExport } from "@/data/email-subscriptions";
import { getSubscriptionSettings } from "@/data/subscription-settings";
import { assertLandingAccess } from "@/lib/api/landing-auth";
import { deleteSubscriptionSchema, emailSubscriptionSchema, exportSubscriptionsSchema } from "@/lib/schemas/email-subscriptions";
import { isSubscriptionConfigured } from "@/lib/email-subscriptions/settings";
import { checkNewsletterRateLimit } from "@/lib/email-subscriptions/rate-limit";
import { verifyNewsletterToken } from "@/lib/email-subscriptions/turnstile";
import { SUBSCRIPTIONS_COPY as copy } from "@/lib/email-subscriptions/copy";
import { logger } from "@/lib/logger";

export async function subscribeEmailAction(input: unknown): Promise<{ success: true } | { error: string }> {
  const parsed = emailSubscriptionSchema.safeParse(input);
  if (!parsed.success || parsed.data.honeypot) return { error: copy.invalid };
  try {
    const landing = await getPublishedLandingBySlug(parsed.data.slug);
    if (!landing || landing.template !== "nuvolets" || landing.content.hiddenSections?.includes("newsletter")) return { error: copy.unavailable };
    const settings = await getSubscriptionSettings(landing.id);
    if (!settings.enabled || !isSubscriptionConfigured(settings)) return { error: copy.unavailable };
    const requestHeaders = await headers();
    const hostname = (requestHeaders.get("host") ?? "").split(":")[0].toLowerCase();
    const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!hostname || !(await checkNewsletterRateLimit(ip, landing.id))) return { error: copy.failed };
    if (!(await verifyNewsletterToken(parsed.data.turnstileToken, hostname))) return { error: copy.verification };
    await createEmailSubscription(landing.id, parsed.data.email);
    return { success: true };
  } catch (error) {
    logger.captureException(error, { action: "subscribe-email" });
    return { error: copy.failed };
  }
}

export async function deleteSubscriptionAction(input: unknown): Promise<{ success: true } | { error: string }> {
  const parsed = deleteSubscriptionSchema.safeParse(input);
  if (!parsed.success) return { error: copy.invalid };
  try {
    const landing = await assertLandingAccess(parsed.data.landingId);
    if (!landing) return { error: copy.failed };
    await deleteEmailSubscription(landing.id, parsed.data.email);
    revalidatePath("/email-subscriptions");
    return { success: true };
  } catch (error) {
    logger.captureException(error, { action: "delete-email-subscription" });
    return { error: copy.failed };
  }
}

export async function exportSubscriptionsAction(input: unknown): Promise<{ csv: string } | { error: string }> {
  const parsed = exportSubscriptionsSchema.safeParse(input);
  if (!parsed.success) return { error: copy.invalid };
  try {
    const landing = await assertLandingAccess(parsed.data.landingId);
    if (!landing) return { error: copy.failed };
    const rows = await getEmailSubscriptionsForExport(landing.id, parsed.data.q);
    if (rows.length > 50000) return { error: copy.exportLimit };
    const cell = (value: string) => `"${(/^[=+\-@\t\r]/.test(value) ? "'" + value : value).replaceAll('"', '""')}"`;
    const csv = "\uFEFFEmail;Fecha\r\n" + rows.map((row) => `${cell(row.email)};${cell(row.createdAt)}`).join("\r\n");
    return { csv };
  } catch (error) {
    logger.captureException(error, { action: "export-email-subscriptions" });
    return { error: copy.failed };
  }
}
