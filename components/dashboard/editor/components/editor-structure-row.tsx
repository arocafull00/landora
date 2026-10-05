import { ArrowDown, ArrowUp, Eye, EyeOff, LayoutTemplate, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { EditorStructureItem } from "../editor-model";
import { EDITOR_COPY } from "../editor-copy";
import { cn } from "@/lib/utils";

export function EditorStructureRow({ item, selected, pending, onSelect, onAction }: {
  item: EditorStructureItem; selected: boolean; pending: boolean; onSelect: (id: string) => void;
  onAction: (anchor: string, action: "hide" | "restore" | "up" | "down") => void;
}) {
  return (
    <div className={cn("flex items-center gap-1 rounded-lg transition-colors", selected ? "bg-primary-subtle text-primary" : "text-ink-secondary hover:bg-muted")}>
      <button type="button" disabled={!item.editable || item.hidden} onClick={() => onSelect(item.id)}
        aria-current={selected ? "true" : undefined} id={item.id === "Hero" ? "tutorial-hero-tab" : undefined}
        className="flex min-w-0 flex-1 items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-default">
        <LayoutTemplate aria-hidden className="size-4 shrink-0" />
        <span className="truncate">{item.label}</span>
      </button>
      {item.anchor && !item.required ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button" disabled={pending} aria-label={`${EDITOR_COPY.actions}: ${item.label}`} className="mr-1 rounded-md p-1.5 text-ink-muted hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50">
              {item.hidden ? <EyeOff aria-hidden className="size-4" /> : <MoreHorizontal aria-hidden className="size-4" />}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => onAction(item.anchor ?? "", item.hidden ? "restore" : "hide")}>
              <Eye aria-hidden />{item.hidden ? EDITOR_COPY.restore : EDITOR_COPY.hide}
            </DropdownMenuItem>
            {!item.hidden ? <>
              <DropdownMenuItem disabled={!item.canMoveUp} onSelect={() => onAction(item.anchor ?? "", "up")}><ArrowUp aria-hidden />{EDITOR_COPY.up}</DropdownMenuItem>
              <DropdownMenuItem disabled={!item.canMoveDown} onSelect={() => onAction(item.anchor ?? "", "down")}><ArrowDown aria-hidden />{EDITOR_COPY.down}</DropdownMenuItem>
            </> : null}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : item.anchor ? <Eye aria-hidden className="mr-3 size-3.5 shrink-0 text-ink-muted" /> : null}
    </div>
  );
}
