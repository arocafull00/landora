"use client";

import dynamic from "next/dynamic";
import { AppearanceEditorLoadingSkeleton } from "@/components/dashboard/appearance/components/appearance-editor-loading-skeleton";
import { EditorLayout } from "@/components/dashboard/editor-layout";
import { HeroEditorPanel } from "@/components/dashboard/hero-editor/hero-editor-panel";
import { NavEditorPanel } from "@/components/dashboard/nav-editor-panel";
import { SeoEditorPanel } from "@/components/dashboard/seo-editor-panel";
import { SectionsEditorPanel } from "@/components/dashboard/sections-editor-panel";
import { FooterEditorPanel } from "@/components/dashboard/footer-editor-panel";
import { AdminEditorPanel } from "@/components/dashboard/admin-editor-panel";
import { NuvoletsSettingsForm } from "./components/nuvolets-settings-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useNuvoletsEditor } from "./hooks/use-nuvolets-editor";

const AppearanceEditorPanel = dynamic(
  () => import("@/components/dashboard/appearance/appearance-editor-panel").then(
    (module) => module.AppearanceEditorPanel,
  ),
  { loading: AppearanceEditorLoadingSkeleton },
);

export function NuvoletsEditorSection() {
  const { landing, config, tab, update, isAdmin, productsModuleEnabled } = useNuvoletsEditor();
  if (!landing || !config) return null;
  return <EditorLayout form={<>
    {productsModuleEnabled ? <Button asChild variant="outline"><Link href="/products">Gestionar productos</Link></Button> : null}
    {tab === "Hero" ? <HeroEditorPanel landing={landing} /> : null}
    {tab === "Diseño" ? <AppearanceEditorPanel landing={landing} /> : null}
    {tab === "Navegación" ? <NavEditorPanel activeLanding={landing} /> : null}
    {tab === "SEO" ? <SeoEditorPanel activeLanding={landing} /> : null}
    {tab === "Secciones" ? <SectionsEditorPanel activeLanding={landing} /> : null}
    {tab === "Footer" ? <FooterEditorPanel activeLanding={landing} /> : null}
    {tab === "Admin" && isAdmin ? <AdminEditorPanel activeLanding={landing} /> : null}
    <NuvoletsSettingsForm key={`${landing.id}:${tab}`} config={config} tab={tab} onChange={update} />
  </>} />;
}
