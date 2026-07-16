import posthog from "posthog-js";
import * as Sentry from "@sentry/nextjs";

const projectToken =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ?? process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (projectToken) {
  posthog.init(projectToken, {
    api_host: "/ingest",
    ui_host: "https://eu.posthog.com",
    defaults: "2026-01-30",
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_pageleave: true,
    capture_exceptions: true,
    opt_out_capturing_by_default: true,
    disable_session_recording: true,
    persistence: "memory",
    debug: process.env.NEXT_PUBLIC_POSTHOG_DEBUG === "1",
  });
}

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enableLogs: true,
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1,
  integrations: [
    Sentry.consoleLoggingIntegration({ levels: ["warn", "error"] }),
  ],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;