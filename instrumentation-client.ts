import posthog from "posthog-js";

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
    persistence: "memory",
    debug: process.env.NEXT_PUBLIC_POSTHOG_DEBUG === "1",
  });
}
