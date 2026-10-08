import type { TemplateDefinition } from "@/lib/templates/types";
import { NAV_EDITOR_TAB, DESIGN_EDITOR_TAB, OFFERS_EDITOR_TAB, RESERVAS_EDITOR_TAB, BLOG_EDITOR_TAB, FOOTER_EDITOR_TAB, SEO_EDITOR_TAB, SECTIONS_EDITOR_TAB } from "@/lib/templates/editor-tabs";

export const FLORISTERIA_TEMPLATE: TemplateDefinition = {
  id: "floristeria",
  label: "Floristería",
  description: "Landing para floristerías: servicios florales, galería y pedidos.",
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
  "benefits",
  "faq",
],
  capabilities: { newsletter: false, booking: true },
  sections: [
  { anchor: "hero", label: "Hero", editorTabId: "Hero", required: true },
  { anchor: "story", label: "Historia", editorTabId: "Historia", navHref: "#story", contentKeys: ["story", "stats"] },
  { anchor: "servicios", label: "Servicios", editorTabId: "Servicios", navHref: "#servicios", contentKeys: ["serviceMenu"] },
  { anchor: "galeria", label: "Galería", editorTabId: "Galeria", navHref: "#galeria", contentKeys: ["gallery"] },
  { anchor: "testimonios", label: "Testimonios", navHref: "#testimonios", contentKeys: ["testimonials"] },
  { anchor: "faq", label: "FAQ", editorTabId: "FAQ", navHref: "#faq", contentKeys: ["faq"] },
  { anchor: "reservas", label: "Reservas", editorTabId: "Reservas", navHref: "#reservas" },
  { anchor: "contacto", label: "Pie de página", editorTabId: "Footer", navHref: "#contacto", required: true },
],
  headings: {
    servicios: {
      title: "¿Qué tienes en mente hoy?",
      subtitle:
        "Nuestra comunidad de creativos florales está lista para diseñar y entregar en mano arte floral significativo, arreglos hechos a medida para tus momentos especiales.",
    },
    galeria: {
      title: "Nuestras creaciones",
      subtitle: "",
    },
    faq: {
      title: "Preguntas frecuentes",
      subtitle: "Todo lo que necesitas saber sobre nuestros servicios florales.",
    },
    contacto: {
      title: "Haz tu pedido",
      subtitle: "Cuéntanos qué necesitas y crearemos el arreglo floral perfecto para ti.",
    },
    reservas: {
      title: "Reserva tu cita",
      subtitle: "Elige servicio, profesional y horario.",
    },
  },
  paletteOptions: [
    { id: "default", label: "Original", description: "Verde hoja y blanco cálido.", colorScheme: "light" },
    { id: "clay", label: "Arcilla", description: "Terracota, salvia y crema.", colorScheme: "light" },
    { id: "lavender", label: "Lavanda", description: "Ciruela suave y lavanda.", colorScheme: "light" },
  ],
  editorTabs: [
      { id: "Hero", label: "Hero" },
      NAV_EDITOR_TAB,
      DESIGN_EDITOR_TAB,
      { id: "Historia", label: "Historia" },
      { id: "Servicios", label: "Servicios" },
      { id: "Galeria", label: "Galería" },
      { id: "FAQ", label: "FAQ" },
      OFFERS_EDITOR_TAB,
      RESERVAS_EDITOR_TAB,
      BLOG_EDITOR_TAB,
      FOOTER_EDITOR_TAB,
      SEO_EDITOR_TAB,
      SECTIONS_EDITOR_TAB,
    ],
  loadImageOptions: () => import("@/lib/templates/floristeria/image-options").then((module) => module.FLORISTERIA_IMAGE_OPTIONS),
  loadContent: () => import("@/lib/templates/floristeria/content").then((module) => module.FLORISTERIA_DEFAULT_CONTENT),
  loadComponent: () => import("@/components/templates/floristeria/floristeria-template").then((module) => module.FloristeriaTemplate),
  loadEditor: () => import("@/components/dashboard/sections/floristeria-editor-section").then((module) => module.FloristeriaEditorSection),
};
