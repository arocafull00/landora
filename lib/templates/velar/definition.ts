import type { TemplateDefinition } from "@/lib/templates/types";
import { NAV_EDITOR_TAB, DESIGN_EDITOR_TAB, OFFERS_EDITOR_TAB, RESERVAS_EDITOR_TAB, CONTACT_EDITOR_TAB, BLOG_EDITOR_TAB, FOOTER_EDITOR_TAB, SEO_EDITOR_TAB, SECTIONS_EDITOR_TAB } from "@/lib/templates/editor-tabs";

export const VELAR_TEMPLATE: TemplateDefinition = {
  id: "velar",
  label: "Velar",
  description: "Landing para espacios de eventos: hero, estadísticas, salas, servicios, workflow y testimonios.",
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
  "spaces",
  "services",
  "workflow",
  "testimonials",
  "cta",
],
  capabilities: { newsletter: false, booking: true },
  sections: [
  { anchor: "hero", label: "Hero", editorTabId: "Hero", required: true },
  { anchor: "story", label: "Historia", editorTabId: "Historia", navHref: "#historia", contentKeys: ["story", "stats"] },
  { anchor: "listings", label: "Galería", editorTabId: "Galería", navHref: "#galeria", contentKeys: ["gallery"] },
  { anchor: "residences", label: "Espacios", editorTabId: "Espacios", navHref: "#espacios", contentKeys: ["spaces"] },
  { anchor: "servicios", label: "Servicios", editorTabId: "Servicios", navHref: "#servicios", contentKeys: ["services"] },
  { anchor: "proceso", label: "Proceso", editorTabId: "Proceso", navHref: "#proceso", contentKeys: ["workflow"] },
  { anchor: "testimonios", label: "Testimonios", editorTabId: "Testimonios", navHref: "#testimonios", contentKeys: ["testimonials"] },
  { anchor: "reservas", label: "Reservas", editorTabId: "Reservas", navHref: "#reservas" },
  { anchor: "inquire", label: "Pie de página", editorTabId: "Footer", navHref: "#contacto", required: true },
],
  headings: {
    inquire: {
      title: "Contacto:",
      subtitle: "",
    },
    residences: {
      title: "Nuestros Jardines, el escenario perfecto para tus eventos",
      subtitle:
        "En Toll Story ofrecemos tres espacios exclusivos en Valencia y área metropolitana, cada uno con un estilo único para bodas, comuniones, celebraciones familiares y eventos de empresa. Disfruta de espacios especiales para hacer de tus celebraciones algo inolvidable.",
    },
    servicios: {
      title: "Todo lo que necesitas para tu evento, en un solo lugar",
      subtitle: "Al elegir Toll Story para tu evento en Valencia, contarás con:",
    },
    proceso: {
      title: "Nuestra forma de ayudarte a celebrar",
      subtitle:
        "Hacemos que la organización de tu evento sea sencilla y elegante. Nuestro equipo estará contigo en cada paso para asegurarse de que todo salga perfecto.",
    },
    testimonios: {
      title: "Lo que nuestros clientes dicen de nosotros",
      subtitle: "",
    },
    reservas: {
      title: "Reserva tu visita",
      subtitle: "Elige servicio, profesional y horario.",
    },
  },
  paletteOptions: [
    { id: "default", label: "Original", description: "Verde mineral y arena.", colorScheme: "light" },
    { id: "terracotta", label: "Terracota", description: "Arcilla cálida y crema.", colorScheme: "light" },
    { id: "slate", label: "Pizarra", description: "Azul grisáceo y piedra.", colorScheme: "light" },
  ],
  editorTabs: [
      { id: "Hero", label: "Hero" },
      NAV_EDITOR_TAB,
      DESIGN_EDITOR_TAB,
      { id: "Historia", label: "Historia" },
      { id: "Galería", label: "Galería" },
      { id: "Espacios", label: "Espacios" },
      { id: "Servicios", label: "Servicios" },
      { id: "Proceso", label: "Proceso" },
      { id: "Testimonios", label: "Testimonios" },
      OFFERS_EDITOR_TAB,
      RESERVAS_EDITOR_TAB,
      CONTACT_EDITOR_TAB,
      BLOG_EDITOR_TAB,
      FOOTER_EDITOR_TAB,
      SEO_EDITOR_TAB,
      SECTIONS_EDITOR_TAB,
    ],
  loadImageOptions: () => import("@/lib/templates/velar/image-options").then((module) => module.VELAR_IMAGE_OPTIONS),
  loadContent: () => import("@/lib/templates/velar/content").then((module) => module.VELAR_DEFAULT_CONTENT),
  loadComponent: () => import("@/components/templates/velar/velar-template").then((module) => module.VelarTemplate),
  loadEditor: () => import("@/components/dashboard/sections/velar-editor-section").then((module) => module.VelarEditorSection),
};
