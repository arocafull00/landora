"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { runAfterActivation } from "@/lib/analytics/prerender-activation";
import { useConsentStore } from "@/stores/consent-store";
import { isPublicAnalyticsEvent } from "@/lib/public-render-contracts";

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

    return runAfterActivation(() => {
      posthog.opt_in_capturing();
      posthog.startSessionRecording();
      posthog.register({ landingId, clientId });
      posthog.capture("$pageview");
      posthog.capture("page_view");
    });
  }, [landingId, clientId, status]);

  useEffect(() => {
    if (status !== "accepted") return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trackedElement = target.closest<HTMLElement>(
        "[data-analytics-event]",
      );
      const events = trackedElement?.dataset.analyticsEvent?.split(" ") ?? [];

      for (const trackedEvent of events) {
        if (isPublicAnalyticsEvent(trackedEvent)) {
          posthog.capture(trackedEvent);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [status]);

  return null;
}
