import { NUVOLETS_DEFAULT_CONFIG, NUVOLETS_HERO_IMAGE, NUVOLETS_SECTION_HEADINGS } from "@/lib/nuvolets-defaults";
import type { TemplateContentMap } from "@/lib/dashboard-data";
import { DEFAULT_LANDING_APPEARANCE } from "@/lib/templates/appearance-defaults";

export const NUVOLETS_DEFAULT_CONTENT: TemplateContentMap["nuvolets"] = {
  appearance: DEFAULT_LANDING_APPEARANCE,
  enabledPages: [],
  brand: "NUVOLETS",
  brandLogoType: "text",
  brandLogoImage: "",
  hero: { eyebrow: "NUEVA COLECCIÓN", title: "Ropita para sus pequeños grandes momentos", subtitle: "Prendas suaves, bonitas y cómodas para acompañarles mientras crecen. Más blanditas que una nube, y sin tormentas.", description: "", image: NUVOLETS_HERO_IMAGE, ctaLabel: "Ver colección" },
  nav: [{ id: "nav-home", label: "Inicio", href: "#hero" }, { id: "nav-collection", label: "Colección", href: "#coleccion" }, { id: "nav-baby", label: "Bebé", href: "#categorias" }, { id: "nav-girl", label: "Niña", href: "#categorias" }, { id: "nav-boy", label: "Niño", href: "#categorias" }, { id: "nav-store", label: "Tienda", href: "#tienda" }],
  sectionHeadings: NUVOLETS_SECTION_HEADINGS,
  contact: { phone: "", email: "", address: "Paiporta, Valencia", ctaLabel: "", copyrightSuffix: "", socialLinks: [{ platform: "instagram", url: NUVOLETS_DEFAULT_CONFIG.instagram.url }] },
  stats: [],
  testimonials: [],
  nuvolets: NUVOLETS_DEFAULT_CONFIG,
  gallery: [],
};
