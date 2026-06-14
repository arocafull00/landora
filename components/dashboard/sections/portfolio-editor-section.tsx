"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import { ImageField } from "@/components/dashboard/image-field";
import { BACKGROUND_IMAGE_OPTIONS } from "@/lib/background-assets";
import { EditorTabsBar } from "@/components/dashboard/editor-tabs-bar";
import { getVisibleEditorTabs } from "@/lib/template-sections";
import { EditorLayout } from "@/components/dashboard/editor-layout";
import { NavEditorPanel } from "@/components/dashboard/nav-editor-panel";
import { AdminEditorPanel } from "@/components/dashboard/admin-editor-panel";
import { FooterEditorPanel } from "@/components/dashboard/footer-editor-panel";
import { BlogConfigEditorPanel } from "@/components/dashboard/blog-config-editor-panel";
import { SectionsEditorPanel } from "@/components/dashboard/sections-editor-panel";
import { SectionHeadingFields } from "@/components/dashboard/section-heading-fields";
import { SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import {
  createEmptyWorkHistoryItem,
  PortfolioWorkHistoryItemEditor,
} from "@/components/dashboard/portfolio-work-history-item-editor";

export function PortfolioEditorSection() {
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
    updateSection,
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
  const workHistory = activeLanding.content.workHistory ?? [];
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
        <EditorTabsBar
          activeTab={activeEditorTab}
          onTabChange={(v) => setActiveEditorTab(v)}
          tabs={tabs}
        />
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
                      Proyecto {index + 1}
                    </p>
                    <ImageField
                      label="Imagen"
                      onChange={(value) =>
                        updateSectionItem(activeLanding.id, "gallery", item.id, { image: value })
                      }
                      templateId={activeLanding.template}
                      value={item.image ?? ""}
                    />
                    <TextField
                      label="Título (opcional)"
                      onChange={(value) =>
                        updateSectionItem(activeLanding.id, "gallery", item.id, { title: value })
                      }
                      value={item.title ?? ""}
                    />
                    <TextArea
                      label="Descripción (opcional)"
                      onChange={(value) =>
                        updateSectionItem(activeLanding.id, "gallery", item.id, { description: value })
                      }
                      rows={2}
                      value={item.description ?? ""}
                    />
                    <TagsField
                      label="Etiquetas (separadas por coma)"
                      onChange={(value) =>
                        updateSectionItem(activeLanding.id, "gallery", item.id, { tags: value })
                      }
                      value={item.tags ?? []}
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
                {workHistory.map((item, index) => (
                  <PortfolioWorkHistoryItemEditor
                    index={index}
                    item={item}
                    key={item.id}
                    onChange={(patch) =>
                      updateSectionItem(activeLanding.id, "workHistory", item.id, patch)
                    }
                    onRemove={() =>
                      updateSection(
                        activeLanding.id,
                        "workHistory",
                        workHistory.filter((entry) => entry.id !== item.id),
                      )
                    }
                  />
                ))}
              </div>
              <button
                className="w-full rounded-lg border border-dashed border-outline-variant px-4 py-3 font-label text-label-md text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
                onClick={() =>
                  updateSection(activeLanding.id, "workHistory", [
                    ...workHistory,
                    createEmptyWorkHistoryItem(),
                  ])
                }
                type="button"
              >
                Añadir experiencia
              </button>
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

function TagsField({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string[]) => void;
  value: string[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-label text-label-md text-on-surface-variant">
        {label}
      </span>
      <input
        className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
        onChange={(event) =>
          onChange(
            event.target.value
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
          )
        }
        placeholder="React, TypeScript, Node.js"
        type="text"
        value={value.join(", ")}
      />
    </label>
  );
}
