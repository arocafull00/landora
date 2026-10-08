import type { TemplateDefinition } from "@/lib/templates/types";
import { CONTACT_EDITOR_TAB, FOOTER_EDITOR_TAB, SEO_EDITOR_TAB, SECTIONS_EDITOR_TAB } from "@/lib/templates/editor-tabs";

export const PALLET_ROSS_TEMPLATE: TemplateDefinition = {
  id: "pallet-ross",
  label: "Pallet Ross",
  description: "Landing scroll-driven para marketplace de arte: animación de cards, e-commerce y banner de clase.",
  retired: false,
  contentVersion: 1,
  rendererVersion: 1,
  storageSections: [
  "hero",
  "branding",
  "story",
  "stats",
  "gallery",
  "nav",
  "testimonials",
  "cta",
  "team",
  "serviceMenu",
  "benefits",
  "faq",
],
  capabilities: { newsletter: false, booking: false },
  sections: [
  { anchor: "hero", label: "Hero", required: true },
  { anchor: "ecommerce", label: "E-Commerce", navHref: "#ecommerce" },
  { anchor: "class", label: "Class", navHref: "#class" },
  { anchor: "contacto", label: "Pie de página", editorTabId: "Footer", navHref: "#contacto", required: true },
],
  headings: {
    contacto: {
      title: "Get in touch",
      subtitle: "Join the artist marketplace.",
    },
  },
  paletteOptions: [
    { id: "default", label: "Original", description: "Off-white, teal y rojo editorial.", colorScheme: "light" },
  ],
  editorTabs: [
      CONTACT_EDITOR_TAB,
      FOOTER_EDITOR_TAB,
      SEO_EDITOR_TAB,
      SECTIONS_EDITOR_TAB,
    ],
  loadImageOptions: () => import("@/lib/templates/pallet-ross/image-options").then((module) => module.PALLET_ROSS_IMAGE_OPTIONS),
  loadContent: () => import("@/lib/templates/pallet-ross/content").then((module) => module.PALLET_ROSS_DEFAULT_CONTENT),
  loadComponent: () => import("@/components/templates/pallet-ross/pallet-ross-template").then((module) => module.PalletRossTemplate),
  loadEditor: () => import("@/components/dashboard/sections/velar-editor-section").then((module) => module.VelarEditorSection),
};
