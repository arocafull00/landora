"use client";

import { use, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDashboardStore } from "@/stores/dashboard-store";
import { useDashboardChrome } from "@/components/dashboard/dashboard-chrome-context";
import { getEditorScrollTarget } from "@/lib/template-sections";
import { getPreviewLandingPath, getPublicLandingUrl } from "@/lib/public-site-url";
import type { EditorPageTarget } from "@/lib/dashboard-data";
import type { PreviewDevice } from "@/components/dashboard/preview-toolbar";
import { getEditorPageId, getEditorPages, getEditorStructure, getValidEditorTab } from "../editor-model";
import { EDITOR_COPY } from "../editor-copy";
import { EditorCatalogContext } from "../editor-catalog-context";

export function useEditorWorkspace(scrollTarget?: string) {
  const state = useDashboardStore(useShallow((value) => ({
    landings: value.landings, activeLandingId: value.activeLandingId, activeEditorTab: value.activeEditorTab,
    activePageTarget: value.activePageTarget, isAdmin: value.isAdmin, saveStatus: value.saveStatus,
    setActiveEditorTab: value.setActiveEditorTab, setActivePageTarget: value.setActivePageTarget,
    saveLanding: value.saveLanding, publishLanding: value.publishLanding,
    hideSection: value.hideSection, restoreSection: value.restoreSection, moveSection: value.moveSection,
    addSitePage: value.addSitePage, removeSitePage: value.removeSitePage,
  })));
  const { bookingModuleEnabled } = useDashboardChrome();
  const catalog = use(EditorCatalogContext);
  const isMobile = useIsMobile();
  const [device, setDevice] = useState<PreviewDevice>("desktop");
  const [mode, setMode] = useState<"edit" | "preview">("preview");
  const [structureOpen, setStructureOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [pendingSection, setPendingSection] = useState<string | null>(null);
  const landing = state.landings.find((entry) => entry.id === state.activeLandingId) ?? state.landings[0];
  const productSlug = state.activePageTarget.type === "product" ? state.activePageTarget.productSlug : catalog.productSlug;
  const pages = landing ? getEditorPages(landing, catalog.enabled, productSlug) : [];
  const page = pages.find((entry) => entry.id === getEditorPageId(state.activePageTarget)) ?? pages[0];
  const groups = landing ? getEditorStructure(landing, state.activePageTarget, state.isAdmin, bookingModuleEnabled) : [];
  const title = groups.flatMap((group) => group.items).find((entry) => entry.id === state.activeEditorTab)?.label ?? EDITOR_COPY.pageContent;
  const resolvedScrollTarget = landing && (state.activePageTarget.type === "home" || state.activePageTarget.type === "carta")
    ? scrollTarget ?? getEditorScrollTarget(landing.template, state.activeEditorTab) : undefined;
  const saveLabel = state.saveStatus === "saving" ? EDITOR_COPY.saving
    : state.saveStatus === "error" ? EDITOR_COPY.error
    : landing?.edited === "Unsaved changes" ? EDITOR_COPY.pending : EDITOR_COPY.saved;
  const pathname = state.activePageTarget.type === "about" ? "/about"
    : state.activePageTarget.type === "carta" ? "/carta"
    : state.activePageTarget.type === "catalog" ? "/productos"
    : state.activePageTarget.type === "product" ? `/productos/${state.activePageTarget.productSlug}`
    : state.activePageTarget.type === "project" && landing
      ? `/proyectos/${landing.content.gallery?.find((entry) => entry.id === getEditorPageId(state.activePageTarget))?.projectSlug ?? ""}` : "";
  const previewHref = landing ? getPreviewLandingPath(landing.id, pathname) : "";
  const siteHref = landing?.status === "Published" ? getPublicLandingUrl(landing, pathname) : previewHref;
  const selectPage = (target: EditorPageTarget) => {
    if (!landing) return;
    state.setActiveEditorTab(getValidEditorTab(landing, target, state.activeEditorTab, state.isAdmin, bookingModuleEnabled));
    state.setActivePageTarget(target);
    setPagesOpen(false);
    setStructureOpen(false);
  };
  const selectSection = (id: string) => {
    state.setActiveEditorTab(id);
    setStructureOpen(false);
    if (isMobile) setMode("edit");
  };
  const changeSection = async (anchor: string, action: "hide" | "restore" | "up" | "down") => {
    if (!landing || pendingSection) return;
    setPendingSection(anchor);
    try {
      if (action === "hide") await state.hideSection(landing.id, anchor);
      if (action === "restore") await state.restoreSection(landing.id, anchor);
      if (action === "up" || action === "down") await state.moveSection(landing.id, anchor, action === "up" ? -1 : 1);
      if (action === "hide") {
        state.setActiveEditorTab(getValidEditorTab({ ...landing, content: { ...landing.content, hiddenSections: [...(landing.content.hiddenSections ?? []), anchor] } }, state.activePageTarget, state.activeEditorTab, state.isAdmin, bookingModuleEnabled));
      }
    } finally { setPendingSection(null); }
  };
  return {
    landing, pages, page, groups, title, device, setDevice, isMobile, mode, setMode,
    structureOpen, setStructureOpen, pagesOpen, setPagesOpen, fullscreen, setFullscreen,
    pendingSection, selectPage, selectSection, changeSection, resolvedScrollTarget,
    saveLabel, siteHref, previewHref, activeTab: state.activeEditorTab, activePageTarget: state.activePageTarget,
    busy: state.saveStatus === "saving",
    save: () => landing && state.saveLanding(landing.id),
    publish: () => landing && state.publishLanding(landing.id),
    addAbout: () => { if (landing) { state.addSitePage(landing.id, "about"); selectPage({ type: "about" }); } },
    removeAbout: () => { if (landing) { state.removeSitePage(landing.id, "about"); selectPage({ type: "home" }); } },
  };
}
