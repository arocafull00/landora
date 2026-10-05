import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PRODUCTS_LIST_COPY } from "../products-list-copy";

const TONES = {
  published: { badge: "bg-success-subtle text-success-strong", dot: "bg-success" },
  draft: { badge: "bg-surface-container text-ink-secondary", dot: "bg-ink-faint" },
  archived: { badge: "bg-warning-subtle text-warning-strong", dot: "bg-warning" },
} as const;

export function ProductStatusBadge({ status, hasPendingChanges }: { status: "draft" | "published" | "archived"; hasPendingChanges: boolean }) {
  const pending = status === "published" && hasPendingChanges;
  const tone = pending ? TONES.archived : TONES[status];
  return (
    <Badge variant="outline" className={cn("gap-1.5 border-transparent px-2.5 py-1", tone.badge)}>
      <span className={cn("size-1.5 rounded-full", tone.dot)} aria-hidden />
      {pending ? PRODUCTS_LIST_COPY.status.pending : PRODUCTS_LIST_COPY.status[status]}
    </Badge>
  );
}
