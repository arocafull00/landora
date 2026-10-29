"use client";

import { Analytics } from "@vercel/analytics/react";

export function VercelAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => {
        if (document.prerendering) return null;
        const url = new URL(event.url);
        return {
          ...event,
          url: `${url.origin}/${url.hostname}${url.pathname}${url.search}${url.hash}`,
        };
      }}
    />
  );
}
