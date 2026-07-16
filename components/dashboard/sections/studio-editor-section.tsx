"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import { ImageField } from "@/components/dashboard/image-field";
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

export function StudioEditorSection() {
  const { bookingEnabled } = useDashboardChrome();
  const {
    activeEditorTab,
    activeLandingId,
    isAdmin,
    landings,
    updateSection,
    updateSectionItem,
    updateStat,
  } = useDashboardStore();

  const activeLanding =
    landings.find((landing) => landing.id === activeLandingId) ?? landings[0];

  if (!activeLanding) return null;

  const team = activeLanding.content.team ?? [];
  const serviceMenu = activeLanding.content.serviceMenu ?? [];
  const faq = activeLanding.content.faq ?? [];

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

          {activeEditorTab === "Historia" ? (
            <section className="space-y-5 py-unit-lg">
              <EditorSectionTitle
                title="Historia"
                description="Narrativa y métricas de la sección Nosotros."
              />
              <EditorTextArea
                label="Texto principal"
                onChange={(value) =>
                  updateSection(activeLanding.id, "about", {
                    ...activeLanding.content.about,
                    statement: value,
                  })
                }
                rows={5}
                value={
                  activeLanding.content.about?.statement ??
                  activeLanding.content.story?.statement ??
                  ""
                }
              />
              {activeLanding.content.stats.length > 0 ? (
                <div>
                  <p className="mb-3 font-label text-label-md text-on-surface-variant">
                    Métricas
                  </p>
                  <div className="grid gap-4 md:grid-cols-3">
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
                </div>
              ) : null}
            </section>
          ) : null}

          {activeEditorTab === "Hero" ? (
            <HeroEditorPanel landing={activeLanding} />
          ) : null}

          {activeEditorTab === "Servicios" ? (
            <section className="space-y-5 py-unit-lg">
              <EditorSectionTitle title="Servicios" description="Carta de servicios con precios y duraciones." />
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor="servicios"
                fallback={SECTION_HEADING_DEFAULTS.studio.servicios}
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
                Añadir servicio
              </button>
            </section>
          ) : null}

          {activeEditorTab === "Equipo" ? (
            <section className="space-y-5 py-unit-lg">
              <EditorSectionTitle title="Equipo" description="Miembros del equipo." />
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor="equipo"
                fallback={SECTION_HEADING_DEFAULTS.studio.equipo}
              />
              <div className="space-y-6">
                {team.map((member) => (
                  <div
                    className="space-y-3 border-b border-outline-variant pb-6 last:border-0 last:pb-0"
                    key={member.id}
                  >
                    <EditorTextField
                      label="Nombre"
                      onChange={(value) =>
                        updateSectionItem(activeLanding.id, "team", member.id, { name: value })
                      }
                      value={member.name}
                    />
                    <EditorTextField
                      label="Rol"
                      onChange={(value) =>
                        updateSectionItem(activeLanding.id, "team", member.id, { role: value })
                      }
                      value={member.role}
                    />
                    <EditorTextArea
                      label="Bio"
                      onChange={(value) =>
                        updateSectionItem(activeLanding.id, "team", member.id, { bio: value })
                      }
                      value={member.bio}
                    />
                    <ImageField
                      label="Foto"
                      onChange={(value) =>
                        updateSectionItem(activeLanding.id, "team", member.id, { image: value })
                      }
                      templateId={activeLanding.template}
                      value={member.image}
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeEditorTab === "Galeria" ? (
            <section className="space-y-5 py-unit-lg">
              <EditorSectionTitle title="Galería" description="Imágenes de la galería." />
              <div className="space-y-6">
                {(activeLanding.content.gallery ?? []).map((item, index) => (
                  <div
                    className="space-y-3 border-b border-outline-variant pb-6 last:border-0 last:pb-0"
                    key={item.id}
                  >
                    <p className="font-label text-label-md text-on-surface-variant">
                      Imagen {index + 1}
                    </p>
                    <ImageField
                      label="Imagen"
                      onChange={(value) =>
                        updateSectionItem(activeLanding.id, "gallery", item.id, { image: value })
                      }
                      templateId={activeLanding.template}
                      value={item.image ?? ""}
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeEditorTab === "FAQ" ? (
            <section className="space-y-5 py-unit-lg">
              <EditorSectionTitle title="Preguntas frecuentes" description="Dudas habituales de los clientes." />
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor="faq"
                fallback={SECTION_HEADING_DEFAULTS.studio.faq}
              />
              <div className="space-y-6">
                {faq.map((item) => (
                  <div
                    className="space-y-3 border-b border-outline-variant pb-6 last:border-0 last:pb-0"
                    key={item.id}
                  >
                    <EditorTextField
                      label="Pregunta"
                      onChange={(value) =>
                        updateSectionItem(activeLanding.id, "faq", item.id, { question: value })
                      }
                      value={item.question}
                    />
                    <EditorTextArea
                      label="Respuesta"
                      onChange={(value) =>
                        updateSectionItem(activeLanding.id, "faq", item.id, { answer: value })
                      }
                      rows={4}
                      value={item.answer}
                    />
                  </div>
                ))}
              </div>
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
