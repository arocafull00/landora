"use client";

import Link from "next/link";
import { useLayoutEffect } from "react";
import { dashboardViews, DashboardView, Landing } from "@/lib/dashboard-data";
import { useDashboardStore } from "@/stores/dashboard-store";
import { Icon } from "@/components/ui/icon";
import { IconButton } from "@/components/ui/primitives";
import { AssetsSection } from "@/components/dashboard/sections/assets-section";
import { EditorSection } from "@/components/dashboard/sections/editor-section";
import { LandingsSection } from "@/components/dashboard/sections/landings-section";
import { SettingsSection } from "@/components/dashboard/sections/settings-section";

export function DashboardShell({
  initialLanding,
  initialView,
}: {
  initialLanding: Landing;
  initialView: DashboardView;
}) {
  const activeView = useDashboardStore((state) => state.activeView);
  const setActiveView = useDashboardStore((state) => state.setActiveView);
  const initFromLanding = useDashboardStore((state) => state.initFromLanding);

  useLayoutEffect(() => {
    initFromLanding(initialLanding);
    setActiveView(initialView);
  }, [initialLanding, initFromLanding, initialView, setActiveView]);

  return (
    <div className="flex h-screen overflow-hidden bg-surface-bg text-on-background">
      <aside className="fixed left-0 top-0 z-30 flex h-full w-[200px] flex-col border-r border-outline-variant bg-inverse-surface px-unit-md py-unit-lg">
        <div className="mb-unit-xl px-unit-xs">
          <h1 className="font-headline text-headline-md font-bold text-inverse-on-surface">
            Landora
          </h1>
          <p className="mt-1 font-label text-label-md text-surface-dim">
            CMS Dashboard
          </p>
        </div>
        <nav className="flex flex-1 flex-col gap-unit-xs">
          {dashboardViews.map((item) => {
            const isActive = activeView === item.id;

            return (
              <Link
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left font-label text-label-md transition-colors ${
                  isActive
                    ? "bg-surface-variant text-primary"
                    : "text-surface-dim hover:bg-surface-variant hover:text-on-surface"
                }`}
                href={`/${item.id}`}
                key={item.id}
              >
                <Icon name={item.icon} className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          className="mt-auto flex items-center gap-3 border-t border-outline-variant/30 px-3 py-4 text-left font-label text-label-md text-surface-dim transition-colors hover:text-inverse-on-surface"
          type="button"
        >
          <Icon name="profile" className="h-5 w-5" />
          Profile
        </button>
      </aside>
      <div className="ml-[200px] flex h-screen min-w-0 flex-1 flex-col">
        <main className="flex min-h-0 flex-1 overflow-hidden">
          {activeView === "landings" ? <LandingsSection /> : null}
          {activeView === "editor" ? <EditorSection /> : null}
          {activeView === "assets" ? <AssetsSection /> : null}
          {activeView === "settings" ? <SettingsSection /> : null}
        </main>
      </div>
      <div className="fixed right-4 top-4 z-40 hidden gap-2 md:flex">
        <IconButton icon="bell" label="Notifications" />
        <IconButton icon="help" label="Help" />
      </div>
    </div>
  );
}
