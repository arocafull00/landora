"use client";

import { useEffect, useMemo } from "react";
import { EditorTabsBar } from "@/components/dashboard/editor-tabs-bar";
import { useDashboardChrome } from "@/components/dashboard/dashboard-chrome-context";
import { getVisibleEditorTabs } from "@/lib/template-registry";
import { useDashboardStore } from "@/stores/dashboard-store";

const EMPTY_HIDDEN_SECTIONS: string[] = [];

export function EditorLayoutTabs() {
  const { bookingModuleEnabled } = useDashboardChrome();
  const activeEditorTab = useDashboardStore((state) => state.activeEditorTab);
  const activePageTarget = useDashboardStore((state) => state.activePageTarget);
  const activeLandingId = useDashboardStore((state) => state.activeLandingId);
  const isAdmin = useDashboardStore((state) => state.isAdmin);
  const landings = useDashboardStore((state) => state.landings);
  const setActiveEditorTab = useDashboardStore((state) => state.setActiveEditorTab);

  const activeLanding =
    landings.find((landing) => landing.id === activeLandingId) ?? landings[0];

  const hiddenSections = activeLanding?.content.hiddenSections ?? EMPTY_HIDDEN_SECTIONS;
  const template = activeLanding?.template;

  const tabs = useMemo(
    () =>
      template
        ? getVisibleEditorTabs(template, hiddenSections, isAdmin, bookingModuleEnabled)
        : [],
    [template, hiddenSections, isAdmin, bookingModuleEnabled],
  );

  useEffect(() => {
    if (tabs.length === 0) return;
    if (tabs.some((tab) => tab.id === activeEditorTab)) return;
    setActiveEditorTab("Hero");
  }, [tabs, activeEditorTab, setActiveEditorTab]);

  if (!template || activePageTarget.type !== "home") return null;

  return (
    <EditorTabsBar
      activeTab={activeEditorTab}
      onTabChange={setActiveEditorTab}
      tabs={tabs}
    />
  );
}
