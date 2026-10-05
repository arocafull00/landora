import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NUVOLETS_EDITOR_COPY } from "../nuvolets-copy";

export function NuvoletsListItemActions({ index, count, remove, move }: { index: number; count: number; remove: (index: number) => void; move: (from: number, to: number) => void }) {
  return (
    <div className="flex shrink-0 gap-1">
      <Button type="button" variant="ghost" size="icon-sm" onClick={() => move(index, index - 1)} disabled={index === 0} aria-label={NUVOLETS_EDITOR_COPY.up}>
        <ArrowUp aria-hidden />
      </Button>
      <Button type="button" variant="ghost" size="icon-sm" onClick={() => move(index, index + 1)} disabled={index === count - 1} aria-label={NUVOLETS_EDITOR_COPY.down}>
        <ArrowDown aria-hidden />
      </Button>
      <Button type="button" variant="destructive" size="icon-sm" onClick={() => remove(index)} aria-label={NUVOLETS_EDITOR_COPY.remove}>
        <Trash2 aria-hidden />
      </Button>
    </div>
  );
}
