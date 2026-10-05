"use client";

import { X } from "lucide-react";
import type { LandingContent, LandingSectionSelections, EditorPageTarget, TemplateId } from "@/lib/dashboard-data";
import { IframeLandingPreview } from "@/components/dashboard/iframe-landing-preview";
import type { PreviewDevice } from "@/components/dashboard/preview-toolbar";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { EDITOR_COPY } from "./editor/editor-copy";

export function PreviewFullscreenOverlay({ content, device, landingId, onClose, onDeviceChange, onPageTargetChange, scrollTarget, sectionSelections, pageTarget = { type: "home" }, template = "velar" }: {
  content: LandingContent; device: PreviewDevice; landingId: string; onClose: () => void;
  onDeviceChange: (device: PreviewDevice) => void; onPageTargetChange: (target: EditorPageTarget) => void;
  scrollTarget?: string; sectionSelections: LandingSectionSelections; pageTarget?: EditorPageTarget; template?: TemplateId;
}) {
  return <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
    <DialogContent showCloseButton={false} className="editor-workspace inset-0 flex h-dvh w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none border-0 bg-canvas p-3 sm:max-w-none">
      <DialogTitle className="sr-only">{EDITOR_COPY.preview}</DialogTitle><DialogDescription className="sr-only">{EDITOR_COPY.closeFullscreen}</DialogDescription>
      <button type="button" aria-label={EDITOR_COPY.closeFullscreen} onClick={onClose} className="absolute right-4 top-4 z-10 rounded-lg bg-surface p-2 text-ink hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary"><X aria-hidden className="size-4" /></button>
      <IframeLandingPreview className="min-h-0 flex-1 [&>div:first-child]:pr-14" content={content} device={device} landingId={landingId} onDeviceChange={onDeviceChange} onPageTargetChange={onPageTargetChange} scrollTarget={scrollTarget} sectionSelections={sectionSelections} pageTarget={pageTarget} template={template} />
    </DialogContent>
  </Dialog>;
}
