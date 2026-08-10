"use client";

import { Analytics } from "@vercel/analytics/react";

export function VercelAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => (document.prerendering ? null : event)}
    />
  );
}
