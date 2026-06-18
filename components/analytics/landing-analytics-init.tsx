"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { useConsentStore } from "@/stores/consent-store";

export function LandingAnalyticsInit({
  landingId,
  clientId,
}: {
  landingId: string;
  clientId: string;
}) {
  const status = useConsentStore((state) => state.status);

  useEffect(() => {
    if (status !== "accepted") return;

    posthog.opt_in_capturing();
    posthog.register({ landingId, clientId });
    posthog.capture("$pageview");
    posthog.capture("page_view");
  }, [landingId, clientId, status]);

  return null;
}
