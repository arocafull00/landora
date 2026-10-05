import type { ReactNode } from "react";
import { EDITOR_COPY } from "../editor-copy";
export function EditorProperties({ title, saveLabel, children }: { title: string; saveLabel: string; children: ReactNode }) {
  return <aside aria-label={EDITOR_COPY.properties} className="flex min-h-0 flex-1 flex-col border-l border-border bg-surface">
    <div className="border-b border-border px-4 py-4"><p className="text-xs text-ink-muted">{EDITOR_COPY.properties}</p><h2 className="mt-1 font-headline text-base font-semibold text-ink">{title}</h2></div>
    <div id="tutorial-editor-form" className="editor-properties min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-2">{children}</div>
    <div role="status" aria-live="polite" className="border-t border-border px-4 py-3 text-xs text-ink-secondary">{saveLabel}</div>
  </aside>;
}
