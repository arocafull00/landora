import { Files } from "lucide-react";
import type { EditorStructureGroup as StructureGroup } from "../editor-model";
import { EDITOR_COPY } from "../editor-copy";
import { EditorStructureGroup } from "./editor-structure-group";

export function EditorStructure({ groups, activeTab, pageLabel, pendingSection, onSelect, onAction, onManagePages }: {
  groups: StructureGroup[]; activeTab: string; pageLabel: string; pendingSection: string | null;
  onSelect: (id: string) => void; onAction: (anchor: string, action: "hide" | "restore" | "up" | "down") => void;
  onManagePages: () => void;
}) {
  return <div className="flex h-full min-h-0 flex-col bg-surface">
    <div className="border-b border-border px-4 py-4"><h2 className="font-headline text-[15px] font-semibold text-ink">{EDITOR_COPY.structure}</h2><p className="mt-1 truncate text-xs text-ink-muted">{pageLabel}</p></div>
    <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-2">{groups.map((group) => <EditorStructureGroup key={group.label} group={group} activeTab={activeTab} pendingSection={pendingSection} onSelect={onSelect} onAction={onAction} />)}</div>
    <div className="border-t border-border p-3"><button type="button" onClick={onManagePages} className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-border text-sm font-medium text-ink hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Files aria-hidden className="size-4" />{EDITOR_COPY.managePages}</button></div>
  </div>;
}
