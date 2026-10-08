"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import { useShallow } from "zustand/react/shallow";
import { TemplateEditor } from "@/components/dashboard/editor/components/template-editor";
import { EditorLayout } from "@/components/dashboard/editor-layout";
import { PortfolioAboutPageEditor } from "@/components/dashboard/portfolio-about-page-editor";
import { PortfolioProjectPageEditor } from "@/components/dashboard/portfolio-project-page-editor";
import { CatalogPageEditor } from "@/components/dashboard/editor/components/catalog-page-editor";

export function EditorSection() {
  const { activeLandingId, activePageTarget, landings } = useDashboardStore(
    useShallow((state) => ({
      activeLandingId: state.activeLandingId,
      activePageTarget: state.activePageTarget,
      landings: state.landings,
    })),
  );

  const activeLanding =
    landings.find((landing) => landing.id === activeLandingId) ?? landings[0];

  if (!activeLanding) {
    return null;
  }

  if (activePageTarget.type === "catalog" || activePageTarget.type === "product") {
    return <EditorLayout form={<CatalogPageEditor />} />;
  }

  if (
    activeLanding.template === "portfolio" &&
    activePageTarget.type === "about"
  ) {
    return (
      <EditorLayout
        form={
          <PortfolioAboutPageEditor
            key={activeLanding.id}
            landing={activeLanding}
          />
        }
      />
    );
  }

  if (
    activeLanding.template === "portfolio" &&
    activePageTarget.type === "project"
  ) {
    const project = activeLanding.content.gallery?.find(
      (item) => item.id === activePageTarget.projectId,
    );

    if (project) {
      return (
        <EditorLayout
          form={
            <PortfolioProjectPageEditor
              key={project.id}
              landing={activeLanding}
              project={project}
            />
          }
        />
      );
    }
  }

  return <TemplateEditor template={activeLanding.template} landingId={activeLanding.id} />;
}
