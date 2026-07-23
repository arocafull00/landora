import {
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import {
  getAppCanonicalHost,
  getAppWwwHost,
  getPlatformLandingSlug,
  isAppHost,
  isPublicSlugPath,
  normalizeHost,
} from "@/lib/app-host";
import { getPublicLandingHost } from "@/lib/public-site-url";
import {
  proxyAccessResponseSchema,
  proxyLandingResponseSchema,
  type ProxyAccessResponse,
} from "@/lib/schemas/proxy-context";

const isSignInRoute = createRouteMatcher(["/sign-in(.*)"]);
const isWebhookRoute = createRouteMatcher(["/api/webhooks/stripe"]);
const isCronRoute = createRouteMatcher(["/api/cron/check-domains"]);
const isInternalProxyRoute = createRouteMatcher([
  "/api/internal/access-context",
  "/api/internal/landing-route",
]);
const isSentryTunnelRoute = createRouteMatcher(["/monitoring(.*)"]);
const isSentryExampleApiRoute = createRouteMatcher(["/api/sentry-example-api"]);
const isSubscriptionExemptRoute = createRouteMatcher([
  "/settings(.*)",
  "/subscribe(.*)",
  "/account-pending(.*)",
  "/api/webhooks/stripe",
  "/api/stripe/(.*)",
]);
const isProtectedRoute = createRouteMatcher([
  "/editor(.*)",
  "/assets(.*)",
  "/domain(.*)",
  "/blog(.*)",
  "/analytics(.*)",
  "/settings(.*)",
  "/admin(.*)",
  "/api(.*)",
]);
const isBookingRoute = createRouteMatcher([
  "/bookings(.*)",
  "/employees(.*)",
  "/services(.*)",
  "/settings/blocked-periods(.*)",
]);

const PUBLIC_LANDING_PATH =
  /^\/(?:$|about\/?$|book\/?$|blog(?:\/[^/]+)?\/?$|proyectos\/[^/]+\/?$)$/;
const PROXY_CONTEXT_TIMEOUT_MS = 5_000;

type LandingRoute = {
  slug: string;
  customDomain: string | null;
};

type LandingResolution =
  | { status: "resolved"; landing: LandingRoute | null }
  | { status: "unavailable" };

function isPublicLandingPath(pathname: string) {
  return PUBLIC_LANDING_PATH.test(pathname);
}

function getInternalLandingPath(slug: string, pathname: string) {
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, "");
  if (pathname === "/") return `/${normalizedSlug}`;
  return `/${normalizedSlug}${pathname}`;
}

function getLegacyPublicPath(pathname: string) {
  const [, , ...segments] = pathname.split("/");
  return segments.length > 0 ? `/${segments.join("/")}` : "/";
}

function getInternalProxyUrl(req: NextRequest, pathname: string) {
  const url = req.nextUrl.clone();
  const host = normalizeHost(req.headers.get("host") ?? "");

  url.pathname = pathname;
  url.search = "";

  if (host.endsWith(".localhost")) {
    url.hostname = "localhost";
    return url;
  }

  if (isAppHost(host)) return url;

  const canonicalHost = getAppCanonicalHost();
  if (!canonicalHost) return null;

  url.protocol = "https:";
  url.hostname = canonicalHost;
  url.port = "";
  return url;
}

async function resolveLandingRoute(
  req: NextRequest,
  query: { host: string } | { slug: string },
): Promise<LandingResolution> {
  const url = getInternalProxyUrl(req, "/api/internal/landing-route");
  if (!url) return { status: "unavailable" };

  const [key, value] = Object.entries(query)[0];
  url.searchParams.set(key, value);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(PROXY_CONTEXT_TIMEOUT_MS),
    });

    if (!response.ok) return { status: "unavailable" };

    const parsed = proxyLandingResponseSchema.safeParse(await response.json());
    if (!parsed.success) return { status: "unavailable" };

    return {
      status: "resolved",
      landing: parsed.data.landing,
    };
  } catch {
    return { status: "unavailable" };
  }
}

async function resolveAccessContext(
  req: NextRequest,
): Promise<ProxyAccessResponse | null> {
  const url = getInternalProxyUrl(req, "/api/internal/access-context");
  if (!url) return null;

  const headers = new Headers();
  const authorization = req.headers.get("authorization");
  const cookie = req.headers.get("cookie");

  if (authorization) headers.set("authorization", authorization);
  if (cookie) headers.set("cookie", cookie);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers,
      signal: AbortSignal.timeout(PROXY_CONTEXT_TIMEOUT_MS),
    });

    if (!response.ok) return null;

    const parsed = proxyAccessResponseSchema.safeParse(await response.json());
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

function serviceUnavailable() {
  return new NextResponse("Service Unavailable", { status: 503 });
}

function redirectToLandingHost(
  req: NextRequest,
  landing: { slug: string; customDomain: string | null },
  pathname: string,
) {
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.protocol = "https:";
  redirectUrl.hostname = getPublicLandingHost(landing);
  redirectUrl.port = "";
  redirectUrl.pathname = pathname;
  return NextResponse.redirect(redirectUrl, 308);
}

function rewriteLandingRequest(
  req: NextRequest,
  slug: string,
) {
  const url = req.nextUrl.clone();
  url.pathname = getInternalLandingPath(slug, req.nextUrl.pathname);
  return NextResponse.rewrite(url);
}

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const host = normalizeHost(req.headers.get("host") ?? "");
  const { pathname } = req.nextUrl;

  const wwwHost = getAppWwwHost();
  const canonicalHost = getAppCanonicalHost();
  if (wwwHost && canonicalHost && host === wwwHost) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.protocol = "https:";
    redirectUrl.host = canonicalHost;
    return NextResponse.redirect(redirectUrl, 308);
  }

  if (isAppHost(host) && isInternalProxyRoute(req)) {
    return NextResponse.next();
  }

  const platformSlug = getPlatformLandingSlug(host);
  if (platformSlug) {
    if (pathname.startsWith("/ingest")) {
      return NextResponse.next();
    }

    if (!isPublicLandingPath(pathname)) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const resolution = await resolveLandingRoute(req, { slug: platformSlug });
    if (resolution.status === "unavailable") return serviceUnavailable();
    if (!resolution.landing) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (resolution.landing.customDomain) {
      return redirectToLandingHost(req, resolution.landing, pathname);
    }

    return rewriteLandingRequest(req, resolution.landing.slug);
  }

  if (!isAppHost(host)) {
    if (pathname.startsWith("/ingest")) {
      return NextResponse.next();
    }

    if (!isPublicLandingPath(pathname)) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const resolution = await resolveLandingRoute(req, { host });
    if (resolution.status === "unavailable") return serviceUnavailable();
    if (!resolution.landing) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return rewriteLandingRequest(req, resolution.landing.slug);
  }

  if (
    isSignInRoute(req) ||
    isWebhookRoute(req) ||
    isCronRoute(req) ||
    isSentryTunnelRoute(req) ||
    isSentryExampleApiRoute(req)
  ) {
    return NextResponse.next();
  }

  if (isPublicSlugPath(pathname)) {
    if (
      canonicalHost &&
      host === canonicalHost &&
      (req.method === "GET" || req.method === "HEAD")
    ) {
      const slug = pathname.split("/").filter(Boolean)[0];
      const resolution = slug
        ? await resolveLandingRoute(req, { slug })
        : { status: "resolved" as const, landing: null };

      if (resolution.status === "unavailable") return serviceUnavailable();
      if (resolution.landing) {
        return redirectToLandingHost(
          req,
          resolution.landing,
          getLegacyPublicPath(pathname),
        );
      }
    }

    return NextResponse.next();
  }

  if (pathname === "/") {
    const { isAuthenticated } = await auth();
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = isAuthenticated ? "/editor" : "/sign-in";
    return NextResponse.redirect(redirectUrl);
  }

  if (isBookingRoute(req)) {
    const { userId } = await auth.protect();

    if (!userId) {
      return NextResponse.next();
    }

    const access = await resolveAccessContext(req);
    if (!access || !access.authenticated) return serviceUnavailable();

    if (access.bookingAccess) {
      return NextResponse.next();
    }

    const upgradeUrl = req.nextUrl.clone();
    upgradeUrl.pathname = "/booking-upgrade";
    return NextResponse.redirect(upgradeUrl);
  }

  if (isProtectedRoute(req)) {
    if (isSubscriptionExemptRoute(req)) {
      return NextResponse.next();
    }

    const { userId } = await auth.protect();

    if (!userId) {
      return NextResponse.next();
    }

    const access = await resolveAccessContext(req);
    if (!access || !access.authenticated) return serviceUnavailable();

    if (access.dashboardAccess) {
      return NextResponse.next();
    }

    if (access.suspended) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/sign-in";
      return NextResponse.redirect(redirectUrl);
    }

    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = access.userExists ? "/subscribe" : "/account-pending";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!monitoring|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?|ttf)).*)",
  ],
};
