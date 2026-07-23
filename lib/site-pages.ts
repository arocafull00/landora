import type { SitePageId } from "@/lib/dashboard-data";

const OPTIONAL_SITE_PAGES: SitePageId[] = ["about"];

export function normalizeEnabledPages(value: unknown): SitePageId[] {
  if (!Array.isArray(value)) return [];

  return OPTIONAL_SITE_PAGES.filter((pageId) => value.includes(pageId));
}

export function isSitePageEnabled(
  enabledPages: readonly string[] | null | undefined,
  pageId: SitePageId,
) {
  return pageId === "home" || enabledPages?.includes(pageId) === true;
}
