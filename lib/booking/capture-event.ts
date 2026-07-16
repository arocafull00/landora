import "server-only";

import { PostHog } from "posthog-node";

let client: PostHog | null = null;

function getPostHogClient() {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!apiKey) {
    return null;
  }
  if (!client) {
    client = new PostHog(apiKey, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com",
    });
  }
  return client;
}

export async function captureBookingEvent(
  event: string,
  tenantId: string,
  properties: Record<string, string | number | boolean>,
) {
  const posthog = getPostHogClient();
  if (!posthog) {
    return;
  }

  posthog.capture({
    distinctId: tenantId,
    event,
    properties,
  });

  await posthog.shutdown();
}
