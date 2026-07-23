"use client";

import { Plus } from "lucide-react";
import { useDashboardStore } from "@/stores/dashboard-store";
import { useShallow } from "zustand/react/shallow";
import { EditorLayout } from "@/components/dashboard/editor-layout";
import { NavEditorPanel } from "@/components/dashboard/nav-editor-panel";
import { AdminEditorPanel } from "@/components/dashboard/admin-editor-panel";
import { SeoEditorPanel } from "@/components/dashboard/seo-editor-panel";
import { FooterEditorPanel } from "@/components/dashboard/footer-editor-panel";
import { BlogConfigEditorPanel } from "@/components/dashboard/blog-config-editor-panel";
import { OffersEditorPanel } from "@/components/dashboard/offers-editor-panel";
import { SectionsEditorPanel } from "@/components/dashboard/sections-editor-panel";
import { SectionHeadingFields } from "@/components/dashboard/section-heading-fields";
import { SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { createEmptyWorkHistoryItem } from "@/components/dashboard/create-empty-work-history-item";
import { PortfolioWorkHistoryItemEditor } from "@/components/dashboard/portfolio-work-history-item-editor";
import { ReservasEditorPanel } from "@/components/dashboard/reservas-editor-panel";
import { useDashboardChrome } from "@/components/dashboard/dashboard-chrome-context";
import { HeroEditorPanel } from "@/components/dashboard/hero-editor/hero-editor-panel";
import { createEmptyGalleryItem } from "@/components/dashboard/create-empty-gallery-item";
import { PortfolioProjectItemEditor } from "@/components/dashboard/portfolio-project-item-editor";
import { createEmptyBenefitItem } from "@/components/dashboard/create-empty-benefit-item";
import { PortfolioBenefitItemEditor } from "@/components/dashboard/portfolio-benefit-item-editor";

export function PortfolioEditorSection() {
  const { bookingEnabled } = useDashboardChrome();
  const {
    activeEditorTab,
    activeLandingId,
    isAdmin,
    landings,
    setActivePageTarget,
    updateSection,
    updateSectionItem,
  } = useDashboardStore(
    useShallow((state) => ({
      activeEditorTab: state.activeEditorTab,
      activeLandingId: state.activeLandingId,
      isAdmin: state.isAdmin,
      landings: state.landings,
      setActivePageTarget: state.setActivePageTarget,
      updateSection: state.updateSection,
      updateSectionItem: state.updateSectionItem,
    })),
  );

  const activeLanding =
    landings.find((landing) => landing.id === activeLandingId) ?? landings[0];

  if (!activeLanding) return null;

  const gallery = activeLanding.content.gallery ?? [];
  const benefits = activeLanding.content.benefits ?? [];
  const serviceMenu = activeLanding.content.serviceMenu ?? [];
  const workHistory = activeLanding.content.workHistory ?? [];
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

          {activeEditorTab === "Hero" ? (
            <HeroEditorPanel landing={activeLanding} />
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
                {gallery.map((item, index) => (
                  <PortfolioProjectItemEditor
                    gallery={gallery}
                    index={index}
                    item={item}
                    key={item.id}
                    onChange={(patch) =>
                      updateSectionItem(activeLanding.id, "gallery", item.id, patch)
                    }
                    onEditPage={() =>
                      setActivePageTarget({
                        type: "project",
                        projectId: item.id,
                      })
                    }
                    onRemove={() =>
                      updateSection(
                        activeLanding.id,
                        "gallery",
                        gallery.filter((entry) => entry.id !== item.id),
                      )
                    }
                    templateId={activeLanding.template}
                  />
                ))}
              </div>
              <button
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-outline-variant px-4 py-3 font-label text-label-md text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
                onClick={() =>
                  updateSection(activeLanding.id, "gallery", [
                    ...gallery,
                    createEmptyGalleryItem(),
                  ])
                }
                type="button"
              >
                <Plus aria-hidden className="size-4" />
                Añadir proyecto
              </button>
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

          {activeEditorTab === "Cómo trabajo" ? (
            <section className="space-y-5 py-unit-lg">
              <SectionTitle
                title="Cómo trabajo"
                description="Edita los principios que explican tu forma de trabajar."
              />
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor="skills"
                fallback={SECTION_HEADING_DEFAULTS.portfolio.skills}
              />
              <div className="space-y-6">
                {benefits.map((item, index) => (
                  <PortfolioBenefitItemEditor
                    index={index}
                    item={item}
                    key={item.id}
                    onChange={(patch) =>
                      updateSectionItem(activeLanding.id, "benefits", item.id, patch)
                    }
                    onRemove={() =>
                      updateSection(
                        activeLanding.id,
                        "benefits",
                        benefits.filter((entry) => entry.id !== item.id),
                      )
                    }
                  />
                ))}
              </div>
              <button
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-outline-variant px-4 py-3 font-label text-label-md text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
                onClick={() =>
                  updateSection(activeLanding.id, "benefits", [
                    ...benefits,
                    createEmptyBenefitItem(),
                  ])
                }
                type="button"
              >
                <Plus aria-hidden className="size-4" />
                Añadir elemento
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
  placeholder,
  value,
}: {
  className?: string;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
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
        placeholder={placeholder}
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
