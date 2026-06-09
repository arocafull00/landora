"use client";

import type { Landing } from "@/lib/dashboard-data";
import { SectionVisibilityEditor } from "@/components/dashboard/section-visibility-editor";

type SectionsEditorPanelProps = {
  activeLanding: Landing;
};

export function SectionsEditorPanel({ activeLanding }: SectionsEditorPanelProps) {
  return (
    <section className="py-unit-lg">
      <SectionVisibilityEditor activeLanding={activeLanding} />
    </section>
  );
}
