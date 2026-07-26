import "server-only";

import { logger } from "@/lib/logger";
import { getPublicLandingUrl } from "@/lib/public-site-url";

const WARMUP_TIMEOUT_MS = 5_000;

async function warmPublicPath(
  landing: {
    id: string;
    slug: string;
    customDomain?: string | null;
  },
  pathname = "",
) {
  const response = await fetch(getPublicLandingUrl(landing, pathname), {
    cache: "no-store",
    signal: AbortSignal.timeout(WARMUP_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(
      `Landing warmup failed for ${pathname || "/"} with status ${response.status}`,
    );
  }
}

export async function warmPublicLanding(landing: {
  id: string;
  slug: string;
  customDomain?: string | null;
}) {
  try {
    await warmPublicPath(landing);
    logger.info(logger.fmt`Landing ${landing.id} warmup completed`);
  } catch (error) {
    logger.captureException(error, {
      action: "warm-public-landing",
      landingId: landing.id,
    });
  }
}

export async function warmPublicBlogPost(
  landing: {
    id: string;
    slug: string;
    customDomain?: string | null;
  },
  postSlug: string,
) {
  try {
    await Promise.all([
      warmPublicPath(landing, "/blog"),
      warmPublicPath(landing, `/blog/${postSlug}`),
    ]);
    logger.info(
      logger.fmt`Landing ${landing.id} blog post ${postSlug} warmup completed`,
    );
  } catch (error) {
    logger.captureException(error, {
      action: "warm-public-blog-post",
      landingId: landing.id,
    });
  }
}
