import type { EditorPageTarget } from "@/lib/dashboard-data";

export function getPreviewTargetAttributes(target?: EditorPageTarget) {
  if (!target) return {};

  return {
    "data-preview-page-target": target.type,
    ...(target.type === "project"
      ? { "data-preview-project-id": target.projectId }
      : {}),
  };
}

export function parsePreviewTarget(element: HTMLElement): EditorPageTarget | null {
  const type = element.dataset.previewPageTarget;
  if (type === "home" || type === "about" || type === "carta") {
    return { type };
  }
  if (type !== "project") return null;

  const projectId = element.dataset.previewProjectId;
  if (!projectId || !/^[a-zA-Z0-9_-]{1,100}$/.test(projectId)) return null;
  return { type, projectId };
}
