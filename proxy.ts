import {
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import {
  getAppCanonicalHost,
  getAppWwwHost,
  isAppHost,
  isPublicSlugPath,
  isReservedPath,
  normalizeHost,
} from "@/lib/app-host";
import { getSubscriptionStatusForProxy } from "@/data/subscriptions";
import { hasActiveSubscription } from "@/lib/subscription-access";
import { getStripePaymentLinkUrl } from "@/lib/stripe";

const isSignInRoute = createRouteMatcher(["/sign-in(.*)"]);
const isTenantResolveRoute = createRouteMatcher(["/api/tenant/resolve"]);
const isWebhookRoute = createRouteMatcher(["/api/webhooks/stripe"]);
const isSubscriptionExemptRoute = createRouteMatcher([
  "/settings(.*)",
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

async function resolveCustomDomainSlug(host: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? `https://${host}`;
  const response = await fetch(
    `${appUrl}/api/tenant/resolve?host=${encodeURIComponent(host)}`,
    { headers: { "x-landora-tenant-resolve": "1" } },
  );

  if (!response.ok) return null;

  const data = (await response.json()) as { slug?: string };
  if (!data.slug) return null;

  return data.slug;
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

  if (!isAppHost(host)) {
    if (isReservedPath(pathname)) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (pathname !== "/") {
      return new NextResponse("Not Found", { status: 404 });
    }

    const slug = await resolveCustomDomainSlug(host);
    if (!slug) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const url = req.nextUrl.clone();
    url.pathname = `/${slug}`;
    return NextResponse.rewrite(url);
  }

  if (isSignInRoute(req) || isTenantResolveRoute(req) || isWebhookRoute(req)) {
    return NextResponse.next();
  }

  if (isPublicSlugPath(pathname)) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    const { isAuthenticated } = await auth();
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = isAuthenticated ? "/editor" : "/sign-in";
    return NextResponse.redirect(redirectUrl);
  }

  if (isProtectedRoute(req)) {
    const { userId } = await auth.protect();

    if (isSubscriptionExemptRoute(req)) {
      return NextResponse.next();
    }

    if (!userId) {
      return NextResponse.next();
    }

    const user = await getSubscriptionStatusForProxy(userId);

    if (user?.type === "admin") {
      return NextResponse.next();
    }

    if (hasActiveSubscription(user?.subscriptionStatus)) {
      return NextResponse.next();
    }

    const paymentLink = getStripePaymentLinkUrl(userId);
    if (!paymentLink) {
      return NextResponse.next();
    }

    return NextResponse.redirect(paymentLink);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?|ttf)).*)",
  ],
};
