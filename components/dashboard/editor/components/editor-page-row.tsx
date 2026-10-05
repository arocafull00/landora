import { Check, FileText } from "lucide-react";
import type { EditorPageOption } from "../editor-model";
import type { EditorPageTarget } from "@/lib/dashboard-data";
export function EditorPageRow({ page, selected, onSelect }: { page: EditorPageOption; selected: boolean; onSelect: (target: EditorPageTarget) => void }) {
  return <button type="button" disabled={Boolean(page.disabledReason)} title={page.disabledReason} onClick={() => onSelect(page.target)} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-ink hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"><FileText aria-hidden className="size-4 text-ink-muted" /><span className="min-w-0 flex-1"><span className="block truncate">{page.label}</span>{page.disabledReason ? <span className="block text-xs text-ink-muted">{page.disabledReason}</span> : null}</span>{selected ? <Check aria-hidden className="size-4 text-primary" /> : null}</button>;
}
