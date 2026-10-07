"use client";

import { EditorLayout } from "@/components/dashboard/editor-layout";
import { HeroEditorPanel } from "@/components/dashboard/hero-editor/hero-editor-panel";
import { NavEditorPanel } from "@/components/dashboard/nav-editor-panel";
import { SeoEditorPanel } from "@/components/dashboard/seo-editor-panel";
import { FooterEditorPanel } from "@/components/dashboard/footer-editor-panel";
import { SectionsEditorPanel } from "@/components/dashboard/sections-editor-panel";
import { AdminEditorPanel } from "@/components/dashboard/admin-editor-panel";
import { EditorSectionTitle } from "@/components/dashboard/editor-section-title";
import { useRistoranteEditor } from "@/components/dashboard/ristorante/hooks/use-ristorante-editor";
import { RistoranteContentForm } from "@/components/dashboard/ristorante/components/ristorante-content-form";
import { RistoranteMenuEditorItem } from "@/components/dashboard/ristorante/components/ristorante-menu-editor-item";
import { RistoranteGalleryEditorItem } from "@/components/dashboard/ristorante/components/ristorante-gallery-editor-item";
import { RistoranteLabelEditorItem } from "@/components/dashboard/ristorante/components/ristorante-label-editor-item";
import { RISTORANTE_EDITOR_COPY } from "@/components/dashboard/ristorante/ristorante-editor-copy";

export function RistoranteEditorSection() {
  const { landing, activeEditorTab, isAdmin, anchor, headingValues, gallery, applyHeading, applyItem } = useRistoranteEditor();
  if (!landing) return null;
  return <EditorLayout form={<>
    {activeEditorTab === "Hero" ? <HeroEditorPanel landing={landing} /> : null}
    {activeEditorTab === "Navegación" ? <NavEditorPanel activeLanding={landing} /> : null}
    {activeEditorTab === "SEO" ? <SeoEditorPanel activeLanding={landing} /> : null}
    {activeEditorTab === "Footer" ? <FooterEditorPanel activeLanding={landing} /> : null}
    {activeEditorTab === "Secciones" ? <SectionsEditorPanel activeLanding={landing} /> : null}
    {activeEditorTab === "Admin" && isAdmin ? <AdminEditorPanel activeLanding={landing} /> : null}
    {anchor ? <section className="space-y-6 py-unit-lg">
      <EditorSectionTitle title={activeEditorTab} description={activeEditorTab === "Carta" ? RISTORANTE_EDITOR_COPY.menuDescription : RISTORANTE_EDITOR_COPY.sectionDescription} />
      <RistoranteContentForm key={`${landing.id}-${anchor}`} values={headingValues} fields={activeEditorTab === "Compartir" ? ["title", "description"] : ["title", "subtitle"]} onApply={applyHeading} />
      {activeEditorTab === "Carta" ? landing.content.serviceMenu?.map((item) => <RistoranteMenuEditorItem key={item.id} item={item} onApply={applyItem} />) : gallery.map((item) => <RistoranteGalleryEditorItem key={item.id} item={item} monthly={activeEditorTab === "Especial"} onApply={applyItem} />)}
      {activeEditorTab === "Especial" ? landing.content.benefits?.map((item) => <RistoranteLabelEditorItem key={item.id} item={item} section="benefits" onApply={applyItem} />) : null}
    </section> : null}
    {activeEditorTab === "Horarios" ? <section className="space-y-6 py-unit-lg"><EditorSectionTitle title={RISTORANTE_EDITOR_COPY.hours} description={RISTORANTE_EDITOR_COPY.sectionDescription} />{landing.content.workflow?.map((item) => <RistoranteLabelEditorItem key={item.id} item={item} section="workflow" onApply={applyItem} />)}</section> : null}
  </>} />;
}
