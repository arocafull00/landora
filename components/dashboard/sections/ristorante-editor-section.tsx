"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import { ImageField } from "@/components/dashboard/image-field";
import { BACKGROUND_IMAGE_OPTIONS } from "@/lib/background-assets";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getVisibleEditorTabs } from "@/lib/template-sections";
import { EditorLayout } from "@/components/dashboard/editor-layout";
import { NavEditorPanel } from "@/components/dashboard/nav-editor-panel";
import { AdminEditorPanel } from "@/components/dashboard/admin-editor-panel";
import { ContactEditorPanel } from "@/components/dashboard/contact-editor-panel";
import { SectionsEditorPanel } from "@/components/dashboard/sections-editor-panel";
import { SectionHeadingFields } from "@/components/dashboard/section-heading-fields";
import { SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

export function RistoranteEditorSection() {
  const {
    activeEditorTab,
    activeLandingId,
    isAdmin,
    landings,
    saveStatus,
    saveLanding,
    publishLanding,
    setActiveEditorTab,
    setActiveLandingId,
    updateHero,
    updateSectionItem,
  } = useDashboardStore();

  const activeLanding =
    landings.find((landing) => landing.id === activeLandingId) ?? landings[0];

  if (!activeLanding) return null;

  const tabs = getVisibleEditorTabs(
    activeLanding.template,
    activeLanding.content.hiddenSections,
    isAdmin,
  );

  const saveActive = () => saveLanding(activeLanding.id);
  const publishActive = () => publishLanding(activeLanding.id);

  const serviceMenu = activeLanding.content.serviceMenu ?? [];
  const team = activeLanding.content.team ?? [];
  const workflow = activeLanding.content.workflow ?? [];
  const faq = activeLanding.content.faq ?? [];

  return (
    <EditorLayout
      activeLanding={activeLanding}
      disabled={saveStatus === "saving"}
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
              <SectionTitle title="Hero" description="Edita el bloque principal del restaurante." />
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

          {activeEditorTab === "Carta" ? (
            <section className="space-y-5 py-unit-lg">
              <SectionTitle title="Carta" description="Edita la carta con categorías y precios." />
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor="carta"
                fallback={SECTION_HEADING_DEFAULTS.ristorante.carta}
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

          {activeEditorTab === "Galeria" ? (
            <section className="space-y-5 py-unit-lg">
              <SectionTitle title="Galería" description="Edita las imágenes de la galería." />
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor="galeria"
                fallback={SECTION_HEADING_DEFAULTS.ristorante.galeria}
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

          {activeEditorTab === "Equipo" ? (
            <section className="space-y-5 py-unit-lg">
              <SectionTitle title="Equipo" description="Edita los miembros del equipo." />
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor="equipo"
                fallback={SECTION_HEADING_DEFAULTS.ristorante.equipo}
              />
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

          {activeEditorTab === "Horarios" ? (
            <section className="space-y-5 py-unit-lg">
              <SectionTitle title="Horarios" description="Edita los horarios de apertura." />
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor="horarios"
                fallback={SECTION_HEADING_DEFAULTS.ristorante.horarios}
              />
              <div className="space-y-6">
                {workflow.map((item) => (
                  <div
                    className="space-y-3 border-b border-outline-variant pb-6 last:border-0 last:pb-0"
                    key={item.id}
                  >
                  <TextField
                    label="Día"
                    onChange={(value) =>
                      updateSectionItem(activeLanding.id, "workflow", item.id, { number: value })
                    }
                    value={item.number}
                  />
                  <TextField
                    label="Horario"
                    onChange={(value) =>
                      updateSectionItem(activeLanding.id, "workflow", item.id, { title: value })
                    }
                    value={item.title}
                  />
                  <TextField
                    label="Nota"
                    onChange={(value) =>
                      updateSectionItem(activeLanding.id, "workflow", item.id, { description: value })
                    }
                    value={item.description}
                  />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeEditorTab === "FAQ" ? (
            <section className="space-y-5 py-unit-lg">
              <SectionTitle title="FAQ" description="Edita las preguntas frecuentes." />
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

          {activeEditorTab === "Contacto" ? (
            <ContactEditorPanel activeLanding={activeLanding} />
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
