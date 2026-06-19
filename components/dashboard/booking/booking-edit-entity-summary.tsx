import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function BookingEditEntitySummary({
  name,
  badge,
  icon: Icon,
  initial,
}: {
  name: string;
  badge: ReactNode;
  icon?: LucideIcon;
  initial?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 pt-1">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
          {Icon ? (
            <Icon className="h-5 w-5 text-primary" aria-hidden />
          ) : (
            <span className="font-headline text-headline-sm font-semibold text-primary">
              {initial}
            </span>
          )}
        </div>
        <p className="truncate font-headline text-headline-sm font-semibold text-on-surface">
          {name || "Sin nombre"}
        </p>
      </div>
      {badge}
    </div>
  );
}
