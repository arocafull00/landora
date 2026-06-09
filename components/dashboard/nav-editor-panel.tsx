"use client";

import type { Landing } from "@/lib/dashboard-data";
import { NavBrandEditor } from "@/components/dashboard/nav-brand-editor";
import { NavLabelsEditor } from "@/components/dashboard/nav-labels-editor";

type NavEditorPanelProps = {
  activeLanding: Landing;
};

export function NavEditorPanel({ activeLanding }: NavEditorPanelProps) {
  return (
    <section className="space-y-5 py-unit-lg">
      <NavBrandEditor activeLanding={activeLanding} />
      <NavLabelsEditor activeLanding={activeLanding} />
    </section>
  );
}
