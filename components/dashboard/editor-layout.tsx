"use client";

import type { ReactNode } from "react";
import { ExternalLink, Maximize2 } from "lucide-react";
import { EditorToolbar } from "@/components/dashboard/editor-toolbar";
import { IframeLandingPreview } from "@/components/dashboard/iframe-landing-preview";
import { PreviewFullscreenOverlay } from "@/components/dashboard/preview-fullscreen-overlay";
import { AppearanceEditorPanel } from "@/components/dashboard/appearance/appearance-editor-panel";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useEditorWorkspace } from "./editor/hooks/use-editor-workspace";
import { EditorStructure } from "./editor/components/editor-structure";
import { EditorProperties } from "./editor/components/editor-properties";
import { EditorPagesDialog } from "./editor/components/editor-pages-dialog";
import { EditorDeviceControls } from "./editor/components/editor-device-controls";
import { EDITOR_COPY } from "./editor/editor-copy";
import { cn } from "@/lib/utils";

export function EditorLayout({ form, scrollTarget }: { form: ReactNode; scrollTarget?: string }) {
  const editor = useEditorWorkspace(scrollTarget);
  const { landing, page } = editor;
  if (!landing || !page) return null;
  const structure = <EditorStructure groups={editor.groups} activeTab={editor.activeTab} pageLabel={page.label} pendingSection={editor.pendingSection} onSelect={editor.selectSection} onAction={editor.changeSection} onManagePages={() => { editor.setStructureOpen(false); editor.setPagesOpen(true); }} />;
  return <section aria-label="Editor del sitio" className="editor-workspace flex min-w-0 flex-1 flex-col overflow-hidden bg-canvas">
    <EditorToolbar landing={landing} pages={editor.pages} page={page} device={editor.device} busy={editor.busy} previewHref={editor.siteHref} onPageChange={editor.selectPage} onDeviceChange={editor.setDevice} onStructureOpen={() => editor.setStructureOpen(true)} onManagePages={() => editor.setPagesOpen(true)} onSave={editor.save} onPublish={editor.publish} />
    {editor.isMobile ? <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-surface px-3 py-2">
      <div role="group" aria-label={EDITOR_COPY.properties} className="flex rounded-lg bg-muted p-1">
        <button type="button" aria-pressed={editor.mode === "preview"} onClick={() => editor.setMode("preview")} className={cn("rounded-md px-3 py-1.5 text-xs font-medium text-ink", editor.mode === "preview" && "bg-surface")}>{EDITOR_COPY.preview}</button>
        <button type="button" aria-pressed={editor.mode === "edit"} onClick={() => editor.setMode("edit")} className={cn("rounded-md px-3 py-1.5 text-xs font-medium text-ink", editor.mode === "edit" && "bg-surface")}>{EDITOR_COPY.edit}</button>
      </div><EditorDeviceControls device={editor.device} onChange={editor.setDevice} />
    </div> : null}
    <div className={cn("grid min-h-0 flex-1 overflow-hidden", !editor.isMobile && "grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[280px_minmax(0,1fr)_340px]")}>
      <aside aria-label={EDITOR_COPY.structure} className="hidden min-h-0 border-r border-border xl:block">{structure}</aside>
      <div hidden={editor.isMobile && editor.mode === "edit"} className="flex min-h-0 min-w-0 flex-col">
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border-subtle px-3 py-2 text-xs text-ink-muted lg:px-4">
          <span className="min-w-0 truncate">{EDITOR_COPY.preview} · {page.label}</span>
          <div className="flex shrink-0 items-center gap-3"><a href={editor.siteHref} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-ink"><ExternalLink aria-hidden className="size-3.5" />{EDITOR_COPY.openSite}</a><button type="button" aria-label={EDITOR_COPY.fullscreen} onClick={() => editor.setFullscreen(true)} className="rounded p-1 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary"><Maximize2 aria-hidden className="size-4" /></button></div>
        </div>
        <IframeLandingPreview className="min-h-0 flex-1" content={landing.content} device={editor.device} landingId={landing.id} onDeviceChange={editor.setDevice} onPageTargetChange={editor.selectPage} scrollTarget={editor.resolvedScrollTarget} sectionSelections={landing.sectionSelections} pageTarget={editor.activePageTarget} template={landing.template} showToolbar={false} />
      </div>
      <div hidden={editor.isMobile && editor.mode === "preview"} className="flex min-h-0 flex-col">
        <EditorProperties title={editor.title} saveLabel={editor.saveLabel}>{editor.activeTab === "Diseño" ? <AppearanceEditorPanel landing={landing} /> : form}</EditorProperties>
      </div>
    </div>
    <Sheet open={editor.structureOpen} onOpenChange={editor.setStructureOpen}><SheetContent side="left" className="editor-workspace w-[300px] max-w-[90vw] gap-0 bg-surface p-0 motion-reduce:animate-none motion-reduce:transition-none">
      <SheetHeader className="sr-only"><SheetTitle>{EDITOR_COPY.structure}</SheetTitle><SheetDescription>{EDITOR_COPY.previewHint}</SheetDescription></SheetHeader>{structure}
    </SheetContent></Sheet>
    <EditorPagesDialog open={editor.pagesOpen} onOpenChange={editor.setPagesOpen} pages={editor.pages} pageId={page.id} landing={landing} onSelect={editor.selectPage} onAddAbout={editor.addAbout} onRemoveAbout={editor.removeAbout} />
    {editor.fullscreen ? <PreviewFullscreenOverlay content={landing.content} device={editor.device} landingId={landing.id} onClose={() => editor.setFullscreen(false)} onDeviceChange={editor.setDevice} onPageTargetChange={editor.selectPage} scrollTarget={editor.resolvedScrollTarget} sectionSelections={landing.sectionSelections} pageTarget={editor.activePageTarget} template={landing.template} /> : null}
  </section>;
}
