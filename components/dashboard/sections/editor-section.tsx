"use client";

import { editorTabs } from "@/lib/dashboard-data";
import { useDashboardStore } from "@/stores/dashboard-store";
import { ImageField } from "@/components/dashboard/image-field";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudioEditorSection } from "@/components/dashboard/sections/studio-editor-section";
import { PortfolioEditorSection } from "@/components/dashboard/sections/portfolio-editor-section";
import { RistoranteEditorSection } from "@/components/dashboard/sections/ristorante-editor-section";
import { FloristeriaEditorSection } from "@/components/dashboard/sections/floristeria-editor-section";
import { EditorLayout } from "@/components/dashboard/editor-layout";
import { LockIcon } from "lucide-react";

export function EditorSection() {
  const {
    activeEditorTab,
    activeLandingId,
    activePostId,
    activePresentationId,
    isAdmin,
    landings,
    posts,
    presentations,
    publishLanding,
    publishPost,
    publishPresentation,
    saveLanding,
    savePost,
    savePresentation,
    setActiveEditorTab,
    setActiveLandingId,
    updateHero,
    updateLandingMeta,
    updatePost,
    updatePresentation,
    updatePresentationSlide,
    updateService,
    updateSpace,
    updateStat,
    updateStory,
    updateTestimonial,
    updateWorkflowStep,
  } = useDashboardStore();

  const activeLanding =
    landings.find((landing) => landing.id === activeLandingId) ?? landings[0];
  const activePost = posts.find((post) => post.id === activePostId) ?? posts[0];
  const activePresentation =
    presentations.find((item) => item.id === activePresentationId) ??
    presentations[0];

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

  const saveActive = () => {
    if (activeEditorTab === "Posts") {
      savePost(activePost.id);
      return;
    }

    if (activeEditorTab === "Presentaciones") {
      savePresentation(activePresentation.id);
      return;
    }

    saveLanding(activeLanding.id);
  };

  const publishActive = () => {
    if (activeEditorTab === "Posts") {
      publishPost(activePost.id);
      return;
    }

    if (activeEditorTab === "Presentaciones") {
      publishPresentation(activePresentation.id);
      return;
    }

    publishLanding(activeLanding.id);
  };

  return (
    <EditorLayout
      activeLanding={activeLanding}
      landings={landings}
      onPublish={publishActive}
      onSave={saveActive}
      onSelectLanding={setActiveLandingId}
      showComments
      tabs={
        <div className="border-b border-outline-variant bg-surface-container-lowest px-unit-lg">
          <Tabs
            value={activeEditorTab}
            onValueChange={(v) => setActiveEditorTab(v as typeof activeEditorTab)}
          >
            <TabsList className="h-auto gap-0 rounded-none bg-transparent p-0">
              {editorTabs.map((tab) => (
                <TabsTrigger
                  className="mr-unit-lg rounded-none border-b-2 border-transparent px-0 py-3 font-label text-label-md text-on-surface-variant transition-colors data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
                  key={tab}
                  value={tab}
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      }
      form={
        <>
          {isAdmin ? (
            <section className="rounded-lg border border-outline-variant bg-surface-container px-unit-md py-unit-sm">
              <div className="mb-3 flex items-center gap-1.5 text-on-surface-variant">
                <LockIcon className="h-3.5 w-3.5" />
                <span className="font-label text-label-sm uppercase tracking-wide">
                  Solo admin
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <TextField
                  label="Nombre interno"
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
                  label="Título SEO"
                  onChange={(value) =>
                    updateLandingMeta(activeLanding.id, { seoTitle: value })
                  }
                  value={activeLanding.seoTitle}
                />
              </div>
            </section>
          ) : null}

          {activeEditorTab === "Hero" ? (
            <section className="space-y-5 px-unit-lg py-unit-lg">
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
                value={activeLanding.content.hero.image}
              />
            </section>
          ) : null}

          {activeEditorTab === "Historia" ? (
            <section className="space-y-5 px-unit-lg py-unit-lg">
              <SectionTitle
                description="Narrativa, métricas, proceso y testimonios."
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

              {(activeLanding.content.workflow ?? []).length > 0 ? (
                <div>
                  <p className="mb-3 font-label text-label-md text-on-surface-variant">
                    Proceso
                  </p>
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
                </div>
              ) : null}

              {activeLanding.content.testimonials.slice(0, 1).map((item) => (
                <div className="space-y-3" key={item.id}>
                  <p className="font-label text-label-md text-on-surface-variant">
                    Testimonio destacado
                  </p>
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
            </section>
          ) : null}

          {activeEditorTab === "Espacios" ? (
            <section className="space-y-5 px-unit-lg py-unit-lg">
              <SectionTitle
                description="Los espacios mostrados en la landing."
                title="Espacios"
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
            <section className="space-y-5 px-unit-lg py-unit-lg">
              <SectionTitle
                description="Servicios y mensajes operativos."
                title="Servicios"
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

          {activeEditorTab === "Posts" ? (
            <section className="space-y-5 px-unit-lg py-unit-lg">
              <SectionTitle
                description="Contenido editorial asociado a la landing."
                title="Posts"
              />
              <TextField
                label="Título"
                onChange={(value) => updatePost(activePost.id, { title: value })}
                value={activePost.title}
              />
              {isAdmin ? (
                <TextField
                  label="Slug"
                  onChange={(value) => updatePost(activePost.id, { slug: value })}
                  value={activePost.slug}
                />
              ) : null}
              <TextArea
                label="Extracto"
                onChange={(value) => updatePost(activePost.id, { excerpt: value })}
                value={activePost.excerpt}
              />
              <TextArea
                label="Contenido"
                onChange={(value) => updatePost(activePost.id, { body: value })}
                rows={8}
                value={activePost.body}
              />
            </section>
          ) : null}

          {activeEditorTab === "Presentaciones" ? (
            <section className="space-y-5 px-unit-lg py-unit-lg">
              <SectionTitle
                description="Decks comerciales reutilizables."
                title="Presentaciones"
              />
              <TextField
                label="Título del deck"
                onChange={(value) =>
                  updatePresentation(activePresentation.id, { title: value })
                }
                value={activePresentation.title}
              />
              <TextField
                label="Audiencia"
                onChange={(value) =>
                  updatePresentation(activePresentation.id, { audience: value })
                }
                value={activePresentation.audience}
              />
              <div className="space-y-6">
                {activePresentation.slides.map((slide, index) => (
                  <div
                    className="space-y-3 border-b border-outline-variant pb-6 last:border-0 last:pb-0"
                    key={slide.id}
                  >
                    <p className="font-label text-label-md text-on-surface-variant">
                      Diapositiva {index + 1}
                    </p>
                    <TextField
                      label="Título"
                      onChange={(value) =>
                        updatePresentationSlide(activePresentation.id, slide.id, {
                          title: value,
                        })
                      }
                      value={slide.title}
                    />
                    <TextArea
                      label="Contenido"
                      onChange={(value) =>
                        updatePresentationSlide(activePresentation.id, slide.id, {
                          body: value,
                        })
                      }
                      value={slide.body}
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
