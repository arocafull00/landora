import type { TemplateDefinition } from "@/lib/templates/types";
import { NAV_EDITOR_TAB, DESIGN_EDITOR_TAB, OFFERS_EDITOR_TAB, RESERVAS_EDITOR_TAB, BLOG_EDITOR_TAB, FOOTER_EDITOR_TAB, SEO_EDITOR_TAB, SECTIONS_EDITOR_TAB } from "@/lib/templates/editor-tabs";

export const SIGNAL_TEMPLATE: TemplateDefinition = {
  id: "signal",
  label: "Signal",
  description: "Landing editorial de Adrián Rocafull: software a medida, automatización e inteligencia artificial para resolver problemas reales.",
  retired: false,
  contentVersion: 1,
  rendererVersion: 1,
  storageSections: [
  "hero",
  "branding",
  "nav",
  "testimonials",
  "cta",
  "serviceMenu",
  "benefits",
  "faq",
],
  capabilities: { newsletter: false, booking: true },
  sections: [
  { anchor: "hero", label: "Hero", editorTabId: "Hero", required: true },
  { anchor: "capacidades", label: "Casos", editorTabId: "Capacidades", navHref: "#capacidades", contentKeys: ["serviceMenu"] },
  { anchor: "indice", label: "Método", editorTabId: "Índice", navHref: "#indice", contentKeys: ["benefits"] },
  { anchor: "cta", label: "Sobre mí", editorTabId: "CTA", navHref: "#cta" },
  { anchor: "reservas", label: "Reservas", editorTabId: "Reservas", navHref: "#reservas" },
  { anchor: "contacto", label: "Pie de página", editorTabId: "Footer", navHref: "#contacto", required: true },
],
  headings: {
    capacidades: {
      title: "Software que ya está resolviendo problemas reales.",
      subtitle: "He trabajado desarrollando productos digitales, automatizaciones e integraciones para empresas de salud, tecnología, construcción y entretenimiento.",
    },
    indice: {
      title: "Cómo trabajo",
      subtitle: "No parto de una tecnología. Parto de un problema.",
    },
    cta: {
      title: "Sobre mí",
      subtitle: "¿Qué proceso de tu empresa te gustaría no volver a hacer manualmente?",
    },
    contacto: {
      title: "Cuéntame tu caso",
      subtitle: "Empecemos por el problema.",
    },
    reservas: {
      title: "Agenda una llamada",
      subtitle: "Reserva un espacio en el calendario.",
    },
  },
  paletteOptions: [
    { id: "default", label: "Original", description: "Tinta, papel cálido y señal lima.", colorScheme: "light" },
    { id: "graphite", label: "Grafito", description: "Carbón y ámbar técnico.", colorScheme: "light" },
    { id: "noir", label: "Noir", description: "Negro profundo y blanco frío.", colorScheme: "light" },
  ],
  editorTabs: [
      { id: "Hero", label: "Hero" },
      NAV_EDITOR_TAB,
      DESIGN_EDITOR_TAB,
      { id: "Capacidades", label: "Casos" },
      { id: "Índice", label: "Método" },
      { id: "CTA", label: "Cierre" },
      OFFERS_EDITOR_TAB,
      RESERVAS_EDITOR_TAB,
      BLOG_EDITOR_TAB,
      FOOTER_EDITOR_TAB,
      SEO_EDITOR_TAB,
      SECTIONS_EDITOR_TAB,
    ],
  loadImageOptions: () => import("@/lib/templates/signal/image-options").then((module) => module.SIGNAL_IMAGE_OPTIONS),
  loadContent: () => import("@/lib/templates/signal/content").then((module) => module.SIGNAL_DEFAULT_CONTENT),
  loadComponent: () => import("@/components/templates/signal/signal-template").then((module) => module.SignalTemplate),
  loadEditor: () => import("@/components/dashboard/sections/signal-editor-section").then((module) => module.SignalEditorSection),
};
