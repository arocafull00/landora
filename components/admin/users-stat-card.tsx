import type { LucideIcon } from "lucide-react";

export function UsersStatCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: number;
  detail?: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 px-4 py-4">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-surface-container-low text-on-surface-variant">
        <Icon aria-hidden className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="truncate font-body text-body-sm text-on-surface-variant">
          {label}
        </p>
        <div className="mt-0.5 flex items-baseline gap-1.5">
          <p className="font-headline text-xl font-semibold text-on-surface">{value}</p>
          {detail ? (
            <p className="font-body text-xs text-on-surface-variant">{detail}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
