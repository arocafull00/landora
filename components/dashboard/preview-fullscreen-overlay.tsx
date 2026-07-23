"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import type {
  LandingContent,
  LandingSectionSelections,
  SitePageId,
  TemplateId,
} from "@/lib/dashboard-data";
import { IframeLandingPreview } from "@/components/dashboard/iframe-landing-preview";
import {
  PreviewToolbar,
  type PreviewDevice,
} from "@/components/dashboard/preview-toolbar";

export function PreviewFullscreenOverlay({
  content,
  device,
  landingId,
  onClose,
  onDeviceChange,
  scrollTarget,
  sectionSelections,
  sitePage = "home",
  template = "velar",
}: {
  content: LandingContent;
  device: PreviewDevice;
  landingId: string;
  onClose: () => void;
  onDeviceChange: (device: PreviewDevice) => void;
  scrollTarget?: string;
  sectionSelections: LandingSectionSelections;
  sitePage?: SitePageId;
  template?: TemplateId;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-surface-bg">
      <div className="flex shrink-0 items-center border-b border-outline-variant bg-surface-container-lowest">
        <div className="flex-1">
          <PreviewToolbar
            device={device}
            onDeviceChange={onDeviceChange}
            scale={1}
            showFullscreen={false}
          />
        </div>
        <button
          aria-label="Close fullscreen preview"
          className="mr-unit-md inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-on-surface-variant transition-colors hover:bg-surface-variant hover:text-primary"
          onClick={onClose}
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <IframeLandingPreview
        className="min-h-0 flex-1"
        content={content}
        device={device}
        landingId={landingId}
        onDeviceChange={onDeviceChange}
        scrollTarget={scrollTarget}
        sectionSelections={sectionSelections}
        showToolbar={false}
        sitePage={sitePage}
        template={template}
      />
    </div>
  );
}
