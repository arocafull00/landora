import { Check, FileText } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type { EditorPageOption } from "../editor-model";
import type { EditorPageTarget } from "@/lib/dashboard-data";
export function EditorPageMenuItem({ page, selected, onSelect }: { page: EditorPageOption; selected: boolean; onSelect: (target: EditorPageTarget) => void }) {
  return <DropdownMenuItem onSelect={() => onSelect(page.target)}><FileText aria-hidden /><span className="min-w-0 flex-1 truncate">{page.label}</span>{selected ? <Check aria-hidden className="size-4 text-primary" /> : null}</DropdownMenuItem>;
}
