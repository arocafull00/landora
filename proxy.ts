import {
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import {
  isAppHost,
  isPublicSlugPath,
  isReservedPath,
  normalizeHost,
} from "@/lib/app-host";

const isSignInRoute = createRouteMatcher(["/sign-in(.*)"]);
const isTenantResolveRoute = createRouteMatcher(["/api/tenant/resolve"]);
const isProtectedRoute = createRouteMatcher([
  "/editor(.*)",
  "/assets(.*)",
  "/domain(.*)",
  "/admin(.*)",
  "/preview(.*)",
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

  if (isSignInRoute(req) || isTenantResolveRoute(req)) {
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
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?|ttf)).*)",
  ],
};
