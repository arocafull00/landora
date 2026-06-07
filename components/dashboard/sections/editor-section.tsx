"use client";

import { editorTabs } from "@/lib/dashboard-data";
import { useDashboardStore } from "@/stores/dashboard-store";
import { Panel } from "@/components/ui/primitives";
import { ImageField } from "@/components/dashboard/image-field";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudioEditorSection } from "@/components/dashboard/sections/studio-editor-section";
import { EditorLayout } from "@/components/dashboard/editor-layout";

export function EditorSection() {
  const {
    activeEditorTab,
    activeLandingId,
    activePostId,
    activePresentationId,
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

  const saveActive = () => {
    if (activeEditorTab === "Posts") {
      savePost(activePost.id);
      return;
    }

    if (activeEditorTab === "Presentations") {
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

    if (activeEditorTab === "Presentations") {
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
          <Panel className="p-unit-md">
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
          </Panel>
          {activeEditorTab === "Hero" ? (
            <Panel className="space-y-5 p-unit-lg">
              <SectionTitle
                description="Edita el bloque principal de la landing Toll Story."
                title="Hero"
              />
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
              <TextArea
                label="Desktop description"
                onChange={(value) =>
                  updateHero(activeLanding.id, { description: value })
                }
                value={activeLanding.content.hero.description}
              />
              <ImageField
                label="Hero image"
                onChange={(value) => updateHero(activeLanding.id, { image: value })}
                value={activeLanding.content.hero.image}
              />
            </Panel>
          ) : null}
          {activeEditorTab === "Story" ? (
            <Panel className="space-y-5 p-unit-lg">
              <SectionTitle
                description="Edita la narrativa, métricas, proceso y testimonios."
                title="Story"
              />
              <TextArea
                label="Statement"
                onChange={(value) =>
                  updateStory(activeLanding.id, { statement: value })
                }
                rows={5}
                value={activeLanding.content.story?.statement ?? ""}
              />
              <div className="grid gap-3 md:grid-cols-3">
                {activeLanding.content.stats.map((stat) => (
                  <Panel className="space-y-3 p-3" key={stat.id}>
                    <TextField
                      label="Value"
                      onChange={(value) =>
                        updateStat(activeLanding.id, stat.id, { value })
                      }
                      value={stat.value}
                    />
                    <TextField
                      label="Label"
                      onChange={(value) =>
                        updateStat(activeLanding.id, stat.id, { label: value })
                      }
                      value={stat.label}
                    />
                  </Panel>
                ))}
              </div>
              {(activeLanding.content.workflow ?? []).map((step) => (
                <Panel className="grid gap-3 p-3 md:grid-cols-[80px_1fr]" key={step.id}>
                  <TextField
                    label="No."
                    onChange={(value) =>
                      updateWorkflowStep(activeLanding.id, step.id, {
                        number: value,
                      })
                    }
                    value={step.number}
                  />
                  <div className="space-y-3">
                    <TextField
                      label="Step title"
                      onChange={(value) =>
                        updateWorkflowStep(activeLanding.id, step.id, {
                          title: value,
                        })
                      }
                      value={step.title}
                    />
                    <TextArea
                      label="Step description"
                      onChange={(value) =>
                        updateWorkflowStep(activeLanding.id, step.id, {
                          description: value,
                        })
                      }
                      value={step.description}
                    />
                  </div>
                </Panel>
              ))}
              {activeLanding.content.testimonials.slice(0, 1).map((item) => (
                <Panel className="space-y-3 p-3" key={item.id}>
                  <TextField
                    label="Review author"
                    onChange={(value) =>
                      updateTestimonial(activeLanding.id, item.id, {
                        author: value,
                      })
                    }
                    value={item.author}
                  />
                  <TextArea
                    label="Review"
                    onChange={(value) =>
                      updateTestimonial(activeLanding.id, item.id, {
                        comment: value,
                      })
                    }
                    rows={4}
                    value={item.comment}
                  />
                </Panel>
              ))}
            </Panel>
          ) : null}
          {activeEditorTab === "Spaces" ? (
            <Panel className="space-y-5 p-unit-lg">
              <SectionTitle
                description="Edita los espacios mostrados en la landing."
                title="Spaces"
              />
              {(activeLanding.content.spaces ?? []).map((space) => (
                <Panel className="space-y-3 p-3" key={space.id}>
                  <TextField
                    label="Name"
                    onChange={(value) =>
                      updateSpace(activeLanding.id, space.id, { name: value })
                    }
                    value={space.name}
                  />
                  <TextArea
                    label="Description"
                    onChange={(value) =>
                      updateSpace(activeLanding.id, space.id, {
                        description: value,
                      })
                    }
                    value={space.description}
                  />
                  <ImageField
                    label="Image"
                    onChange={(value) =>
                      updateSpace(activeLanding.id, space.id, { image: value })
                    }
                    value={space.image}
                  />
                </Panel>
              ))}
            </Panel>
          ) : null}
          {activeEditorTab === "Services" ? (
            <Panel className="space-y-5 p-unit-lg">
              <SectionTitle
                description="Edita servicios y mensajes operativos."
                title="Services"
              />
              {(activeLanding.content.services ?? []).map((service) => (
                <Panel className="space-y-3 p-3" key={service.id}>
                  <TextField
                    label="Title"
                    onChange={(value) =>
                      updateService(activeLanding.id, service.id, {
                        title: value,
                      })
                    }
                    value={service.title}
                  />
                  <TextField
                    label="Subtitle"
                    onChange={(value) =>
                      updateService(activeLanding.id, service.id, {
                        subtitle: value,
                      })
                    }
                    value={service.subtitle}
                  />
                  <TextField
                    label="Label"
                    onChange={(value) =>
                      updateService(activeLanding.id, service.id, {
                        label: value,
                      })
                    }
                    value={service.label}
                  />
                  <ImageField
                    label="Image"
                    onChange={(value) =>
                      updateService(activeLanding.id, service.id, {
                        image: value,
                      })
                    }
                    value={service.image}
                  />
                </Panel>
              ))}
            </Panel>
          ) : null}
          {activeEditorTab === "Posts" ? (
            <Panel className="space-y-5 p-unit-lg">
              <SectionTitle
                description="Edita contenido editorial asociado a la landing."
                title="Posts"
              />
              <TextField
                label="Title"
                onChange={(value) => updatePost(activePost.id, { title: value })}
                value={activePost.title}
              />
              <TextField
                label="Slug"
                onChange={(value) => updatePost(activePost.id, { slug: value })}
                value={activePost.slug}
              />
              <TextArea
                label="Excerpt"
                onChange={(value) => updatePost(activePost.id, { excerpt: value })}
                value={activePost.excerpt}
              />
              <TextArea
                label="Body"
                onChange={(value) => updatePost(activePost.id, { body: value })}
                rows={8}
                value={activePost.body}
              />
            </Panel>
          ) : null}
          {activeEditorTab === "Presentations" ? (
            <Panel className="space-y-5 p-unit-lg">
              <SectionTitle
                description="Edita decks comerciales reutilizables."
                title="Presentations"
              />
              <TextField
                label="Deck title"
                onChange={(value) =>
                  updatePresentation(activePresentation.id, { title: value })
                }
                value={activePresentation.title}
              />
              <TextField
                label="Audience"
                onChange={(value) =>
                  updatePresentation(activePresentation.id, { audience: value })
                }
                value={activePresentation.audience}
              />
              {activePresentation.slides.map((slide, index) => (
                <Panel className="space-y-3 p-3" key={slide.id}>
                  <p className="font-label text-label-md uppercase text-primary">
                    Slide {index + 1}
                  </p>
                  <TextField
                    label="Slide title"
                    onChange={(value) =>
                      updatePresentationSlide(activePresentation.id, slide.id, {
                        title: value,
                      })
                    }
                    value={slide.title}
                  />
                  <TextArea
                    label="Slide body"
                    onChange={(value) =>
                      updatePresentationSlide(activePresentation.id, slide.id, {
                        body: value,
                      })
                    }
                    value={slide.body}
                  />
                </Panel>
              ))}
            </Panel>
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
