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
import { getSubscriptionStatusForProxy } from "@/data/subscriptions";
import { getBookingModuleAccessContextForClerkUser } from "@/data/user-addons";
import {
  getLandingByCustomDomain,
  getPublishedLandingRouteBySlug,
} from "@/data/domains";
import { hasBookingModuleAccess, hasDashboardAccess } from "@/lib/subscription-access";
import { getPublicLandingHost } from "@/lib/public-site-url";

const isSignInRoute = createRouteMatcher(["/sign-in(.*)"]);
const isWebhookRoute = createRouteMatcher(["/api/webhooks/stripe"]);
const isCronRoute = createRouteMatcher(["/api/cron/check-domains"]);
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

  const platformSlug = getPlatformLandingSlug(host);
  if (platformSlug) {
    if (pathname.startsWith("/ingest")) {
      return NextResponse.next();
    }

    if (!isPublicLandingPath(pathname)) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const landing = await getPublishedLandingRouteBySlug(platformSlug);
    if (!landing) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (landing.customDomain) {
      return redirectToLandingHost(req, landing, pathname);
    }

    return rewriteLandingRequest(req, landing.slug);
  }

  if (!isAppHost(host)) {
    if (pathname.startsWith("/ingest")) {
      return NextResponse.next();
    }

    if (!isPublicLandingPath(pathname)) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const landing = await getLandingByCustomDomain(host);
    if (!landing) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return rewriteLandingRequest(req, landing.slug);
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
      const landing = slug
        ? await getPublishedLandingRouteBySlug(slug)
        : null;

      if (landing) {
        return redirectToLandingHost(
          req,
          landing,
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

    const user = await getBookingModuleAccessContextForClerkUser(userId);

    if (hasBookingModuleAccess(user)) {
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

    const user = await getSubscriptionStatusForProxy(userId);

    if (hasDashboardAccess(user)) {
      return NextResponse.next();
    }

    if (user?.suspended) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/sign-in";
      return NextResponse.redirect(redirectUrl);
    }

    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = user ? "/subscribe" : "/account-pending";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!monitoring|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?|ttf)).*)",
  ],
};
