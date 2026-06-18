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
  "privacy",
  "legal",
  "terms",
]);

export function normalizeHost(host: string) {
  return host.split(":")[0].trim().toLowerCase();
}

function getAppDomainHosts() {
  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN?.trim().toLowerCase();
  if (!appDomain) return [];

  if (appDomain.startsWith("www.")) return [appDomain];

  return [appDomain, `www.${appDomain}`];
}

export function getAppCanonicalHost() {
  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN?.trim().toLowerCase();
  if (!appDomain) return null;

  if (appDomain.startsWith("www.")) return appDomain.slice(4);

  return appDomain;
}

export function getAppWwwHost() {
  const canonicalHost = getAppCanonicalHost();
  if (!canonicalHost) return null;

  return `www.${canonicalHost}`;
}

export function isReservedAppDomain(host: string) {
  const normalized = normalizeHost(host);

  if (normalized.endsWith(".vercel.app")) return true;

  return getAppDomainHosts().includes(normalized);
}

export function isAppHost(host: string) {
  const normalized = normalizeHost(host);

  if (getAppDomainHosts().includes(normalized)) return true;
  if (normalized.endsWith(".vercel.app")) return true;
  if (normalized === "localhost" || normalized.endsWith(".localhost")) return true;

  return false;
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
