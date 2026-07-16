"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import { ImageField } from "@/components/dashboard/image-field";
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
import { NAV_EDITOR_TAB } from "@/lib/template-registry";
import { ReservasEditorPanel } from "@/components/dashboard/reservas-editor-panel";
import { useDashboardChrome } from "@/components/dashboard/dashboard-chrome-context";
import { HeroEditorPanel } from "@/components/dashboard/hero-editor/hero-editor-panel";

export function OficioProEditorSection() {
  const { bookingEnabled } = useDashboardChrome();
  const {
    activeEditorTab,
    activeLandingId,
    isAdmin,
    landings,
    updateSectionItem,
    updateStat,
    updateStory,
    updateTestimonial,
  } = useDashboardStore();

  const activeLanding =
    landings.find((landing) => landing.id === activeLandingId) ?? landings[0];

  if (!activeLanding) return null;

  const serviceMenu = activeLanding.content.serviceMenu ?? [];
  const serviceItems = serviceMenu.filter((item) => item.category === "Servicios");
  const installationItems = serviceMenu.filter((item) => item.category === "Instalaciones");
  const serviceImages = (activeLanding.content.gallery ?? []).filter((item) =>
    item.tags?.includes("servicios"),
  );
  const installationImages = (activeLanding.content.gallery ?? []).filter((item) =>
    item.tags?.includes("instalaciones"),
  );

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

          {activeEditorTab === NAV_EDITOR_TAB.id ? (
            <NavEditorPanel activeLanding={activeLanding} />
          ) : null}

          {activeEditorTab === "Hero" ? (
            <HeroEditorPanel landing={activeLanding} />
          ) : null}

          {activeEditorTab === "Servicios" ? (
            <section className="space-y-5 py-unit-lg">
              <div>
                <h3 className="text-body-lg font-semibold text-on-surface">Servicios</h3>
                <p className="mt-1 text-body-sm text-on-surface-variant">
                  Servicios principales y carrusel de imágenes.
                </p>
              </div>
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor="servicios"
                fallback={SECTION_HEADING_DEFAULTS["oficio-pro"].servicios}
              />
              <div className="space-y-6">
                {serviceItems.map((item) => (
                  <div className="space-y-3 border-b border-outline-variant pb-6 last:border-0 last:pb-0" key={item.id}>
                    <label className="block">
                      <span className="mb-2 block font-label text-label-md text-on-surface-variant">
                        Nombre
                      </span>
                      <input className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary" onChange={(event) => updateSectionItem(activeLanding.id, "serviceMenu", item.id, { name: event.target.value })} type="text" value={item.name} />
                    </label>
                    <label className="block">
                      <span className="mb-2 block font-label text-label-md text-on-surface-variant">
                        Descripción
                      </span>
                      <textarea className="w-full resize-none rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary" onChange={(event) => updateSectionItem(activeLanding.id, "serviceMenu", item.id, { description: event.target.value })} rows={3} value={item.description} />
                    </label>
                    <label className="block">
                      <span className="mb-2 block font-label text-label-md text-on-surface-variant">
                        Etiqueta
                      </span>
                      <input className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary" onChange={(event) => updateSectionItem(activeLanding.id, "serviceMenu", item.id, { price: event.target.value })} type="text" value={item.price} />
                    </label>
                  </div>
                ))}
                {serviceImages.map((item, index) => (
                  <ImageField
                    key={item.id}
                    label={`Imagen ${index + 1}`}
                    onChange={(value) =>
                      updateSectionItem(activeLanding.id, "gallery", item.id, { image: value })
                    }
                    templateId={activeLanding.template}
                    value={item.image ?? ""}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {activeEditorTab === "Instalaciones" ? (
            <section className="space-y-5 py-unit-lg">
              <div>
                <h3 className="text-body-lg font-semibold text-on-surface">Instalaciones</h3>
                <p className="mt-1 text-body-sm text-on-surface-variant">
                  Servicios técnicos avanzados e imágenes del segundo bloque.
                </p>
              </div>
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor="instalaciones"
                fallback={SECTION_HEADING_DEFAULTS["oficio-pro"].instalaciones}
              />
              <div className="space-y-6">
                {installationItems.map((item) => (
                  <div className="space-y-3 border-b border-outline-variant pb-6 last:border-0 last:pb-0" key={item.id}>
                    <label className="block">
                      <span className="mb-2 block font-label text-label-md text-on-surface-variant">
                        Nombre
                      </span>
                      <input className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary" onChange={(event) => updateSectionItem(activeLanding.id, "serviceMenu", item.id, { name: event.target.value })} type="text" value={item.name} />
                    </label>
                    <label className="block">
                      <span className="mb-2 block font-label text-label-md text-on-surface-variant">
                        Descripción
                      </span>
                      <textarea className="w-full resize-none rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary" onChange={(event) => updateSectionItem(activeLanding.id, "serviceMenu", item.id, { description: event.target.value })} rows={3} value={item.description} />
                    </label>
                    <label className="block">
                      <span className="mb-2 block font-label text-label-md text-on-surface-variant">
                        Etiqueta
                      </span>
                      <input className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary" onChange={(event) => updateSectionItem(activeLanding.id, "serviceMenu", item.id, { price: event.target.value })} type="text" value={item.price} />
                    </label>
                  </div>
                ))}
                {installationImages.map((item, index) => (
                  <ImageField
                    key={item.id}
                    label={`Imagen ${index + 1}`}
                    onChange={(value) =>
                      updateSectionItem(activeLanding.id, "gallery", item.id, { image: value })
                    }
                    templateId={activeLanding.template}
                    value={item.image ?? ""}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {activeEditorTab === "Testimonios" ? (
            <section className="space-y-5 py-unit-lg">
              <div>
                <h3 className="text-body-lg font-semibold text-on-surface">Testimonios</h3>
                <p className="mt-1 text-body-sm text-on-surface-variant">
                  Opiniones mostradas en la landing.
                </p>
              </div>
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor="testimonios"
                fallback={SECTION_HEADING_DEFAULTS["oficio-pro"].testimonios}
              />
              <div className="space-y-6">
                {activeLanding.content.testimonials.map((item) => (
                  <div className="space-y-3 border-b border-outline-variant pb-6 last:border-0 last:pb-0" key={item.id}>
                    <label className="block">
                      <span className="mb-2 block font-label text-label-md text-on-surface-variant">
                        Autor
                      </span>
                      <input className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary" onChange={(event) => updateTestimonial(activeLanding.id, item.id, { author: event.target.value })} type="text" value={item.author} />
                    </label>
                    <label className="block">
                      <span className="mb-2 block font-label text-label-md text-on-surface-variant">
                        Reseña
                      </span>
                      <textarea className="w-full resize-none rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary" onChange={(event) => updateTestimonial(activeLanding.id, item.id, { comment: event.target.value })} rows={4} value={item.comment} />
                    </label>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeEditorTab === "Experiencia" ? (
            <section className="space-y-5 py-unit-lg">
              <div>
                <h3 className="text-body-lg font-semibold text-on-surface">Experiencia</h3>
                <p className="mt-1 text-body-sm text-on-surface-variant">
                  Texto de trayectoria y métricas.
                </p>
              </div>
              <SectionHeadingFields
                activeLanding={activeLanding}
                anchor="experiencia"
                fallback={SECTION_HEADING_DEFAULTS["oficio-pro"].experiencia}
              />
              <label className="block">
                <span className="mb-2 block font-label text-label-md text-on-surface-variant">
                  Texto principal
                </span>
                <textarea className="w-full resize-none rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary" onChange={(event) => updateStory(activeLanding.id, { statement: event.target.value })} rows={5} value={activeLanding.content.story?.statement ?? ""} />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                {activeLanding.content.stats.map((stat) => (
                  <div className="space-y-3" key={stat.id}>
                    <label className="block">
                      <span className="mb-2 block font-label text-label-md text-on-surface-variant">
                        Valor
                      </span>
                      <input className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary" onChange={(event) => updateStat(activeLanding.id, stat.id, { value: event.target.value })} type="text" value={stat.value} />
                    </label>
                    <label className="block">
                      <span className="mb-2 block font-label text-label-md text-on-surface-variant">
                        Etiqueta
                      </span>
                      <input className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary" onChange={(event) => updateStat(activeLanding.id, stat.id, { label: event.target.value })} type="text" value={stat.label} />
                    </label>
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
