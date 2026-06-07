"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import { Panel } from "@/components/ui/primitives";
import { ImageField } from "@/components/dashboard/image-field";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTemplate } from "@/lib/template-registry";
import { EditorLayout } from "@/components/dashboard/editor-layout";

export function StudioEditorSection() {
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

  const template = getTemplate(activeLanding.template);
  const tabs = template?.editorTabs ?? [];

  const saveActive = () => saveLanding(activeLanding.id);
  const publishActive = () => publishLanding(activeLanding.id);

  const team = activeLanding.content.team ?? [];
  const serviceMenu = activeLanding.content.serviceMenu ?? [];
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
              <SectionTitle title="Hero" description="Edita el bloque principal de la landing." />
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
              <ImageField
                label="Hero image"
                onChange={(value) => updateHero(activeLanding.id, { image: value })}
                value={activeLanding.content.hero.image}
              />
            </Panel>
          ) : null}

          {activeEditorTab === "Servicios" ? (
            <Panel className="space-y-5 p-unit-lg">
              <SectionTitle title="Servicios" description="Edita la carta de servicios con precios y duraciones." />
              {serviceMenu.map((item) => (
                <Panel className="space-y-3 p-3" key={item.id}>
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
                  <div className="grid gap-3 md:grid-cols-2">
                    <TextField
                      label="Precio"
                      onChange={(value) =>
                        updateSectionItem(activeLanding.id, "serviceMenu", item.id, { price: value })
                      }
                      value={item.price}
                    />
                    <TextField
                      label="Duración"
                      onChange={(value) =>
                        updateSectionItem(activeLanding.id, "serviceMenu", item.id, { duration: value })
                      }
                      value={item.duration ?? ""}
                    />
                  </div>
                </Panel>
              ))}
            </Panel>
          ) : null}

          {activeEditorTab === "Equipo" ? (
            <Panel className="space-y-5 p-unit-lg">
              <SectionTitle title="Equipo" description="Edita los miembros del equipo." />
              {team.map((member) => (
                <Panel className="space-y-3 p-3" key={member.id}>
                  <TextField
                    label="Nombre"
                    onChange={(value) =>
                      updateSectionItem(activeLanding.id, "team", member.id, { name: value })
                    }
                    value={member.name}
                  />
                  <TextField
                    label="Rol"
                    onChange={(value) =>
                      updateSectionItem(activeLanding.id, "team", member.id, { role: value })
                    }
                    value={member.role}
                  />
                  <TextArea
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
                    value={member.image}
                  />
                </Panel>
              ))}
            </Panel>
          ) : null}

          {activeEditorTab === "Galeria" ? (
            <Panel className="space-y-5 p-unit-lg">
              <SectionTitle title="Galería" description="Edita las imágenes de la galería." />
              {(activeLanding.content.gallery ?? []).map((item) => (
                <Panel className="space-y-3 p-3" key={item.id}>
                  <ImageField
                    label="Imagen"
                    onChange={(value) =>
                      updateSectionItem(activeLanding.id, "gallery", item.id, { image: value })
                    }
                    value={item.image ?? ""}
                  />
                </Panel>
              ))}
            </Panel>
          ) : null}

          {activeEditorTab === "FAQ" ? (
            <Panel className="space-y-5 p-unit-lg">
              <SectionTitle title="FAQ" description="Edita las preguntas frecuentes." />
              {faq.map((item) => (
                <Panel className="space-y-3 p-3" key={item.id}>
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
                </Panel>
              ))}
            </Panel>
          ) : null}

          {activeEditorTab === "Posts" ? (
            <Panel className="space-y-5 p-unit-lg">
              <SectionTitle title="Posts" description="Contenido editorial asociado." />
              <p className="text-body-sm text-on-surface-variant">
                Editor de posts disponible próximamente.
              </p>
            </Panel>
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
