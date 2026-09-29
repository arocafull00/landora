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
import { createEmptyGalleryItem } from "@/components/dashboard/create-empty-gallery-item";
import { StudioServiceMenuItemEditor } from "@/components/dashboard/studio-service-menu-item-editor";
import { SignalCaseItemEditor } from "@/components/dashboard/signal-case-item-editor";
import { SignalProfileFields } from "@/components/dashboard/signal-profile-fields";
import { SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { ReservasEditorPanel } from "@/components/dashboard/reservas-editor-panel";
import { useDashboardChrome } from "@/components/dashboard/dashboard-chrome-context";
import { EditorSectionTitle } from "@/components/dashboard/editor-section-title";
import { EditorTextField } from "@/components/dashboard/editor-text-field";
import { EditorTextArea } from "@/components/dashboard/editor-text-area";
import { HeroEditorPanel } from "@/components/dashboard/hero-editor/hero-editor-panel";
import { getSignalCaseContent } from "@/components/templates/signal/signal-case-content";

export function SignalEditorSection() {
  const { bookingEnabled } = useDashboardChrome();
  const {
    activeEditorTab,
    activeLandingId,
    isAdmin,
    landings,
    updateSection,
    updateSectionItem,
    updateSectionHeading,
  } = useDashboardStore(
    useShallow((state) => ({
      activeEditorTab: state.activeEditorTab,
      activeLandingId: state.activeLandingId,
      isAdmin: state.isAdmin,
      landings: state.landings,
      updateSection: state.updateSection,
      updateSectionItem: state.updateSectionItem,
      updateSectionHeading: state.updateSectionHeading,
    })),
  );

  const activeLanding =
    landings.find((landing) => landing.id === activeLandingId) ?? landings[0];

  if (!activeLanding) return null;

  const serviceMenu = activeLanding.content.serviceMenu ?? [];
  const { cases: gallery, heading: casesHeading } = getSignalCaseContent(activeLanding.content);
  const casesLanding = {
    ...activeLanding,
    content: {
      ...activeLanding.content,
      sectionHeadings: {
        ...activeLanding.content.sectionHeadings,
        capacidades: casesHeading,
      },
    },
  };
  const profile = activeLanding.content.team?.[0];
  const benefits = activeLanding.content.benefits ?? [];
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

          {activeEditorTab === "Capacidades" ? (
            <section className="space-y-5 py-unit-lg">
              <EditorSectionTitle
                title="Casos"
                description="Proyectos reales mostrados en tarjetas de casos de éxito."
              />
              <SectionHeadingFields
                activeLanding={casesLanding}
                anchor="capacidades"
                fallback={SECTION_HEADING_DEFAULTS.signal.capacidades}
              />
              <div className="space-y-6">
                {gallery.map((item, index) => (
                  <SignalCaseItemEditor
                    index={index}
                    item={item}
                    key={item.id}
                    onChange={(patch) => updateSection(activeLanding.id, "gallery", gallery.map((entry) => entry.id === item.id ? { ...entry, ...patch } : entry))}
                    onRemove={() =>
                      updateSection(
                        activeLanding.id,
                        "gallery",
                        gallery.filter((entry) => entry.id !== item.id),
                      )
                    }
                  />
                ))}
              </div>
              <button
                className="w-full rounded-lg border border-dashed border-outline-variant px-4 py-3 font-label text-label-md text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
                onClick={() =>
                  updateSection(activeLanding.id, "gallery", [
                    ...gallery,
                    createEmptyGalleryItem(),
                  ])
                }
                type="button"
              >
                Añadir caso
              </button>
            </section>
          ) : null}

          {activeEditorTab === "Índice" ? (
            <section className="space-y-5 py-unit-lg">
              <EditorSectionTitle
                title="Método y posibilidades"
                description="Pasos de trabajo y soluciones posibles."
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
              <div className="space-y-6 border-t border-outline-variant pt-6">
                <p className="font-label text-label-md text-on-surface-variant">Posibilidades</p>
                {serviceMenu.map((item, index) => (
                  <StudioServiceMenuItemEditor
                    index={index}
                    item={item}
                    key={item.id}
                    onChange={(patch) => updateSectionItem(activeLanding.id, "serviceMenu", item.id, patch)}
                    onRemove={() => updateSection(activeLanding.id, "serviceMenu", serviceMenu.filter((entry) => entry.id !== item.id))}
                  />
                ))}
                <button
                  className="w-full rounded-lg border border-dashed border-outline-variant px-4 py-3 font-label text-label-md text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
                  onClick={() => updateSection(activeLanding.id, "serviceMenu", [...serviceMenu, createEmptyServiceMenuItem()])}
                  type="button"
                >
                  Añadir posibilidad
                </button>
              </div>
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
              {profile ? (
                <SignalProfileFields
                  profile={profile}
                  onChange={(patch) => updateSectionItem(activeLanding.id, "team", profile.id, patch)}
                />
              ) : null}
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
