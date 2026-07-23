"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import { useShallow } from "zustand/react/shallow";
import { StudioEditorSection } from "@/components/dashboard/sections/studio-editor-section";
import { PortfolioEditorSection } from "@/components/dashboard/sections/portfolio-editor-section";
import { RistoranteEditorSection } from "@/components/dashboard/sections/ristorante-editor-section";
import { FloristeriaEditorSection } from "@/components/dashboard/sections/floristeria-editor-section";
import { OficioProEditorSection } from "@/components/dashboard/sections/oficio-pro-editor-section";
import { CoffeeShopEditorSection } from "@/components/dashboard/sections/coffee-shop-editor-section";
import { VelarEditorSection } from "@/components/dashboard/sections/velar-editor-section";
import { EditorLayout } from "@/components/dashboard/editor-layout";
import { PortfolioAboutPageEditor } from "@/components/dashboard/portfolio-about-page-editor";
import { PortfolioProjectPageEditor } from "@/components/dashboard/portfolio-project-page-editor";

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

  if (activeLanding.template === "studio") {
    return <StudioEditorSection />;
  }

  if (activeLanding.template === "portfolio") {
    return <PortfolioEditorSection />;
  }

  if (activeLanding.template === "ristorante") {
    return <RistoranteEditorSection />;
  }

  if (activeLanding.template === "floristeria") {
    return <FloristeriaEditorSection />;
  }

  if (activeLanding.template === "oficio-pro") {
    return <OficioProEditorSection />;
  }

  if (activeLanding.template === "coffee-shop") {
    return <CoffeeShopEditorSection />;
  }

  return <VelarEditorSection />;
}
