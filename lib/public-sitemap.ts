import type { PublishedLanding } from "@/data/landing-publications";
import { getPublicLandingUrl } from "@/lib/public-site-url";
import { findInternalPortfolioProject } from "@/lib/portfolio-projects";
import { isSitePageEnabled } from "@/lib/site-pages";

type PublicSitemapEntry = {
  url: string;
  lastModified: Date;
};

export function createPublicSitemapEntries(
  landing: PublishedLanding,
): PublicSitemapEntry[] {
  const lastModified = landing.publishedAt ?? new Date(0);
  const entries: PublicSitemapEntry[] = [
    {
      url: getPublicLandingUrl(landing),
      lastModified,
    },
  ];

  if (
    landing.template === "portfolio" &&
    isSitePageEnabled(landing.content.enabledPages, "about")
  ) {
    entries.push({
      url: getPublicLandingUrl(landing, "/about"),
      lastModified,
    });
  }

  for (const project of landing.content.gallery ?? []) {
    const internalProject = findInternalPortfolioProject(
      [project],
      project.projectSlug ?? "",
    );
    if (!internalProject?.projectSlug) continue;

    entries.push({
      url: getPublicLandingUrl(
        landing,
        `/proyectos/${internalProject.projectSlug}`,
      ),
      lastModified,
    });
  }

  return entries;
}

export function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
