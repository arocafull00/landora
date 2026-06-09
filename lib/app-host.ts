export const RESERVED_SLUGS = new Set([
  "editor",
  "assets",
  "domain",
  "admin",
  "preview",
  "sign-in",
  "api",
]);

export function normalizeHost(host: string) {
  return host.split(":")[0].trim().toLowerCase();
}

export function isAppHost(host: string) {
  const normalized = normalizeHost(host);
  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN?.trim().toLowerCase();

  if (appDomain && normalized === appDomain) return true;
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
