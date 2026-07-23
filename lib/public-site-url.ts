type PublicLandingAddress = {
  slug: string;
  customDomain?: string | null;
};

function normalizeLandingSlug(slug: string) {
  return slug.replace(/^\/+|\/+$/g, "");
}

function normalizePathname(pathname: string) {
  if (!pathname || pathname === "/") return "";
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function getPublicAppDomain() {
  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN?.trim().toLowerCase();
  if (!appDomain) return null;
  return appDomain.startsWith("www.") ? appDomain.slice(4) : appDomain;
}

export function getPublicLandingHost(landing: PublicLandingAddress) {
  if (landing.customDomain) {
    return landing.customDomain.trim().toLowerCase();
  }

  const appDomain = getPublicAppDomain();
  if (!appDomain) {
    throw new Error("NEXT_PUBLIC_APP_DOMAIN is not configured");
  }

  return `${normalizeLandingSlug(landing.slug)}.${appDomain}`;
}

export function getPublicLandingUrl(
  landing: PublicLandingAddress,
  pathname = "",
) {
  return `https://${getPublicLandingHost(landing)}${normalizePathname(pathname)}`;
}

export function getPublicLandingPath(pathname = "") {
  return normalizePathname(pathname) || "/";
}

export function getPreviewLandingPath(
  landingId: string,
  pathname = "",
) {
  return `/preview/${landingId}${normalizePathname(pathname)}`;
}
