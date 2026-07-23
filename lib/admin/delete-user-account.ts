import "server-only";

import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { clerkClient } from "@clerk/nextjs/server";
import { deleteUserData, getUserDeletionSnapshot } from "@/data/admin";
import {
  deleteCloudinaryFolder,
  getAssetFolder,
  isCloudinaryConfigured,
} from "@/lib/cloudinary";
import { logger } from "@/lib/logger";
import { getStripe } from "@/lib/stripe";
import {
  isVercelDomainsConfigured,
  removeProjectDomain,
} from "@/lib/vercel-domains";

const PROVIDER_TIMEOUT_MS = 15_000;

type DeleteUserAccountResult = "deleted" | "not_found" | "protected";

export async function deleteUserAccount(
  userId: string,
): Promise<DeleteUserAccountResult> {
  const snapshot = await runDeletionStage("snapshot", userId, () =>
    getUserDeletionSnapshot(userId),
  );

  if (!snapshot) return "not_found";
  if (snapshot.type === "admin") return "protected";

  await validateDeletionIntegrations(snapshot, userId);

  const subscriptionIds = [
    ...new Set(
      [
        snapshot.stripeSubscriptionId,
        ...snapshot.addonSubscriptionIds,
      ].filter((id): id is string => Boolean(id)),
    ),
  ];

  if (subscriptionIds.length > 0) {
    await runDeletionStage(
      "stripe",
      userId,
      () => Promise.all(subscriptionIds.map(cancelStripeSubscription)),
      PROVIDER_TIMEOUT_MS,
    );
  }

  await runDeletionStage(
    "clerk",
    userId,
    () => deleteClerkUser(snapshot.clerkUserId),
    PROVIDER_TIMEOUT_MS,
  );

  const cleanupOperations: Promise<unknown>[] = [
    runDeletionStage(
      "vercel-domains",
      userId,
      () => Promise.all(snapshot.customDomains.map(removeProjectDomain)),
      PROVIDER_TIMEOUT_MS,
    ),
  ];

  if (snapshot.hasAssets || isCloudinaryConfigured()) {
    cleanupOperations.push(
      runDeletionStage(
        "cloudinary",
        userId,
        () => deleteCloudinaryFolder(getAssetFolder(userId)),
        PROVIDER_TIMEOUT_MS,
      ),
    );
  }

  await Promise.all(cleanupOperations);

  await runDeletionStage("database", userId, () => deleteUserData(userId));

  return "deleted";
}

async function validateDeletionIntegrations(
  snapshot: NonNullable<
    Awaited<ReturnType<typeof getUserDeletionSnapshot>>
  >,
  userId: string,
) {
  await runDeletionStage("configuration", userId, async () => {
    if (snapshot.hasAssets && !isCloudinaryConfigured()) {
      throw new Error("Cloudinary is not configured");
    }

    if (
      snapshot.customDomains.length > 0 &&
      !isVercelDomainsConfigured()
    ) {
      throw new Error("Vercel domains are not configured");
    }
  });
}

async function cancelStripeSubscription(subscriptionId: string) {
  const stripe = getStripe();

  try {
    const subscription = await stripe.subscriptions.retrieve(
      subscriptionId,
      {},
      { timeout: PROVIDER_TIMEOUT_MS },
    );

    if (
      subscription.status === "canceled" ||
      subscription.status === "incomplete_expired"
    ) {
      return;
    }

    await stripe.subscriptions.cancel(
      subscriptionId,
      { prorate: false },
      { timeout: PROVIDER_TIMEOUT_MS },
    );
  } catch (error) {
    if (!isStripeResourceMissing(error)) {
      throw error;
    }
  }
}

async function deleteClerkUser(clerkUserId: string) {
  try {
    const clerk = await clerkClient();
    await clerk.users.deleteUser(clerkUserId);
  } catch (error) {
    if (!isClerkAPIResponseError(error) || error.status !== 404) {
      throw error;
    }
  }
}

async function runDeletionStage<T>(
  stage: string,
  userId: string,
  operation: () => Promise<T>,
  timeoutMs?: number,
): Promise<T> {
  try {
    const result = operation();
    return timeoutMs ? await withTimeout(result, timeoutMs) : await result;
  } catch (error) {
    logger.captureException(error, {
      action: `delete-user-${stage}`,
      userId,
    });
    throw error;
  }
}

async function withTimeout<T>(operation: Promise<T>, timeoutMs: number) {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      operation,
      new Promise<never>((_resolve, reject) => {
        timeout = setTimeout(
          () => reject(new Error("Provider request timed out")),
          timeoutMs,
        );
      }),
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

function isStripeResourceMissing(error: unknown) {
  return (
    error !== null &&
    typeof error === "object" &&
    "code" in error &&
    error.code === "resource_missing"
  );
}
