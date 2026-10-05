import type { EditorStructureGroup as StructureGroup } from "../editor-model";
import { EditorStructureRow } from "./editor-structure-row";

export function EditorStructureGroup({ group, activeTab, pendingSection, onSelect, onAction }: {
  group: StructureGroup; activeTab: string; pendingSection: string | null;
  onSelect: (id: string) => void; onAction: (anchor: string, action: "hide" | "restore" | "up" | "down") => void;
}) {
  return <section className="space-y-1">
    <h3 className="px-3 pb-1 pt-3 text-xs font-semibold text-ink-muted">{group.label}</h3>
    {group.items.map((item) => <EditorStructureRow key={item.id} item={item} selected={activeTab === item.id} pending={pendingSection !== null} onSelect={onSelect} onAction={onAction} />)}
  </section>;
}
