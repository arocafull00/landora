import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BookingEmptyState({
  icon: Icon,
  message,
  actionLabel,
  onAction,
}: {
  icon: LucideIcon;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-outline-variant bg-surface-container-low px-4 py-8 text-center">
      <Icon className="size-8 text-on-surface-variant" aria-hidden />
      <p className="font-body text-body-sm text-on-surface-variant">{message}</p>
      {actionLabel && onAction ? (
        <Button type="button" variant="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
