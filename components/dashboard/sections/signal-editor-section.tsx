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
import { createEmptyServiceMenuItem } from "@/components/dashboard/create-empty-service-menu-item";
import { StudioServiceMenuItemEditor } from "@/components/dashboard/studio-service-menu-item-editor";
import { SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { ReservasEditorPanel } from "@/components/dashboard/reservas-editor-panel";
import { useDashboardChrome } from "@/components/dashboard/dashboard-chrome-context";
import { EditorSectionTitle } from "@/components/dashboard/editor-section-title";
import { EditorTextField } from "@/components/dashboard/editor-text-field";
import { EditorTextArea } from "@/components/dashboard/editor-text-area";
import { HeroEditorPanel } from "@/components/dashboard/hero-editor/hero-editor-panel";

export function SignalEditorSection() {
  const { bookingEnabled } = useDashboardChrome();
  const {
    activeEditorTab,
    activeLandingId,
    isAdmin,
    landings,
    updateSection,
    updateSectionItem,
    updateStat,
    updateSectionHeading,
    updateStory,
  } = useDashboardStore(
    useShallow((state) => ({
      activeEditorTab: state.activeEditorTab,
      activeLandingId: state.activeLandingId,
      isAdmin: state.isAdmin,
      landings: state.landings,
      updateSection: state.updateSection,
      updateSectionItem: state.updateSectionItem,
      updateStat: state.updateStat,
      updateSectionHeading: state.updateSectionHeading,
      updateStory: state.updateStory,
    })),
  );

  const activeLanding =
    landings.find((landing) => landing.id === activeLandingId) ?? landings[0];

  if (!activeLanding) return null;

  const serviceMenu = activeLanding.content.serviceMenu ?? [];
  const benefits = activeLanding.content.benefits ?? [];
  const climax = activeLanding.content.sectionHeadings?.climax ??
    SECTION_HEADING_DEFAULTS.signal.climax;
  const ctaHeading = activeLanding.content.sectionHeadings?.cta ??
    SECTION_HEADING_DEFAULTS.signal.cta;

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

          {activeEditorTab === "Portal" ? (
            <section className="space-y-5 py-unit-lg">
              <EditorSectionTitle
                title="Portal"
                description="Líneas tipográficas del manifiesto. Una línea por renglón."
              />
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor="portal"
                fallback={SECTION_HEADING_DEFAULTS.signal.portal}
              />
              <EditorTextArea
                label="Manifiesto"
                onChange={(value) =>
                  updateStory(activeLanding.id, { statement: value })
                }
                rows={6}
                value={
                  activeLanding.content.about?.statement ??
                  activeLanding.content.story?.statement ??
                  ""
                }
              />
            </section>
          ) : null}

          {activeEditorTab === "Escala" ? (
            <section className="space-y-5 py-unit-lg">
              <EditorSectionTitle
                title="Escala"
                description="Números que estructuran la escena de impacto."
              />
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor="escala"
                fallback={SECTION_HEADING_DEFAULTS.signal.escala}
              />
              <div className="grid gap-4 md:grid-cols-2">
                {activeLanding.content.stats.map((stat) => (
                  <div className="space-y-3" key={stat.id}>
                    <EditorTextField
                      label="Valor"
                      onChange={(value) =>
                        updateStat(activeLanding.id, stat.id, { value })
                      }
                      value={stat.value}
                    />
                    <EditorTextField
                      label="Etiqueta"
                      onChange={(value) =>
                        updateStat(activeLanding.id, stat.id, { label: value })
                      }
                      value={stat.label}
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeEditorTab === "Capacidades" ? (
            <section className="space-y-5 py-unit-lg">
              <EditorSectionTitle
                title="Capacidades"
                description="Tres transformaciones tipográficas a pantalla completa."
              />
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor="capacidades"
                fallback={SECTION_HEADING_DEFAULTS.signal.capacidades}
              />
              <div className="space-y-6">
                {serviceMenu.map((item, index) => (
                  <StudioServiceMenuItemEditor
                    index={index}
                    item={item}
                    key={item.id}
                    onChange={(patch) =>
                      updateSectionItem(activeLanding.id, "serviceMenu", item.id, patch)
                    }
                    onRemove={() =>
                      updateSection(
                        activeLanding.id,
                        "serviceMenu",
                        serviceMenu.filter((entry) => entry.id !== item.id),
                      )
                    }
                  />
                ))}
              </div>
              <button
                className="w-full rounded-lg border border-dashed border-outline-variant px-4 py-3 font-label text-label-md text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
                onClick={() =>
                  updateSection(activeLanding.id, "serviceMenu", [
                    ...serviceMenu,
                    createEmptyServiceMenuItem(),
                  ])
                }
                type="button"
              >
                Añadir capacidad
              </button>
            </section>
          ) : null}

          {activeEditorTab === "Índice" ? (
            <section className="space-y-5 py-unit-lg">
              <EditorSectionTitle
                title="Índice"
                description="Filas de especificación alineadas con la marca."
              />
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor="indice"
                fallback={SECTION_HEADING_DEFAULTS.signal.indice}
              />
              <div className="space-y-6">
                {benefits.map((item) => (
                  <div
                    className="space-y-3 border-b border-outline-variant pb-6 last:border-0 last:pb-0"
                    key={item.id}
                  >
                    <EditorTextField
                      label="Etiqueta"
                      onChange={(value) =>
                        updateSectionItem(activeLanding.id, "benefits", item.id, {
                          title: value,
                        })
                      }
                      value={item.title}
                    />
                    <EditorTextField
                      label="Valor"
                      onChange={(value) =>
                        updateSectionItem(activeLanding.id, "benefits", item.id, {
                          description: value,
                        })
                      }
                      value={item.description}
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeEditorTab === "Clímax" ? (
            <section className="space-y-5 py-unit-lg">
              <EditorSectionTitle
                title="Clímax"
                description="Declaración a color señal que cierra el relato."
              />
              <EditorTextField
                label="Línea 1"
                onChange={(value) =>
                  updateSectionHeading(activeLanding.id, "climax", { title: value })
                }
                value={climax.title}
              />
              <EditorTextField
                label="Línea 2"
                onChange={(value) =>
                  updateSectionHeading(activeLanding.id, "climax", {
                    subtitle: value,
                  })
                }
                value={climax.subtitle}
              />
            </section>
          ) : null}

          {activeEditorTab === "CTA" ? (
            <section className="space-y-5 py-unit-lg">
              <EditorSectionTitle
                title="CTA"
                description="Cierre y llamada a la acción."
              />
              <EditorTextField
                label="Título"
                onChange={(value) =>
                  updateSectionHeading(activeLanding.id, "cta", { title: value })
                }
                value={ctaHeading.title}
              />
              <EditorTextArea
                label="Subtítulo"
                onChange={(value) =>
                  updateSectionHeading(activeLanding.id, "cta", {
                    subtitle: value,
                  })
                }
                rows={3}
                value={ctaHeading.subtitle}
              />
            </section>
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
