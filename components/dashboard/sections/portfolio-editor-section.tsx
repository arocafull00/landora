"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import { useShallow } from "zustand/react/shallow";
import { EditorLayout } from "@/components/dashboard/editor-layout";
import { NavEditorPanel } from "@/components/dashboard/nav-editor-panel";
import { AdminEditorPanel } from "@/components/dashboard/admin-editor-panel";
import { SeoEditorPanel } from "@/components/dashboard/seo-editor-panel";
import { FooterEditorPanel } from "@/components/dashboard/footer-editor-panel";
import { BlogConfigEditorPanel } from "@/components/dashboard/blog-config-editor-panel";
import { OffersEditorPanel } from "@/components/dashboard/offers-editor-panel";
import { SectionsEditorPanel } from "@/components/dashboard/sections-editor-panel";
import { SectionHeadingFields } from "@/components/dashboard/section-heading-fields";
import { SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { createEmptyWorkHistoryItem } from "@/components/dashboard/create-empty-work-history-item";
import { PortfolioBenefitsEditorPanel } from "@/components/dashboard/portfolio-benefits-editor/portfolio-benefits-editor-panel";
import { PortfolioFaqEditorPanel } from "@/components/dashboard/portfolio-faq-editor/portfolio-faq-editor-panel";
import { PortfolioProjectsEditorPanel } from "@/components/dashboard/portfolio-projects-editor/portfolio-projects-editor-panel";
import { PortfolioServicesEditorPanel } from "@/components/dashboard/portfolio-services-editor/portfolio-services-editor-panel";
import { PortfolioWorkHistoryItemEditor } from "@/components/dashboard/portfolio-work-history-item-editor";
import { ReservasEditorPanel } from "@/components/dashboard/reservas-editor-panel";
import { useDashboardChrome } from "@/components/dashboard/dashboard-chrome-context";
import { HeroEditorPanel } from "@/components/dashboard/hero-editor/hero-editor-panel";

export function PortfolioEditorSection() {
  const { bookingEnabled } = useDashboardChrome();
  const {
    activeEditorTab,
    activeLandingId,
    isAdmin,
    landings,
    updateSection,
    updateSectionItem,
  } = useDashboardStore(
    useShallow((state) => ({
      activeEditorTab: state.activeEditorTab,
      activeLandingId: state.activeLandingId,
      isAdmin: state.isAdmin,
      landings: state.landings,
      updateSection: state.updateSection,
      updateSectionItem: state.updateSectionItem,
    })),
  );

  const activeLanding =
    landings.find((landing) => landing.id === activeLandingId) ?? landings[0];

  if (!activeLanding) return null;

  const workHistory = activeLanding.content.workHistory ?? [];

  return (
    <EditorLayout
      form={
        <>
          {activeEditorTab === "Admin" && isAdmin ? (
            <AdminEditorPanel activeLanding={activeLanding} />
          ) : null}

          {activeEditorTab === "Secciones" ? (
            <SectionsEditorPanel activeLanding={activeLanding} />
          ) : null}

          {activeEditorTab === "SEO" ? (
            <SeoEditorPanel activeLanding={activeLanding} />
          ) : null}

          {activeEditorTab === "Navegación" ? (
            <NavEditorPanel activeLanding={activeLanding} />
          ) : null}

          {activeEditorTab === "Hero" ? (
            <HeroEditorPanel landing={activeLanding} />
          ) : null}

          {activeEditorTab === "Proyectos" ? (
            <PortfolioProjectsEditorPanel landing={activeLanding} />
          ) : null}

          {activeEditorTab === "Experiencia" ? (
            <section className="space-y-5 py-unit-lg">
              <SectionTitle
                title="Experiencia laboral"
                description="Edita tu historial profesional."
              />
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor="experiencia"
                fallback={SECTION_HEADING_DEFAULTS.portfolio.experiencia}
              />
              <div className="space-y-6">
                {workHistory.map((item, index) => (
                  <PortfolioWorkHistoryItemEditor
                    index={index}
                    item={item}
                    key={item.id}
                    onChange={(patch) =>
                      updateSectionItem(activeLanding.id, "workHistory", item.id, patch)
                    }
                    onRemove={() =>
                      updateSection(
                        activeLanding.id,
                        "workHistory",
                        workHistory.filter((entry) => entry.id !== item.id),
                      )
                    }
                  />
                ))}
              </div>
              <button
                className="w-full rounded-lg border border-dashed border-outline-variant px-4 py-3 font-label text-label-md text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
                onClick={() =>
                  updateSection(activeLanding.id, "workHistory", [
                    ...workHistory,
                    createEmptyWorkHistoryItem(),
                  ])
                }
                type="button"
              >
                Añadir experiencia
              </button>
            </section>
          ) : null}

          {activeEditorTab === "Cómo trabajo" ? (
            <PortfolioBenefitsEditorPanel landing={activeLanding} />
          ) : null}

          {activeEditorTab === "Servicios" ? (
            <PortfolioServicesEditorPanel landing={activeLanding} />
          ) : null}

          {activeEditorTab === "FAQ" ? (
            <PortfolioFaqEditorPanel landing={activeLanding} />
          ) : null}

          {activeEditorTab === "Ofertas" ? (
            <OffersEditorPanel activeLanding={activeLanding} />
          ) : null}

          {activeEditorTab === "Reservas" ? (
            <ReservasEditorPanel
              activeLanding={activeLanding}
              bookingEnabled={bookingEnabled}
            />
          ) : null}

          {activeEditorTab === "Blog" ? (
            <BlogConfigEditorPanel activeLanding={activeLanding} />
          ) : null}

          {activeEditorTab === "Footer" ? (
            <FooterEditorPanel activeLanding={activeLanding} />
          ) : null}
        </>
      }
    />
  );
}

function SectionTitle({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h3 className="text-body-lg font-semibold text-on-surface">{title}</h3>
      <p className="mt-1 text-body-sm text-on-surface-variant">{description}</p>
    </div>
  );
}
