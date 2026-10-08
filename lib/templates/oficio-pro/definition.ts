import type { TemplateDefinition } from "@/lib/templates/types";
import { NAV_EDITOR_TAB, DESIGN_EDITOR_TAB, OFFERS_EDITOR_TAB, RESERVAS_EDITOR_TAB, BLOG_EDITOR_TAB, FOOTER_EDITOR_TAB, SEO_EDITOR_TAB, SECTIONS_EDITOR_TAB } from "@/lib/templates/editor-tabs";

export const OFICIO_PRO_TEMPLATE: TemplateDefinition = {
  id: "oficio-pro",
  label: "Oficio Pro",
  description: "Landing para fontaneros, electricistas y servicios técnicos: urgencias, instalaciones, reseñas y contacto.",
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
  "serviceMenu",
],
  capabilities: { newsletter: false, booking: true },
  sections: [
  { anchor: "hero", label: "Hero", editorTabId: "Hero", required: true },
  { anchor: "servicios", label: "Servicios", editorTabId: "Servicios", navHref: "#servicios" },
  { anchor: "instalaciones", label: "Instalaciones", editorTabId: "Instalaciones", navHref: "#instalaciones" },
  { anchor: "testimonios", label: "Testimonios", editorTabId: "Testimonios", navHref: "#testimonios", contentKeys: ["testimonials"] },
  { anchor: "experiencia", label: "Experiencia", editorTabId: "Experiencia", navHref: "#experiencia", contentKeys: ["stats", "story"] },
  { anchor: "reservas", label: "Reservas", editorTabId: "Reservas", navHref: "#reservas" },
  { anchor: "contacto", label: "Pie de página", editorTabId: "Footer", navHref: "#contacto", required: true },
],
  headings: {
    servicios: {
      title: "Servicios técnicos para hogares y negocios",
      subtitle:
        "Intervenciones rápidas, instalaciones completas y mantenimiento preventivo con un equipo preparado para resolver incidencias reales.",
    },
    instalaciones: {
      title: "Instalaciones eficientes y mantenimiento técnico",
      subtitle:
        "Soluciones de climatización, energía, agua caliente y sistemas técnicos para comunidades, locales y viviendas.",
    },
    testimonios: {
      title: "Opiniones de clientes",
      subtitle:
        "Experiencias reales de clientes que confían en nuestro equipo para trabajos urgentes, instalaciones y mantenimiento.",
    },
    experiencia: {
      title: "Más de 30 años de experiencia nos avalan",
      subtitle:
        "Solucionando problemas técnicos en viviendas, comunidades y negocios con precisión, limpieza y seguimiento profesional.",
    },
    contacto: {
      title: "Contáctanos",
      subtitle: "Déjanos tu aviso y te responderemos lo antes posible.",
    },
    reservas: {
      title: "Solicita una visita",
      subtitle: "Reserva una cita con nuestro equipo.",
    },
  },
  paletteOptions: [
    { id: "default", label: "Original", description: "Azul técnico y ámbar.", colorScheme: "light" },
    { id: "industrial", label: "Industrial", description: "Azul acero y naranja.", colorScheme: "light" },
    { id: "graphite", label: "Grafito", description: "Carbón y amarillo señal.", colorScheme: "light" },
  ],
  editorTabs: [
      { id: "Hero", label: "Hero" },
      NAV_EDITOR_TAB,
      DESIGN_EDITOR_TAB,
      { id: "Servicios", label: "Servicios" },
      { id: "Instalaciones", label: "Instalaciones" },
      { id: "Testimonios", label: "Testimonios" },
      { id: "Experiencia", label: "Experiencia" },
      OFFERS_EDITOR_TAB,
      RESERVAS_EDITOR_TAB,
      BLOG_EDITOR_TAB,
      FOOTER_EDITOR_TAB,
      SEO_EDITOR_TAB,
      SECTIONS_EDITOR_TAB,
    ],
  loadImageOptions: () => import("@/lib/templates/oficio-pro/image-options").then((module) => module.OFICIO_PRO_IMAGE_OPTIONS),
  loadContent: () => import("@/lib/templates/oficio-pro/content").then((module) => module.OFICIO_PRO_DEFAULT_CONTENT),
  loadComponent: () => import("@/components/templates/oficio-pro/oficio-pro-template").then((module) => module.OficioProTemplate),
  loadEditor: () => import("@/components/dashboard/sections/oficio-pro-editor-section").then((module) => module.OficioProEditorSection),
};
