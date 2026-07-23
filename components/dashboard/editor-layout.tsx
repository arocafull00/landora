"use client";

import { useState, type ReactNode } from "react";
import { EditorToolbar } from "@/components/dashboard/editor-toolbar";
import { IframeLandingPreview } from "@/components/dashboard/iframe-landing-preview";
import { PreviewFullscreenOverlay } from "@/components/dashboard/preview-fullscreen-overlay";
import type { PreviewDevice } from "@/components/dashboard/preview-toolbar";
import { useDashboardStore } from "@/stores/dashboard-store";
import { EditorLayoutTabs } from "@/components/dashboard/editor-layout-tabs";
import { getEditorScrollTarget } from "@/lib/template-sections";
import { AppearanceEditorPanel } from "@/components/dashboard/appearance/appearance-editor-panel";

export function EditorLayout({
  form,
  scrollTarget,
}: {
  form: ReactNode;
  scrollTarget?: string;
}) {
  const activeEditorTab = useDashboardStore((state) => state.activeEditorTab);
  const activePageTarget = useDashboardStore((state) => state.activePageTarget);
  const activeLandingId = useDashboardStore((state) => state.activeLandingId);
  const landings = useDashboardStore((state) => state.landings);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [device, setDevice] = useState<PreviewDevice>("desktop");

  const activeLanding =
    landings.find((landing) => landing.id === activeLandingId) ?? landings[0];

  if (!activeLanding) return null;

  const resolvedScrollTarget =
    activePageTarget.type === "home"
      ? scrollTarget ??
        getEditorScrollTarget(activeLanding.template, activeEditorTab)
      : undefined;

  return (
    <section className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-surface">
      <EditorToolbar />
      <EditorLayoutTabs />
      <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden xl:grid-cols-[minmax(320px,380px)_1fr]">
        <div id="tutorial-editor-form" className="min-h-0 overflow-y-auto border-r border-outline-variant bg-surface-container-low p-unit-lg">
          <div className="space-y-unit-md">
            {activeEditorTab === "Diseño" ? (
              <AppearanceEditorPanel landing={activeLanding} />
            ) : (
              form
            )}
          </div>
        </div>
        <IframeLandingPreview
          className="min-h-0 bg-surface-bg p-unit-md"
          content={activeLanding.content}
          device={device}
          landingId={activeLanding.id}
          onDeviceChange={setDevice}
          onFullscreen={() => setIsFullscreen(true)}
          scrollTarget={resolvedScrollTarget}
          sectionSelections={activeLanding.sectionSelections}
          pageTarget={activePageTarget}
          template={activeLanding.template}
        />
      </div>
      {isFullscreen ? (
        <PreviewFullscreenOverlay
          content={activeLanding.content}
          device={device}
          landingId={activeLanding.id}
          onClose={() => setIsFullscreen(false)}
          onDeviceChange={setDevice}
          scrollTarget={resolvedScrollTarget}
          sectionSelections={activeLanding.sectionSelections}
          pageTarget={activePageTarget}
          template={activeLanding.template}
        />
      ) : null}
    </section>
  );
}
