import { getPublicAppDomain } from "@/lib/public-site-url";

export function getLandoraSiteUrl() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (appUrl) {
    return appUrl.replace(/\/+$/, "");
  }

  const appDomain = getPublicAppDomain();
  if (appDomain) {
    return `https://${appDomain}`;
  }

  return "https://landora.app";
}
