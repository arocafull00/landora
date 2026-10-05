import { ChevronDown, FileText, PanelLeft, Rocket, Save } from "lucide-react";
import type { EditorPageTarget, Landing } from "@/lib/dashboard-data";
import type { PreviewDevice } from "@/components/dashboard/preview-toolbar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CopyMorphButton } from "@/components/ui/copy-morph-button";
import { StatusBadge } from "@/components/ui/primitives";
import { DashboardTutorialButton } from "@/components/dashboard/dashboard-tutorial";
import { EditorPageMenuItem } from "./editor/components/editor-page-menu-item";
import { EditorDeviceControls } from "./editor/components/editor-device-controls";
import type { EditorPageOption } from "./editor/editor-model";
import { EDITOR_COPY } from "./editor/editor-copy";
import { EditorExitImpersonationButton } from "./editor/components/editor-exit-impersonation-button";

export function EditorToolbar({ landing, pages, page, device, busy, previewHref, onPageChange, onDeviceChange, onStructureOpen, onManagePages, onSave, onPublish }: {
  landing: Landing; pages: EditorPageOption[]; page: EditorPageOption; device: PreviewDevice; busy: boolean;
  previewHref: string; onPageChange: (target: EditorPageTarget) => void; onDeviceChange: (device: PreviewDevice) => void;
  onStructureOpen: () => void; onManagePages: () => void; onSave: () => void; onPublish: () => void;
}) {
  return <header className="grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-surface px-3 py-2.5 lg:grid-cols-[minmax(0,1fr)_minmax(160px,220px)_minmax(0,1fr)] lg:px-4">
    <div className="flex min-w-0 items-center gap-2">
      <button type="button" aria-label={EDITOR_COPY.structure} aria-haspopup="dialog" onClick={onStructureOpen} className="rounded-lg p-2 text-ink-secondary hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary xl:hidden"><PanelLeft aria-hidden className="size-4" /></button>
      <h1 className="truncate font-headline text-[15px] font-semibold text-ink">{landing.name}</h1>
      <span className="hidden shrink-0 sm:block"><StatusBadge status={landing.status} /></span>
    </div>
    <div className="col-span-2 row-start-2 min-w-0 lg:col-span-1 lg:col-start-2 lg:row-start-1">
      <DropdownMenu><DropdownMenuTrigger className="flex h-9 w-full items-center gap-2 rounded-lg border border-border px-3 text-sm text-ink hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <FileText aria-hidden className="size-4 shrink-0 text-ink-muted" /><span className="min-w-0 flex-1 truncate text-left">{page.label}</span><ChevronDown aria-hidden className="size-4 shrink-0 text-ink-muted" />
      </DropdownMenuTrigger><DropdownMenuContent align="center" className="max-h-[60dvh] w-64 overflow-y-auto">
        {pages.map((entry) => <EditorPageMenuItem key={entry.id} page={entry} selected={entry.id === page.id} onSelect={onPageChange} />)}
        <DropdownMenuSeparator /><DropdownMenuItem onSelect={onManagePages}><FileText aria-hidden />{EDITOR_COPY.managePages}</DropdownMenuItem>
      </DropdownMenuContent></DropdownMenu>
    </div>
    <div className="flex shrink-0 items-center justify-end gap-1.5 lg:col-start-3">
      <span className="hidden sm:block"><EditorDeviceControls device={device} onChange={onDeviceChange} /></span>
      <span className="hidden lg:block"><DashboardTutorialButton /></span>
      <span className="hidden sm:block"><CopyMorphButton id="tutorial-copy-link" label="Copiar enlace" showLabel={false} successMessage="Enlace copiado" errorMessage="No se pudo copiar el enlace" value={() => new URL(previewHref, window.location.origin).href} /></span>
      <button type="button" id="tutorial-save" disabled={busy} onClick={onSave} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-2.5 text-sm font-medium text-ink hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"><Save aria-hidden className="size-4 sm:hidden" /><span className="hidden sm:inline">{EDITOR_COPY.save}</span><span className="sr-only sm:hidden">{EDITOR_COPY.save}</span></button>
      <button type="button" id="tutorial-publish" disabled={busy} onClick={onPublish} className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-semibold text-on-primary hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50"><Rocket aria-hidden className="size-4" /><span>{EDITOR_COPY.publish}</span></button>
      <EditorExitImpersonationButton />
    </div>
  </header>;
}
