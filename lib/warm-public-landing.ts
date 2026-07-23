import "server-only";

import { logger } from "@/lib/logger";
import { getPublicLandingUrl } from "@/lib/public-site-url";

const WARMUP_TIMEOUT_MS = 5_000;

export async function warmPublicLanding(landing: {
  id: string;
  slug: string;
  customDomain?: string | null;
}) {
  try {
    const response = await fetch(getPublicLandingUrl(landing), {
      cache: "no-store",
      signal: AbortSignal.timeout(WARMUP_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`Landing warmup failed with status ${response.status}`);
    }

    logger.info(logger.fmt`Landing ${landing.id} warmup completed`);
  } catch (error) {
    logger.captureException(error, {
      action: "warm-public-landing",
      landingId: landing.id,
    });
  }
}
