import type {
  EditorPageTarget,
  LandingContent,
  TemplateId,
} from "@/lib/dashboard-data";
import { resolveProjectLinkType } from "@/lib/portfolio-projects";

type PreviewPageData = {
  content: LandingContent;
  template: TemplateId;
};

export function getPreviewPageHref(
  landingId: string,
  target: EditorPageTarget,
) {
  const baseHref = `/preview/${encodeURIComponent(landingId)}`;

  if (target.type === "about") {
    return `${baseHref}/about`;
  }

  if (target.type === "project") {
    return `${baseHref}/proyectos/${encodeURIComponent(target.projectId)}`;
  }

  return baseHref;
}

export function isSameEditorPageTarget(
  left: EditorPageTarget,
  right: EditorPageTarget,
) {
  if (left.type !== right.type) return false;
  if (left.type !== "project" || right.type !== "project") return true;
  return left.projectId === right.projectId;
}

export function isEditablePreviewPageTarget(
  target: EditorPageTarget,
  preview: PreviewPageData,
) {
  if (target.type === "home") return true;
  if (preview.template !== "portfolio") return false;

  if (target.type === "about") {
    return preview.content.enabledPages.includes("about");
  }

  return (preview.content.gallery ?? []).some(
    (item) =>
      item.id === target.projectId &&
      resolveProjectLinkType(item) === "internal" &&
      Boolean(item.projectSlug),
  );
}

export function resolvePreviewPageTarget(
  pathname: string,
  landingId: string,
  preview: PreviewPageData,
): EditorPageTarget | null {
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => {
      try {
        return decodeURIComponent(segment);
      } catch {
        return "";
      }
    });

  if (
    segments.length < 2 ||
    segments[0] !== "preview" ||
    segments[1] !== landingId
  ) {
    return null;
  }

  if (segments.length === 2) {
    return { type: "home" };
  }

  if (segments.length === 3 && segments[2] === "about") {
    const target = { type: "about" } as const;
    return isEditablePreviewPageTarget(target, preview) ? target : null;
  }

  if (
    segments.length !== 4 ||
    segments[2] !== "proyectos" ||
    preview.template !== "portfolio"
  ) {
    return null;
  }

  const projectKey = segments[3];
  const project = (preview.content.gallery ?? []).find(
    (item) =>
      (item.id === projectKey || item.projectSlug === projectKey) &&
      resolveProjectLinkType(item) === "internal" &&
      Boolean(item.projectSlug),
  );

  return project ? { type: "project", projectId: project.id } : null;
}
