import type { TemplateDefinition } from "@/lib/templates/types";
import { NAV_EDITOR_TAB, DESIGN_EDITOR_TAB, OFFERS_EDITOR_TAB, RESERVAS_EDITOR_TAB, BLOG_EDITOR_TAB, FOOTER_EDITOR_TAB, SEO_EDITOR_TAB, SECTIONS_EDITOR_TAB } from "@/lib/templates/editor-tabs";

export const STUDIO_TEMPLATE: TemplateDefinition = {
  id: "studio",
  label: "Studio",
  description: "Landing para peluquerías y salones: servicios con precios, equipo, galería, FAQ y reservas.",
  retired: true,
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
  capabilities: { newsletter: false, booking: true },
  sections: [
  { anchor: "hero", label: "Hero", editorTabId: "Hero", required: true },
  { anchor: "story", label: "Historia", editorTabId: "Historia", navHref: "#story", contentKeys: ["story", "stats"] },
  { anchor: "servicios", label: "Servicios", editorTabId: "Servicios", navHref: "#servicios", contentKeys: ["serviceMenu"] },
  { anchor: "equipo", label: "Equipo", editorTabId: "Equipo", navHref: "#equipo", contentKeys: ["team"] },
  { anchor: "galeria", label: "Galería", editorTabId: "Galeria", navHref: "#galeria", contentKeys: ["gallery"] },
  { anchor: "testimonios", label: "Testimonios", navHref: "#testimonios", contentKeys: ["testimonials"] },
  { anchor: "faq", label: "FAQ", editorTabId: "FAQ", navHref: "#faq", contentKeys: ["faq"] },
  { anchor: "reservas", label: "Reservas", editorTabId: "Reservas", navHref: "#reservas" },
  { anchor: "contacto", label: "Pie de página", editorTabId: "Footer", navHref: "#contacto", required: true },
],
  headings: {
    galeria: {
      title: "Galería",
      subtitle: "",
    },
    servicios: {
      title: "Carta de servicios",
      subtitle: "",
    },
    equipo: {
      title: "Profesionales a tu servicio",
      subtitle: "",
    },
    faq: {
      title: "Resolvemos tus dudas",
      subtitle:
        "Todo lo que necesitas saber antes de tu visita. Si tienes alguna pregunta que no aparece aquí, escríbenos por WhatsApp.",
    },
    contacto: {
      title: "Reserva tu cita",
      subtitle:
        "Reserva tu próxima cita y déjate cuidar por nuestro equipo de profesionales.",
    },
    reservas: {
      title: "Reserva tu cita",
      subtitle: "Elige servicio, profesional y horario.",
    },
  },
  paletteOptions: [
    { id: "default", label: "Original", description: "Bronce suave y marfil.", colorScheme: "light" },
    { id: "smoked-rose", label: "Rosa humo", description: "Rosa profundo y porcelana.", colorScheme: "light" },
    { id: "sage", label: "Salvia", description: "Verde sereno y lino.", colorScheme: "light" },
  ],
  editorTabs: [
      { id: "Hero", label: "Hero" },
      NAV_EDITOR_TAB,
      DESIGN_EDITOR_TAB,
      { id: "Historia", label: "Historia" },
      { id: "Servicios", label: "Servicios" },
      { id: "Equipo", label: "Equipo" },
      { id: "Galeria", label: "Galería" },
      { id: "FAQ", label: "FAQ" },
      OFFERS_EDITOR_TAB,
      RESERVAS_EDITOR_TAB,
      BLOG_EDITOR_TAB,
      FOOTER_EDITOR_TAB,
      SEO_EDITOR_TAB,
      SECTIONS_EDITOR_TAB,
    ],
  loadImageOptions: () => import("@/lib/templates/studio/image-options").then((module) => module.STUDIO_IMAGE_OPTIONS),
  loadContent: () => import("@/lib/templates/studio/content").then((module) => module.STUDIO_DEFAULT_CONTENT),
  loadComponent: () => import("@/components/templates/studio/studio-template").then((module) => module.StudioTemplate),
  loadEditor: () => import("@/components/dashboard/sections/studio-editor-section").then((module) => module.StudioEditorSection),
};
