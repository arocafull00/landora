"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import { ImageField } from "@/components/dashboard/image-field";
import { BACKGROUND_IMAGE_OPTIONS } from "@/lib/background-assets";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudioEditorSection } from "@/components/dashboard/sections/studio-editor-section";
import { PortfolioEditorSection } from "@/components/dashboard/sections/portfolio-editor-section";
import { RistoranteEditorSection } from "@/components/dashboard/sections/ristorante-editor-section";
import { FloristeriaEditorSection } from "@/components/dashboard/sections/floristeria-editor-section";
import { EditorLayout } from "@/components/dashboard/editor-layout";
import { NavEditorPanel } from "@/components/dashboard/nav-editor-panel";
import { AdminEditorPanel } from "@/components/dashboard/admin-editor-panel";
import { SectionsEditorPanel } from "@/components/dashboard/sections-editor-panel";
import { SectionHeadingFields } from "@/components/dashboard/section-heading-fields";
import { SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { getEditorScrollTarget, getVisibleEditorTabs } from "@/lib/template-sections";

export function EditorSection() {
  const {
    activeEditorTab,
    activeLandingId,
    isAdmin,
    landings,
    publishLanding,
    saveLanding,
    setActiveEditorTab,
    setActiveLandingId,
    updateHero,
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

  const saveActive = () => saveLanding(activeLanding.id);
  const publishActive = () => publishLanding(activeLanding.id);

  const tabs = getVisibleEditorTabs(
    activeLanding.template,
    activeLanding.content.hiddenSections,
    isAdmin,
  );
  const scrollTarget = getEditorScrollTarget(activeLanding.template, activeEditorTab);

  return (
    <EditorLayout
      activeLanding={activeLanding}
      landings={landings}
      onPublish={publishActive}
      onSave={saveActive}
      onSelectLanding={setActiveLandingId}
      scrollTarget={scrollTarget}
      showComments
      tabs={
        <div className="border-b border-outline-variant bg-surface-container-lowest">
          <Tabs
            value={activeEditorTab}
            onValueChange={(v) => setActiveEditorTab(v as typeof activeEditorTab)}
          >
            <TabsList className="h-auto gap-0 rounded-none bg-transparent p-0">
              {tabs.map((tab) => (
                <TabsTrigger
                  className="mr-unit-lg rounded-none border-b-2 border-transparent px-0 py-3 font-label text-label-md text-on-surface-variant transition-colors data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
                  key={tab.id}
                  value={tab.id}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      }
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
              <SectionTitle
                description="El bloque principal de la landing."
                title="Portada"
              />
              <TextField
                label="Subtítulo superior"
                onChange={(value) => updateHero(activeLanding.id, { eyebrow: value })}
                value={activeLanding.content.hero.eyebrow}
              />
              <TextField
                label="Título"
                onChange={(value) => updateHero(activeLanding.id, { title: value })}
                value={activeLanding.content.hero.title}
              />
              <TextArea
                label="Subtítulo"
                onChange={(value) => updateHero(activeLanding.id, { subtitle: value })}
                value={activeLanding.content.hero.subtitle}
              />
              <TextArea
                label="Descripción"
                onChange={(value) =>
                  updateHero(activeLanding.id, { description: value })
                }
                value={activeLanding.content.hero.description}
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
              <SectionTitle
                description="Narrativa y métricas de la sección Nosotros."
                title="Historia"
              />
              <TextArea
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
                        <TextField
                          label="Valor"
                          onChange={(value) =>
                            updateStat(activeLanding.id, stat.id, { value })
                          }
                          value={stat.value}
                        />
                        <TextField
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
              <SectionTitle
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
                      value={item.image ?? ""}
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeEditorTab === "Espacios" ? (
            <section className="space-y-5 py-unit-lg">
              <SectionTitle
                description="Los espacios mostrados en la landing."
                title="Espacios"
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
                    <TextField
                      label="Nombre"
                      onChange={(value) =>
                        updateSpace(activeLanding.id, space.id, { name: value })
                      }
                      value={space.name}
                    />
                    <TextArea
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
                      value={space.image}
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeEditorTab === "Servicios" ? (
            <section className="space-y-5 py-unit-lg">
              <SectionTitle
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
                    <TextField
                      label="Título"
                      onChange={(value) =>
                        updateService(activeLanding.id, service.id, {
                          title: value,
                        })
                      }
                      value={service.title}
                    />
                    <TextField
                      label="Subtítulo"
                      onChange={(value) =>
                        updateService(activeLanding.id, service.id, {
                          subtitle: value,
                        })
                      }
                      value={service.subtitle}
                    />
                    <TextField
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
                      value={service.image}
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeEditorTab === "Proceso" ? (
            <section className="space-y-5 py-unit-lg">
              <SectionTitle
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
                    className="grid gap-3 border-b border-outline-variant pb-4 last:border-0 last:pb-0 md:grid-cols-[60px_1fr]"
                    key={step.id}
                  >
                    <TextField
                      label="Nº"
                      onChange={(value) =>
                        updateWorkflowStep(activeLanding.id, step.id, {
                          number: value,
                        })
                      }
                      value={step.number}
                    />
                    <div className="space-y-3">
                      <TextField
                        label="Título del paso"
                        onChange={(value) =>
                          updateWorkflowStep(activeLanding.id, step.id, {
                            title: value,
                          })
                        }
                        value={step.title}
                      />
                      <TextArea
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
              <SectionTitle
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
                    <TextField
                      label="Autor de la reseña"
                      onChange={(value) =>
                        updateTestimonial(activeLanding.id, item.id, {
                          author: value,
                        })
                      }
                      value={item.author}
                    />
                    <TextArea
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
        </>
      }
    />
  );
}

function SectionTitle({
  description,
  title,
}: {
  description: string;
  title: string;
}) {
  return (
    <div>
      <h3 className="text-body-lg font-semibold text-on-surface">{title}</h3>
      <p className="mt-1 text-body-sm text-on-surface-variant">{description}</p>
    </div>
  );
}

function TextField({
  className = "",
  label,
  onChange,
  value,
}: {
  className?: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block font-label text-label-md text-on-surface-variant">
        {label}
      </span>
      <input
        className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
        onChange={(event) => onChange(event.target.value)}
        type="text"
        value={value}
      />
    </label>
  );
}

function TextArea({
  label,
  onChange,
  rows = 3,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  rows?: number;
  value: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-label text-label-md text-on-surface-variant">
        {label}
      </span>
      <textarea
        className="w-full resize-none rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        value={value}
      />
    </label>
  );
}
