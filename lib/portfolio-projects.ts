import type {
  GalleryItem,
  ProjectLinkType,
} from "@/lib/dashboard-data";

export const DEFAULT_PROJECT_BODY =
  "Este proyecto nació con un objetivo claro: resolver un problema concreto con una solución sencilla, reconocible y útil.\n\nTrabajé en la estrategia, el diseño y la implementación para construir una experiencia coherente de principio a fin, cuidando tanto el detalle visual como el resultado de negocio.";

export function resolveProjectLinkType(item: GalleryItem): ProjectLinkType {
  if (item.linkType) return item.linkType;
  return item.link ? "external" : "none";
}

export function createProjectSlug(title: string) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function createUniqueProjectSlug(
  title: string,
  gallery: readonly GalleryItem[],
  currentProjectId: string,
) {
  const base = createProjectSlug(title) || "proyecto";
  const usedSlugs = new Set(
    gallery.flatMap((item) =>
      item.id !== currentProjectId && item.projectSlug
        ? [item.projectSlug]
        : [],
    ),
  );

  if (!usedSlugs.has(base)) return base;

  let suffix = 2;
  while (usedSlugs.has(`${base}-${suffix}`)) {
    suffix += 1;
  }
  return `${base}-${suffix}`;
}

export function getPortfolioProjectHref({
  landingSlug,
  previewLandingId,
  projectId,
  projectSlug,
}: {
  landingSlug: string;
  previewLandingId?: string;
  projectId?: string;
  projectSlug: string;
}) {
  if (previewLandingId && projectId) {
    return `/preview/${previewLandingId}/proyectos/${projectId}`;
  }
  const base = `/${landingSlug.replace(/^\/+|\/+$/g, "")}`;
  return `${base}/proyectos/${projectSlug}`;
}

export function findInternalPortfolioProject(
  gallery: readonly GalleryItem[],
  projectSlug: string,
) {
  return gallery.find(
    (item) =>
      resolveProjectLinkType(item) === "internal" &&
      item.projectSlug === projectSlug,
  );
}
