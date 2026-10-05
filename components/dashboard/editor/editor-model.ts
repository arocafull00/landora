import type { EditorPageTarget, Landing } from "@/lib/dashboard-data";
import { getTemplate, getVisibleEditorTabs } from "@/lib/template-registry";
import { getOrderedTemplateSections } from "@/lib/template-sections";
import { resolveProjectLinkType } from "@/lib/portfolio-projects";
import { EDITOR_COPY } from "./editor-copy";

export type EditorStructureItem = {
  id: string; label: string; anchor?: string; hidden: boolean; required: boolean;
  editable: boolean; canMoveUp: boolean; canMoveDown: boolean;
};
export type EditorStructureGroup = { label: string; items: EditorStructureItem[] };
export type EditorPageOption = { id: string; label: string; target: EditorPageTarget };

export function getEditorPages(landing: Landing): EditorPageOption[] {
  const pages: EditorPageOption[] = [{ id: "home", label: EDITOR_COPY.home, target: { type: "home" } }];
  if (landing.template === "portfolio") {
    if (landing.content.enabledPages.includes("about")) pages.push({ id: "about", label: "About me", target: { type: "about" } });
    for (const project of landing.content.gallery ?? []) {
      if (resolveProjectLinkType(project) !== "internal" || !project.projectSlug) continue;
      pages.push({ id: project.id, label: project.title || EDITOR_COPY.project, target: { type: "project", projectId: project.id } });
    }
  }
  if (landing.template === "ristorante") pages.push({ id: "carta", label: "Carta", target: { type: "carta" } });
  return pages;
}

export function getEditorPageId(target: EditorPageTarget) {
  return target.type === "project" ? target.projectId : target.type;
}

export function getEditorStructure(landing: Landing, page: EditorPageTarget, isAdmin: boolean, bookingEnabled: boolean): EditorStructureGroup[] {
  const groups: EditorStructureGroup[] = [];
  const item = (id: string, label: string): EditorStructureItem => ({ id, label, hidden: false, required: true, editable: true, canMoveUp: false, canMoveDown: false });
  if (page.type === "about" || page.type === "project") {
    return [{ label: EDITOR_COPY.content, items: [item("page-content", EDITOR_COPY.pageContent)] }, { label: EDITOR_COPY.settings, items: [item("Diseño", "Diseño")] }];
  }
  const tabs = getVisibleEditorTabs(landing.template, [], isAdmin, bookingEnabled);
  const tabMap = new Map(tabs.map((tab) => [tab.id, tab]));
  const sections = getOrderedTemplateSections(landing.template, landing.content.sectionOrder).filter((section) => {
    if (section.anchor === "reservas" && !bookingEnabled) return false;
    if (page.type === "carta") return section.editorTabId === "Carta";
    return !section.separatePage;
  });
  const hidden = new Set(landing.content.hiddenSections ?? []);
  const movable = sections.filter((section) => !section.required && !hidden.has(section.anchor));
  const sectionItems = sections.map((section): EditorStructureItem => {
    const index = movable.findIndex((entry) => entry.anchor === section.anchor);
    return {
      ...item(section.editorTabId ?? section.anchor, section.editorTabId ? tabMap.get(section.editorTabId)?.label ?? section.label : section.label),
      anchor: section.anchor, hidden: hidden.has(section.anchor), required: section.required ?? false,
      editable: Boolean(section.editorTabId && tabMap.has(section.editorTabId)),
      canMoveUp: index > 0, canMoveDown: index >= 0 && index < movable.length - 1,
    };
  });
  const used = new Set(sections.map((section) => section.editorTabId));
  const extraTabs = tabs.filter((tab) => !used.has(tab.id) && tab.id !== "Secciones" && tab.id !== "Carta");
  const header = page.type === "home" ? [item("Navegación", "Navegación"), ...sectionItems.filter((entry) => entry.id === "Franja" && !entry.hidden)] : [];
  const content = sectionItems.filter((entry) => entry.id !== "Footer" && entry.id !== "Franja" && !entry.hidden);
  if (page.type === "home") content.push(...extraTabs.filter((tab) => tab.group !== "config").map((tab) => item(tab.id, tab.label)));
  const footer = sectionItems.filter((entry) => entry.id === "Footer" && !entry.hidden);
  const settings = page.type === "home" ? extraTabs.filter((tab) => tab.group === "config" && tab.id !== "Navegación").map((tab) => item(tab.id, tab.label)) : [];
  for (const [label, items] of [[EDITOR_COPY.header, header], [EDITOR_COPY.content, content], [EDITOR_COPY.footer, footer], [EDITOR_COPY.settings, settings], [EDITOR_COPY.hidden, sectionItems.filter((entry) => entry.hidden)]] as const) {
    if (items.length) groups.push({ label, items });
  }
  return groups;
}

export function getValidEditorTab(landing: Landing, target: EditorPageTarget, current: string, isAdmin: boolean, bookingEnabled: boolean) {
  if (target.type === "about" || target.type === "project") return "page-content";
  if (target.type === "carta") return "Carta";
  const tabs = getVisibleEditorTabs(landing.template, landing.content.hiddenSections, isAdmin, bookingEnabled);
  return tabs.some((tab) => tab.id === current) ? current : tabs[0]?.id ?? getTemplate(landing.template)?.editorTabs[0]?.id ?? "Hero";
}
