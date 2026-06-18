"use client";

import { useCallback } from "react";
import posthog from "posthog-js";

export function useAnalytics() {
  const trackCtaClick = useCallback(() => {
    posthog.capture("cta_click");
  }, []);

  const trackWhatsAppClick = useCallback(() => {
    posthog.capture("whatsapp_click");
  }, []);

  const trackPhoneClick = useCallback(() => {
    posthog.capture("phone_click");
  }, []);

  const trackLeadGenerated = useCallback(() => {
    posthog.capture("lead_generated");
  }, []);

  return {
    trackCtaClick,
    trackWhatsAppClick,
    trackPhoneClick,
    trackLeadGenerated,
  };
}
