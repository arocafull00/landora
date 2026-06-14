import type { ReactNode } from "react";

export function DashboardListShell({
  columns,
  children,
}: {
  columns: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest">
      <div className="border-b border-outline-variant bg-surface-container-low p-unit-sm font-label text-label-md text-on-surface-variant">
        {columns}
      </div>
      {children}
    </div>
  );
}
