"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import { ImageField } from "@/components/dashboard/image-field";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTemplate } from "@/lib/template-registry";
import { EditorLayout } from "@/components/dashboard/editor-layout";
import { LockIcon } from "lucide-react";

export function StudioEditorSection() {
  const {
    activeEditorTab,
    activeLandingId,
    isAdmin,
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
              <SectionTitle title="Portada" description="El bloque principal de la landing." />
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
              <ImageField
                label="Imagen de portada"
                onChange={(value) => updateHero(activeLanding.id, { image: value })}
                value={activeLanding.content.hero.image}
              />
            </section>
          ) : null}

          {activeEditorTab === "Servicios" ? (
            <section className="space-y-5 px-unit-lg py-unit-lg">
              <SectionTitle title="Servicios" description="Carta de servicios con precios y duraciones." />
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
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeEditorTab === "Equipo" ? (
            <section className="space-y-5 px-unit-lg py-unit-lg">
              <SectionTitle title="Equipo" description="Miembros del equipo." />
              <div className="space-y-6">
                {team.map((member) => (
                  <div
                    className="space-y-3 border-b border-outline-variant pb-6 last:border-0 last:pb-0"
                    key={member.id}
                  >
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
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeEditorTab === "Galeria" ? (
            <section className="space-y-5 px-unit-lg py-unit-lg">
              <SectionTitle title="Galería" description="Imágenes de la galería." />
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

          {activeEditorTab === "FAQ" ? (
            <section className="space-y-5 px-unit-lg py-unit-lg">
              <SectionTitle title="Preguntas frecuentes" description="Dudas habituales de los clientes." />
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
            <section className="space-y-5 px-unit-lg py-unit-lg">
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
