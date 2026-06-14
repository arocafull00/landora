"use client";

import { useMemo } from "react";
import type { TemplateId } from "@/lib/dashboard-data";
import { EditorTabsBar } from "@/components/dashboard/editor-tabs-bar";
import { getVisibleEditorTabs } from "@/lib/template-registry";

const EMPTY_HIDDEN_SECTIONS: string[] = [];

export function EditorLayoutTabs({
  activeEditorTab,
  hiddenSections = EMPTY_HIDDEN_SECTIONS,
  isAdmin,
  onTabChange,
  template,
}: {
  activeEditorTab: string;
  hiddenSections?: string[];
  isAdmin: boolean;
  onTabChange: (tab: string) => void;
  template: TemplateId;
}) {
  const tabs = useMemo(
    () => getVisibleEditorTabs(template, hiddenSections, isAdmin),
    [template, hiddenSections, isAdmin],
  );

  return (
    <EditorTabsBar
      activeTab={activeEditorTab}
      onTabChange={onTabChange}
      tabs={tabs}
    />
  );
}
