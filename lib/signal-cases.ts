import type { GalleryItem } from "@/lib/dashboard-data";
import { resolveProjectLinkType } from "@/lib/portfolio-projects";

export function hasSignalCaseStudy(item: GalleryItem) {
  return Boolean(item.caseProblem?.trim() && item.projectBody?.trim());
}

export function findSignalCaseBySlug(
  gallery: readonly GalleryItem[],
  caseSlug: string,
) {
  return gallery.find(
    (item) =>
      resolveProjectLinkType(item) === "internal" &&
      item.projectSlug === caseSlug &&
      hasSignalCaseStudy(item),
  );
}

export function getSignalCaseHref({
  previewLandingId,
  projectSlug,
}: {
  previewLandingId?: string;
  projectSlug: string;
}) {
  if (previewLandingId) {
    return `/preview/${previewLandingId}/casos/${projectSlug}`;
  }
  return `/casos/${projectSlug}`;
}

export function getSignalCasePublicPath(caseSlug: string) {
  return `/casos/${caseSlug}`;
}
