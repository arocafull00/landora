"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import { ImageField } from "@/components/dashboard/image-field";
import { BACKGROUND_IMAGE_OPTIONS } from "@/lib/background-assets";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getVisibleEditorTabs } from "@/lib/template-sections";
import { EditorLayout } from "@/components/dashboard/editor-layout";
import { NavLabelsEditor } from "@/components/dashboard/nav-labels-editor";
import { SectionHeadingFields } from "@/components/dashboard/section-heading-fields";
import { SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

export function PortfolioEditorSection() {
  const {
    activeEditorTab,
    activeLandingId,
    landings,
    saveLanding,
    publishLanding,
    setActiveEditorTab,
    setActiveLandingId,
    updateHero,
    updateLandingMeta,
    updateSectionItem,
  } = useDashboardStore();

  const activeLanding =
    landings.find((landing) => landing.id === activeLandingId) ?? landings[0];

  if (!activeLanding) return null;

  const tabs = getVisibleEditorTabs(
    activeLanding.template,
    activeLanding.content.hiddenSections,
  );

  const saveActive = () => saveLanding(activeLanding.id);
  const publishActive = () => publishLanding(activeLanding.id);

  const serviceMenu = activeLanding.content.serviceMenu ?? [];
  const workHistory = activeLanding.content.workHistory ?? [];
  const faq = activeLanding.content.faq ?? [];

  return (
    <EditorLayout
      activeLanding={activeLanding}
      landings={landings}
      onPublish={publishActive}
      onSave={saveActive}
      onSelectLanding={setActiveLandingId}
      tabs={
        <div className="border-b border-outline-variant bg-surface-container-lowest px-unit-lg">
          <Tabs value={activeEditorTab} onValueChange={(v) => setActiveEditorTab(v)}>
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
          <section className="space-y-4 border-b border-outline-variant pb-unit-lg">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="Landing name"
                onChange={(value) =>
                  updateLandingMeta(activeLanding.id, { name: value })
                }
                value={activeLanding.name}
              />
              <TextField
                label="Slug"
                onChange={(value) =>
                  updateLandingMeta(activeLanding.id, { slug: value })
                }
                value={activeLanding.slug}
              />
              <TextField
                className="md:col-span-2"
                label="SEO title"
                onChange={(value) =>
                  updateLandingMeta(activeLanding.id, { seoTitle: value })
                }
                value={activeLanding.seoTitle}
              />
            </div>
          </section>

          {activeEditorTab === "Hero" ? (
            <section className="space-y-5 py-unit-lg">
              <NavLabelsEditor activeLanding={activeLanding} />
              <SectionTitle title="Hero" description="Edita el bloque principal del portfolio." />
              <TextField
                label="Eyebrow"
                onChange={(value) => updateHero(activeLanding.id, { eyebrow: value })}
                value={activeLanding.content.hero.eyebrow}
              />
              <TextField
                label="Title"
                onChange={(value) => updateHero(activeLanding.id, { title: value })}
                value={activeLanding.content.hero.title}
              />
              <TextArea
                label="Subtitle"
                onChange={(value) => updateHero(activeLanding.id, { subtitle: value })}
                value={activeLanding.content.hero.subtitle}
              />
              <TextField
                label="Texto del botón"
                onChange={(value) => updateHero(activeLanding.id, { ctaLabel: value })}
                value={activeLanding.content.hero.ctaLabel ?? ""}
              />
              <ImageField
                label="Hero image"
                onChange={(value) => updateHero(activeLanding.id, { image: value })}
                presets={BACKGROUND_IMAGE_OPTIONS}
                templateId={activeLanding.template}
                value={activeLanding.content.hero.image}
              />
            </section>
          ) : null}

          {activeEditorTab === "Proyectos" ? (
            <section className="space-y-5 py-unit-lg">
              <SectionTitle title="Proyectos" description="Edita las imágenes de la galería de proyectos." />
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor="proyectos"
                fallback={SECTION_HEADING_DEFAULTS.portfolio.proyectos}
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
                        updateSectionItem(activeLanding.id, "gallery", item.id, { image: value })
                      }
                      value={item.image ?? ""}
                    />
                  </div>
                ))}
              </div>
            </section>
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
                {workHistory.map((item) => (
                  <div
                    className="space-y-3 border-b border-outline-variant pb-6 last:border-0 last:pb-0"
                    key={item.id}
                  >
                  <TextField
                    label="Fechas"
                    onChange={(value) =>
                      updateSectionItem(activeLanding.id, "workHistory", item.id, {
                        dateRange: value,
                      })
                    }
                    value={item.dateRange}
                  />
                  <TextField
                    label="Ubicación"
                    onChange={(value) =>
                      updateSectionItem(activeLanding.id, "workHistory", item.id, {
                        location: value,
                      })
                    }
                    value={item.location}
                  />
                  <TextField
                    label="Empresa"
                    onChange={(value) =>
                      updateSectionItem(activeLanding.id, "workHistory", item.id, {
                        company: value,
                      })
                    }
                    value={item.company}
                  />
                  <TextField
                    label="Puesto"
                    onChange={(value) =>
                      updateSectionItem(activeLanding.id, "workHistory", item.id, {
                        title: value,
                      })
                    }
                    value={item.title}
                  />
                  <TextArea
                    label="Resumen de la empresa"
                    onChange={(value) =>
                      updateSectionItem(activeLanding.id, "workHistory", item.id, {
                        summary: value,
                      })
                    }
                    value={item.summary}
                  />
                  <TextArea
                    label="Logros (uno por línea)"
                    onChange={(value) =>
                      updateSectionItem(activeLanding.id, "workHistory", item.id, {
                        highlights: value
                          .split("\n")
                          .map((line) => line.trim())
                          .filter(Boolean),
                      })
                    }
                    rows={5}
                    value={item.highlights.join("\n")}
                  />
                  <TextField
                    label="Tecnologías (separadas por coma)"
                    onChange={(value) =>
                      updateSectionItem(activeLanding.id, "workHistory", item.id, {
                        technologies: value
                          .split(",")
                          .map((tech) => tech.trim())
                          .filter(Boolean),
                      })
                    }
                    value={item.technologies.join(", ")}
                  />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeEditorTab === "Servicios" ? (
            <section className="space-y-5 py-unit-lg">
              <SectionTitle title="Servicios" description="Edita los servicios ofrecidos." />
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor="servicios"
                fallback={SECTION_HEADING_DEFAULTS.portfolio.servicios}
              />
              <div className="space-y-6">
                {serviceMenu.map((item) => (
                  <div
                    className="space-y-3 border-b border-outline-variant pb-6 last:border-0 last:pb-0"
                    key={item.id}
                  >
                  <TextField
                    label="Categoría"
                    onChange={(value) =>
                      updateSectionItem(activeLanding.id, "serviceMenu", item.id, { category: value })
                    }
                    value={item.category}
                  />
                  <TextField
                    label="Nombre"
                    onChange={(value) =>
                      updateSectionItem(activeLanding.id, "serviceMenu", item.id, { name: value })
                    }
                    value={item.name}
                  />
                  <TextArea
                    label="Descripción"
                    onChange={(value) =>
                      updateSectionItem(activeLanding.id, "serviceMenu", item.id, { description: value })
                    }
                    value={item.description}
                  />
                  <TextField
                    label="Precio"
                    onChange={(value) =>
                      updateSectionItem(activeLanding.id, "serviceMenu", item.id, { price: value })
                    }
                    value={item.price}
                  />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeEditorTab === "FAQ" ? (
            <section className="space-y-5 py-unit-lg">
              <SectionTitle title="FAQ" description="Edita las preguntas frecuentes." />
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor="faq"
                fallback={SECTION_HEADING_DEFAULTS.portfolio.faq}
              />
              <div className="space-y-6">
                {faq.map((item) => (
                  <div
                    className="space-y-3 border-b border-outline-variant pb-6 last:border-0 last:pb-0"
                    key={item.id}
                  >
                  <TextField
                    label="Pregunta"
                    onChange={(value) =>
                      updateSectionItem(activeLanding.id, "faq", item.id, { question: value })
                    }
                    value={item.question}
                  />
                  <TextArea
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

          {activeEditorTab === "Posts" ? (
            <section className="space-y-5 py-unit-lg">
              <SectionTitle title="Posts" description="Contenido editorial asociado." />
              <p className="text-body-sm text-on-surface-variant">
                Editor de posts disponible próximamente.
              </p>
            </section>
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
