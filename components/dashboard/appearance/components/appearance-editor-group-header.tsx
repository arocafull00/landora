import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function AppearanceEditorGroupHeader({
  groupLabel,
  open,
  summary,
}: {
  groupLabel: string;
  open: boolean;
  summary: string;
}) {
  return (
    <>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-body text-body-md font-semibold text-on-surface">
          {summary}
        </span>
        <span className="mt-0.5 block truncate font-label text-label-sm text-on-surface-variant">
          {groupLabel}
        </span>
      </span>
      {open ? (
        <ChevronDown
          aria-hidden
          className="size-4 shrink-0 text-on-surface-variant"
        />
      ) : (
        <ChevronRight
          aria-hidden
          className={cn("size-4 shrink-0 text-on-surface-variant")}
        />
      )}
    </>
  );
}
