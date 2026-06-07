"use client";

import { useState, type ReactNode } from "react";
import type { Landing } from "@/lib/dashboard-data";
import { EditorToolbar } from "@/components/dashboard/editor-toolbar";
import { ScaledLandingPreview } from "@/components/dashboard/scaled-landing-preview";
import { PreviewFullscreenOverlay } from "@/components/dashboard/preview-fullscreen-overlay";
import type { PreviewDevice } from "@/components/dashboard/preview-toolbar";

export function EditorLayout({
  activeLanding,
  form,
  landings,
  onPublish,
  onSave,
  onSelectLanding,
  showComments = false,
  tabs,
}: {
  activeLanding: Landing;
  form: ReactNode;
  landings: Landing[];
  onPublish: () => void;
  onSave: () => void;
  onSelectLanding: (id: string) => void;
  showComments?: boolean;
  tabs: ReactNode;
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [device, setDevice] = useState<PreviewDevice>("desktop");

  return (
    <section className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-surface">
      <EditorToolbar
        activeLanding={activeLanding}
        landings={landings}
        onPublish={onPublish}
        onSave={onSave}
        onSelectLanding={onSelectLanding}
        showComments={showComments}
      />
      {tabs}
      <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden xl:grid-cols-[minmax(320px,380px)_1fr]">
        <div className="min-h-0 overflow-y-auto border-r border-outline-variant p-unit-lg">
          <div className="space-y-unit-md">{form}</div>
        </div>
        <ScaledLandingPreview
          className="min-h-0"
          content={activeLanding.content}
          device={device}
          onDeviceChange={setDevice}
          onFullscreen={() => setIsFullscreen(true)}
          template={activeLanding.template}
        />
      </div>
      {isFullscreen ? (
        <PreviewFullscreenOverlay
          content={activeLanding.content}
          device={device}
          onClose={() => setIsFullscreen(false)}
          onDeviceChange={setDevice}
          template={activeLanding.template}
        />
      ) : null}
    </section>
  );
}
