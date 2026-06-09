"use client";

import type { Landing } from "@/lib/dashboard-data";
import { NavLabelsEditor } from "@/components/dashboard/nav-labels-editor";

type NavEditorPanelProps = {
  activeLanding: Landing;
};

export function NavEditorPanel({ activeLanding }: NavEditorPanelProps) {
  return (
    <section className="py-unit-lg">
      <NavLabelsEditor activeLanding={activeLanding} />
    </section>
  );
}
