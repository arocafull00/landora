"use client";

import { useEffect } from "react";
import { initPostHog, posthog } from "@/lib/posthog";

export function LandingAnalyticsInit({
  landingId,
  clientId,
}: {
  landingId: string;
  clientId: string;
}) {
  useEffect(() => {
    initPostHog();
    posthog.register({ landingId, clientId });
    posthog.capture("page_view");
  }, [landingId, clientId]);

  return null;
}
