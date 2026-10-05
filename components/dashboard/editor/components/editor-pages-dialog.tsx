import { Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { EditorPageTarget, Landing } from "@/lib/dashboard-data";
import type { EditorPageOption } from "../editor-model";
import { EDITOR_COPY } from "../editor-copy";
import { EditorPageRow } from "./editor-page-row";

export function EditorPagesDialog({ open, onOpenChange, pages, pageId, landing, onSelect, onAddAbout, onRemoveAbout }: {
  open: boolean; onOpenChange: (open: boolean) => void; pages: EditorPageOption[]; pageId: string; landing: Landing;
  onSelect: (target: EditorPageTarget) => void; onAddAbout: () => void; onRemoveAbout: () => void;
}) {
  const aboutEnabled = landing.content.enabledPages.includes("about");
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="bg-surface">
    <DialogHeader><DialogTitle>{EDITOR_COPY.pages}</DialogTitle><DialogDescription>{EDITOR_COPY.pageDescription}</DialogDescription></DialogHeader>
    <div className="max-h-[50dvh] overflow-y-auto">{pages.map((page) => <EditorPageRow key={page.id} page={page} selected={page.id === pageId} onSelect={onSelect} />)}</div>
    {landing.template === "portfolio" ? <button type="button" onClick={aboutEnabled ? onRemoveAbout : onAddAbout} className="flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-ink hover:bg-muted">{aboutEnabled ? <Trash2 aria-hidden className="size-4" /> : <Plus aria-hidden className="size-4" />}{aboutEnabled ? EDITOR_COPY.removeAbout : EDITOR_COPY.addAbout}</button> : null}
  </DialogContent></Dialog>;
}
