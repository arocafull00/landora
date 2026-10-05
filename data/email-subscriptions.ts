import "server-only";

import { cache } from "react";
import { and, count, desc, eq, ilike } from "drizzle-orm";
import { db } from "@/db";
import { emailSubscriptions } from "@/db/schema";
import type { EmailSubscriptionDto } from "@/lib/domain/dtos";

function subscriptionFilter(landingId: string, q: string) {
  const escaped = q.replace(/[\\%_]/g, "\\$&");
  return and(eq(emailSubscriptions.landingId, landingId), q ? ilike(emailSubscriptions.email, `%${escaped}%`) : undefined);
}

export async function createEmailSubscription(landingId: string, email: string) {
  try {
    await db.insert(emailSubscriptions).values({ landingId, email }).onConflictDoNothing({ target: [emailSubscriptions.landingId, emailSubscriptions.email] });
    return { status: "subscribed" as const };
  } catch (error) {
    throw new Error("Failed to create email subscription", { cause: error });
  }
}

export const getEmailSubscriptions = cache(async (landingId: string, page: number, q: string): Promise<{ rows: EmailSubscriptionDto[]; total: number }> => {
  try {
    const filter = subscriptionFilter(landingId, q);
    const [rows, totals] = await Promise.all([
      db.select({ email: emailSubscriptions.email, createdAt: emailSubscriptions.createdAt }).from(emailSubscriptions).where(filter).orderBy(desc(emailSubscriptions.createdAt), emailSubscriptions.email).limit(50).offset((page - 1) * 50),
      db.select({ total: count() }).from(emailSubscriptions).where(filter),
    ]);
    return { rows: rows.map((row) => ({ email: row.email, createdAt: row.createdAt.toISOString() })), total: totals[0]?.total ?? 0 };
  } catch (error) {
    throw new Error("Failed to fetch email subscriptions", { cause: error });
  }
});

export const getEmailSubscriptionsForExport = cache(async (landingId: string, q: string): Promise<EmailSubscriptionDto[]> => {
  try {
    const rows = await db.select({ email: emailSubscriptions.email, createdAt: emailSubscriptions.createdAt }).from(emailSubscriptions).where(subscriptionFilter(landingId, q)).orderBy(desc(emailSubscriptions.createdAt), emailSubscriptions.email).limit(50001);
    return rows.map((row) => ({ email: row.email, createdAt: row.createdAt.toISOString() }));
  } catch (error) {
    throw new Error("Failed to export email subscriptions", { cause: error });
  }
});

export async function deleteEmailSubscription(landingId: string, email: string) {
  try {
    await db.delete(emailSubscriptions).where(and(eq(emailSubscriptions.landingId, landingId), eq(emailSubscriptions.email, email)));
  } catch (error) {
    throw new Error("Failed to delete email subscription", { cause: error });
  }
}
