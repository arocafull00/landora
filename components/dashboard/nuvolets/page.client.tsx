"use client";

import { EditorLayout } from "@/components/dashboard/editor-layout";
import { HeroEditorPanel } from "@/components/dashboard/hero-editor/hero-editor-panel";
import { AppearanceEditorPanel } from "@/components/dashboard/appearance/appearance-editor-panel";
import { NavEditorPanel } from "@/components/dashboard/nav-editor-panel";
import { SeoEditorPanel } from "@/components/dashboard/seo-editor-panel";
import { SectionsEditorPanel } from "@/components/dashboard/sections-editor-panel";
import { FooterEditorPanel } from "@/components/dashboard/footer-editor-panel";
import { AdminEditorPanel } from "@/components/dashboard/admin-editor-panel";
import { NuvoletsSettingsForm } from "./components/nuvolets-settings-form";
import { NuvoletsProductForm } from "./components/nuvolets-product-form";
import { useNuvoletsEditor } from "./hooks/use-nuvolets-editor";

export function NuvoletsEditorSection() {
  const { landing, config, tab, update, addProduct, isAdmin } = useNuvoletsEditor();
  if (!landing || !config) return null;
  return <EditorLayout form={<>
    {tab === "Hero" ? <HeroEditorPanel landing={landing} /> : null}
    {tab === "Diseño" ? <AppearanceEditorPanel landing={landing} /> : null}
    {tab === "Navegación" ? <NavEditorPanel activeLanding={landing} /> : null}
    {tab === "SEO" ? <SeoEditorPanel activeLanding={landing} /> : null}
    {tab === "Secciones" ? <SectionsEditorPanel activeLanding={landing} /> : null}
    {tab === "Footer" ? <FooterEditorPanel activeLanding={landing} /> : null}
    {tab === "Admin" && isAdmin ? <AdminEditorPanel activeLanding={landing} /> : null}
    {tab === "Productos" ? <NuvoletsProductForm products={config.products} onAdd={addProduct} /> : <NuvoletsSettingsForm key={`${landing.id}:${tab}`} config={config} tab={tab} onChange={update} />}
  </>} />;
}
