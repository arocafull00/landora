import type { ReactNode } from "react";
import type { IconName } from "@/lib/dashboard-data";
import { Icon } from "@/components/ui/icon";

export function DashboardEmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: IconName;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-4 px-unit-md text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-fixed">
        <Icon className="h-7 w-7 text-primary" name={icon} />
      </div>
      <div className="max-w-sm space-y-1">
        <p className="font-body text-body-md font-medium text-on-surface">{title}</p>
        <p className="font-body text-body-sm text-on-surface-variant">{description}</p>
      </div>
      {action}
    </div>
  );
}
