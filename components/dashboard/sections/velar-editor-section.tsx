"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import { ImageField } from "@/components/dashboard/image-field";
import { BACKGROUND_IMAGE_OPTIONS } from "@/lib/background-assets";
import { EditorLayout } from "@/components/dashboard/editor-layout";
import { NavEditorPanel } from "@/components/dashboard/nav-editor-panel";
import { AdminEditorPanel } from "@/components/dashboard/admin-editor-panel";
import { SectionsEditorPanel } from "@/components/dashboard/sections-editor-panel";
import { FooterEditorPanel } from "@/components/dashboard/footer-editor-panel";
import { BlogConfigEditorPanel } from "@/components/dashboard/blog-config-editor-panel";
import { VelarContactEditorPanel } from "@/components/dashboard/velar-contact-editor-panel";
import { OffersEditorPanel } from "@/components/dashboard/offers-editor-panel";
import { SectionHeadingFields } from "@/components/dashboard/section-heading-fields";
import { SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { getEditorScrollTarget } from "@/lib/template-sections";
import { ReservasEditorPanel } from "@/components/dashboard/reservas-editor-panel";
import { useDashboardChrome } from "@/components/dashboard/dashboard-chrome-context";
import { EditorSectionTitle } from "@/components/dashboard/editor-section-title";
import { EditorTextField } from "@/components/dashboard/editor-text-field";
import { EditorTextArea } from "@/components/dashboard/editor-text-area";

export function VelarEditorSection() {
  const { bookingEnabled } = useDashboardChrome();
  const {
    activeEditorTab,
    activeLandingId,
    isAdmin,
    landings,
    updateHero,
    updateSection,
    updateSectionItem,
    updateService,
    updateSpace,
    updateStat,
    updateStory,
    updateTestimonial,
    updateWorkflowStep,
  } = useDashboardStore();

  const activeLanding =
    landings.find((landing) => landing.id === activeLandingId) ?? landings[0];

  if (!activeLanding) return null;

  const scrollTarget = getEditorScrollTarget(activeLanding.template, activeEditorTab);

  return (
    <EditorLayout
      scrollTarget={scrollTarget}
      form={
        <>
          {activeEditorTab === "Admin" && isAdmin ? (
            <AdminEditorPanel activeLanding={activeLanding} />
          ) : null}

          {activeEditorTab === "Secciones" ? (
            <SectionsEditorPanel activeLanding={activeLanding} />
          ) : null}

          {activeEditorTab === "Navegación" ? (
            <NavEditorPanel activeLanding={activeLanding} />
          ) : null}

          {activeEditorTab === "Hero" ? (
            <section className="space-y-5 py-unit-lg">
              <EditorSectionTitle
                description="El bloque principal de la landing."
                title="Portada"
              />
              <EditorTextField
                editorId="hero:eyebrow"
                label="Subtítulo superior"
                onChange={(value) => updateHero(activeLanding.id, { eyebrow: value })}
                value={activeLanding.content.hero.eyebrow}
              />
              <div id="tutorial-hero-title">
                <EditorTextField
                  editorId="hero:title"
                  label="Título"
                  onChange={(value) => updateHero(activeLanding.id, { title: value })}
                  value={activeLanding.content.hero.title}
                />
              </div>
              <EditorTextArea
                editorId="hero:subtitle"
                label="Subtítulo"
                onChange={(value) => updateHero(activeLanding.id, { subtitle: value })}
                value={activeLanding.content.hero.subtitle}
              />
              <ImageField
                label="Imagen de portada"
                onChange={(value) => updateHero(activeLanding.id, { image: value })}
                presets={BACKGROUND_IMAGE_OPTIONS}
                templateId={activeLanding.template}
                value={activeLanding.content.hero.image}
              />
            </section>
          ) : null}

          {activeEditorTab === "Historia" ? (
            <section className="space-y-5 py-unit-lg">
              <EditorSectionTitle
                description="Narrativa y métricas de la sección Nosotros."
                title="Historia"
              />
              <EditorTextArea
                editorId="story:statement"
                label="Texto principal"
                onChange={(value) =>
                  updateStory(activeLanding.id, { statement: value })
                }
                rows={5}
                value={activeLanding.content.story?.statement ?? ""}
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
                          editorId={`story:stat:${stat.id}:value`}
                          label="Valor"
                          onChange={(value) =>
                            updateStat(activeLanding.id, stat.id, { value })
                          }
                          value={stat.value}
                        />
                        <EditorTextField
                          editorId={`story:stat:${stat.id}:label`}
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

          {activeEditorTab === "Galería" ? (
            <section className="space-y-5 py-unit-lg">
              <EditorSectionTitle
                description="Las imágenes de la galería."
                title="Galería"
              />
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
                        updateSectionItem(activeLanding.id, "gallery", item.id, {
                          image: value,
                        })
                      }
                      templateId={activeLanding.template}
                      value={item.image ?? ""}
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeEditorTab === "Espacios" ? (
            <section className="space-y-5 py-unit-lg">
              <EditorSectionTitle
                description="Los espacios mostrados en la landing."
                title="Espacios"
              />
              <EditorTextField
                label="Enlace a Google Maps"
                onChange={(value) => updateSection(activeLanding.id, "mapsUrl", value)}
                value={activeLanding.content.mapsUrl ?? ""}
              />
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor="residences"
                fallback={SECTION_HEADING_DEFAULTS.velar.residences}
              />
              <div className="space-y-6">
                {(activeLanding.content.spaces ?? []).map((space) => (
                  <div
                    className="space-y-3 border-b border-outline-variant pb-6 last:border-0 last:pb-0"
                    key={space.id}
                  >
                    <EditorTextField
                      editorId={`residences:space:${space.id}:name`}
                      label="Nombre"
                      onChange={(value) =>
                        updateSpace(activeLanding.id, space.id, { name: value })
                      }
                      value={space.name}
                    />
                    <EditorTextArea
                      editorId={`residences:space:${space.id}:description`}
                      label="Descripción"
                      onChange={(value) =>
                        updateSpace(activeLanding.id, space.id, {
                          description: value,
                        })
                      }
                      value={space.description}
                    />
                    <ImageField
                      label="Imagen"
                      onChange={(value) =>
                        updateSpace(activeLanding.id, space.id, { image: value })
                      }
                      templateId={activeLanding.template}
                      value={space.image}
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeEditorTab === "Servicios" ? (
            <section className="space-y-5 py-unit-lg">
              <EditorSectionTitle
                description="Servicios y mensajes operativos."
                title="Servicios"
              />
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor="servicios"
                fallback={SECTION_HEADING_DEFAULTS.velar.servicios}
              />
              <div className="space-y-6">
                {(activeLanding.content.services ?? []).map((service) => (
                  <div
                    className="space-y-3 border-b border-outline-variant pb-6 last:border-0 last:pb-0"
                    key={service.id}
                  >
                    <EditorTextField
                      editorId={`servicios:service:${service.id}:title`}
                      label="Título"
                      onChange={(value) =>
                        updateService(activeLanding.id, service.id, {
                          title: value,
                        })
                      }
                      value={service.title}
                    />
                    <EditorTextField
                      editorId={`servicios:service:${service.id}:subtitle`}
                      label="Subtítulo"
                      onChange={(value) =>
                        updateService(activeLanding.id, service.id, {
                          subtitle: value,
                        })
                      }
                      value={service.subtitle}
                    />
                    <EditorTextField
                      editorId={`servicios:service:${service.id}:label`}
                      label="Etiqueta"
                      onChange={(value) =>
                        updateService(activeLanding.id, service.id, {
                          label: value,
                        })
                      }
                      value={service.label}
                    />
                    <ImageField
                      label="Imagen"
                      onChange={(value) =>
                        updateService(activeLanding.id, service.id, {
                          image: value,
                        })
                      }
                      templateId={activeLanding.template}
                      value={service.image}
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeEditorTab === "Proceso" ? (
            <section className="space-y-5 py-unit-lg">
              <EditorSectionTitle
                description="Los pasos del proceso mostrados en la landing."
                title="Proceso"
              />
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor="proceso"
                fallback={SECTION_HEADING_DEFAULTS.velar.proceso}
              />
              <div className="space-y-4">
                {(activeLanding.content.workflow ?? []).map((step) => (
                  <div
                    className="space-y-3 border-b border-outline-variant pb-4 last:border-0 last:pb-0"
                    key={step.id}
                  >
                    <div className="space-y-3">
                      <EditorTextField
                        editorId={`proceso:step:${step.id}:title`}
                        label="Título del paso"
                        onChange={(value) =>
                          updateWorkflowStep(activeLanding.id, step.id, {
                            title: value,
                          })
                        }
                        value={step.title}
                      />
                      <EditorTextArea
                        editorId={`proceso:step:${step.id}:description`}
                        label="Descripción del paso"
                        onChange={(value) =>
                          updateWorkflowStep(activeLanding.id, step.id, {
                            description: value,
                          })
                        }
                        value={step.description}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeEditorTab === "Testimonios" ? (
            <section className="space-y-5 py-unit-lg">
              <EditorSectionTitle
                description="Las reseñas mostradas en la landing."
                title="Testimonios"
              />
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor="testimonios"
                fallback={SECTION_HEADING_DEFAULTS.velar.testimonios}
              />
              <div className="space-y-6">
                {activeLanding.content.testimonials.map((item) => (
                  <div
                    className="space-y-3 border-b border-outline-variant pb-6 last:border-0 last:pb-0"
                    key={item.id}
                  >
                    <EditorTextField
                      editorId={`testimonios:${item.id}:author`}
                      label="Autor de la reseña"
                      onChange={(value) =>
                        updateTestimonial(activeLanding.id, item.id, {
                          author: value,
                        })
                      }
                      value={item.author}
                    />
                    <EditorTextArea
                      editorId={`testimonios:${item.id}:comment`}
                      label="Reseña"
                      onChange={(value) =>
                        updateTestimonial(activeLanding.id, item.id, {
                          comment: value,
                        })
                      }
                      rows={4}
                      value={item.comment}
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeEditorTab === "Contacto" ? (
            <VelarContactEditorPanel activeLanding={activeLanding} />
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
