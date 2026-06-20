"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import { StudioEditorSection } from "@/components/dashboard/sections/studio-editor-section";
import { PortfolioEditorSection } from "@/components/dashboard/sections/portfolio-editor-section";
import { RistoranteEditorSection } from "@/components/dashboard/sections/ristorante-editor-section";
import { FloristeriaEditorSection } from "@/components/dashboard/sections/floristeria-editor-section";
import { OficioProEditorSection } from "@/components/dashboard/sections/oficio-pro-editor-section";
import { CoffeeShopEditorSection } from "@/components/dashboard/sections/coffee-shop-editor-section";
import { VelarEditorSection } from "@/components/dashboard/sections/velar-editor-section";

export function EditorSection() {
  const { activeLandingId, landings } = useDashboardStore();

  const activeLanding =
    landings.find((landing) => landing.id === activeLandingId) ?? landings[0];

  if (!activeLanding) {
    return null;
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
