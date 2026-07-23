import { NextRequest, NextResponse } from "next/server";
import {
  getLandingByCustomDomain,
  getPublishedLandingRouteBySlug,
} from "@/data/domains";
import { logger } from "@/lib/logger";
import { proxyLandingQuerySchema } from "@/lib/schemas/proxy-context";

export async function GET(request: NextRequest) {
  const parsed = proxyLandingQuerySchema.safeParse({
    host: request.nextUrl.searchParams.get("host") ?? undefined,
    slug: request.nextUrl.searchParams.get("slug") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const { host, slug } = parsed.data;
    let landing;

    if (host) {
      landing = await getLandingByCustomDomain(host);
    } else if (slug) {
      landing = await getPublishedLandingRouteBySlug(slug);
    } else {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    return NextResponse.json({
      landing: landing
        ? {
            slug: landing.slug,
            customDomain: landing.customDomain,
          }
        : null,
    });
  } catch (error) {
    logger.captureException(error, { action: "resolve-proxy-landing" });
    return NextResponse.json(
      { error: "Unable to resolve landing" },
      { status: 500 },
    );
  }
}
