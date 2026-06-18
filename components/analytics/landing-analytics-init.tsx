"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export function LandingAnalyticsInit({
  landingId,
  clientId,
}: {
  landingId: string;
  clientId: string;
}) {
  useEffect(() => {
    posthog.register({ landingId, clientId });
    posthog.capture("$pageview");
    posthog.capture("page_view");
  }, [landingId, clientId]);

  return null;
}
