"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import { Icon } from "@/components/ui/icon";

export function TopAppBar() {
  const activeView = useDashboardStore((state) => state.activeView);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-unit-lg">
      <div className="flex items-center gap-unit-md pr-24">
        {activeView === "assets" || activeView === "settings" ? (
          <label className="relative hidden lg:block">
            <Icon
              name="search"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant"
            />
            <input
              className="h-9 w-64 rounded-full border border-outline-variant bg-surface-container px-10 text-body-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/70 focus:border-primary"
              placeholder="Search..."
              type="search"
            />
          </label>
        ) : null}
        <div className="flex items-center rounded-lg border border-outline-variant bg-surface-container-low p-1">
          <button className="rounded-md bg-white px-3 py-1 font-label text-label-md text-primary shadow-sm" type="button">
            Published
          </button>
          <button className="rounded-md px-3 py-1 font-label text-label-md text-on-surface-variant" type="button">
            Drafts
          </button>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-container font-label text-label-md font-bold text-on-primary-container">
          RA
        </div>
      </div>
    </header>
  );
}
