import { getPublicAppDomain } from "@/lib/public-site-url";

const RESERVED_SLUGS = new Set([
  "editor",
  "assets",
  "domain",
  "blog",
  "analytics",
  "settings",
  "admin",
  "preview",
  "sign-in",
  "api",
  "_sites",
  "privacy",
  "legal",
  "terms",
]);

export function normalizeHost(host: string) {
  return host.split(":")[0].trim().toLowerCase();
}

function getAppDomainHosts() {
  const appDomain = getPublicAppDomain();
  if (!appDomain) return [];

  return [appDomain, `www.${appDomain}`];
}

export function getAppCanonicalHost() {
  return getPublicAppDomain();
}

export function getAppWwwHost() {
  const canonicalHost = getAppCanonicalHost();
  if (!canonicalHost) return null;

  return `www.${canonicalHost}`;
}

export function isReservedAppDomain(host: string) {
  const normalized = normalizeHost(host);
  const canonicalHost = getAppCanonicalHost();

  if (normalized.endsWith(".vercel.app")) return true;
  if (canonicalHost && normalized.endsWith(`.${canonicalHost}`)) return true;

  return getAppDomainHosts().includes(normalized);
}

export function isAppHost(host: string) {
  const normalized = normalizeHost(host);

  if (getAppDomainHosts().includes(normalized)) return true;
  if (normalized.endsWith(".vercel.app")) return true;
  if (normalized === "localhost") return true;

  return false;
}

export function getPlatformLandingSlug(host: string) {
  const normalized = normalizeHost(host);
  const canonicalHost = getAppCanonicalHost();

  if (normalized.endsWith(".localhost")) {
    const slug = normalized.slice(0, -".localhost".length);
    if (!slug || slug.includes(".") || isReservedSlug(slug)) return null;
    return slug;
  }

  if (!canonicalHost || !normalized.endsWith(`.${canonicalHost}`)) return null;

  const slug = normalized.slice(0, -(canonicalHost.length + 1));
  if (!slug || slug.includes(".") || isReservedSlug(slug)) return null;

  return slug;
}

export function isReservedSlug(slug: string) {
  return RESERVED_SLUGS.has(slug.toLowerCase());
}

export function isPublicSlugPath(pathname: string) {
  const segment = pathname.split("/").filter(Boolean)[0];
  if (!segment) return false;
  if (isReservedSlug(segment)) return false;
  return true;
}

export function isReservedPath(pathname: string) {
  const segment = pathname.split("/").filter(Boolean)[0];
  if (!segment) return false;
  return isReservedSlug(segment);
}
