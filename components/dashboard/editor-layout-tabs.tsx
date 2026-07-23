"use client";

import { useMemo } from "react";
import { EditorTabsBar } from "@/components/dashboard/editor-tabs-bar";
import { getVisibleEditorTabs } from "@/lib/template-registry";
import { useDashboardStore } from "@/stores/dashboard-store";

const EMPTY_HIDDEN_SECTIONS: string[] = [];

export function EditorLayoutTabs() {
  const activeEditorTab = useDashboardStore((state) => state.activeEditorTab);
  const activeSitePage = useDashboardStore((state) => state.activeSitePage);
  const activeLandingId = useDashboardStore((state) => state.activeLandingId);
  const isAdmin = useDashboardStore((state) => state.isAdmin);
  const landings = useDashboardStore((state) => state.landings);
  const setActiveEditorTab = useDashboardStore((state) => state.setActiveEditorTab);

  const activeLanding =
    landings.find((landing) => landing.id === activeLandingId) ?? landings[0];

  const hiddenSections = activeLanding?.content.hiddenSections ?? EMPTY_HIDDEN_SECTIONS;
  const template = activeLanding?.template;

  const tabs = useMemo(
    () => (template ? getVisibleEditorTabs(template, hiddenSections, isAdmin) : []),
    [template, hiddenSections, isAdmin],
  );

  if (!template || activeSitePage !== "home") return null;

  return (
    <EditorTabsBar
      activeTab={activeEditorTab}
      onTabChange={setActiveEditorTab}
      tabs={tabs}
    />
  );
}
