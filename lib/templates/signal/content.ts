import type { TemplateContentMap } from "@/lib/dashboard-data";
import { DEFAULT_COPYRIGHT_SUFFIX } from "@/lib/copyright-constants";
import { SIGNAL_ASSETS } from "@/lib/signal-assets";
import { DEFAULT_LANDING_APPEARANCE } from "@/lib/templates/appearance-defaults";
import { SIGNAL_TEMPLATE } from "./definition";

export const SIGNAL_DEFAULT_CONTENT: TemplateContentMap["signal"] = {
  appearance: DEFAULT_LANDING_APPEARANCE,
  enabledPages: [],
  sectionOrder: ["capacidades", "indice", "cta"],
  brand: "Adrián Rocafull",
  brandLogoType: "text",
  brandLogoImage: "",
  hero: {
    eyebrow: "",
    title: "Software a medida para que tu empresa trabaje mejor.",
    subtitle: "",
    description:
      "Detectamos procesos lentos, repetitivos o manuales y los convertimos en software, automatizaciones y soluciones con IA diseñadas alrededor de tu negocio.",
    image: SIGNAL_ASSETS.hero,
    ctaLabel: "Cuéntame cómo trabajáis",
  },
  nav: [
    { id: "nav-capacidades", label: "Casos", href: "#capacidades" },
    { id: "nav-indice", label: "Método", href: "#indice" },
    { id: "nav-contacto", label: "Contacto", href: "#contacto" },
  ],
  sectionHeadings: {
    ...SIGNAL_TEMPLATE.headings,
    capacidades: { title: "Elimina las tareas repetitivas y aumenta la productividad", subtitle: "He trabajado desarrollando productos digitales, automatizaciones e integraciones para empresas de salud, tecnología, construcción y entretenimiento." },
    indice: { title: "Cómo trabajo", subtitle: "No parto de una tecnología. Parto de un problema." },
    cta: { title: "Sobre mí", subtitle: "¿Qué proceso de tu empresa te gustaría no volver a hacer manualmente?" },
    contacto: { title: "Cuéntame tu caso", subtitle: "No necesitas tener definida la solución. Empecemos por el problema." },
  },
  contact: {
    phone: "",
    email: "adrianrocafull1@gmail.com",
    address: "Valencia, España",
    ctaLabel: "Escríbeme",
    copyrightSuffix: DEFAULT_COPYRIGHT_SUFFIX,
    socialLinks: [],
  },
  stats: [],
  testimonials: [],
  about: {
    statement: "AHORA QUIERO\nHACER ESTO\nCON MÁS EMPRESAS.",
  },
  gallery: [
    { id: "signal-docmorris", linkType: "internal", projectSlug: "docmorris", image: "/templates/signal/hero-statue.png", title: "DocMorris", description: "IA integrada en una plataforma de salud digital", projectBody: "Desarrollo e integración de funcionalidades basadas en inteligencia artificial dentro de aplicaciones web y móvil, incluyendo la conexión con servicios externos y nuevos flujos dentro del producto.", tags: ["IA · Integraciones · Web · Mobile"] },
    { id: "signal-flumotion", linkType: "internal", projectSlug: "flumotion", image: "", title: "Flumotion", description: "Plataforma OTT para distribución de contenido", projectBody: "Desarrollo de una plataforma OTT para consumir y gestionar contenido audiovisual, trabajando sobre un producto preparado para usuarios reales y múltiples dispositivos.", tags: ["Streaming · Web · Producto digital"] },
    { id: "signal-21dias-informes", linkType: "internal", projectSlug: "21-dias-informes", image: "", title: "Clínica de psicología 21 días", description: "De 25 horas de trabajo a aproximadamente 1", projectBody: "Automatización del proceso de elaboración de informes clínicos. Los profesionales introducen los resultados de las evaluaciones y el sistema procesa la información y genera el informe.", tags: ["Automatización · Salud · Software a medida", "25h → ~1h"] },
    { id: "signal-21dias-seguimiento", linkType: "internal", projectSlug: "21-dias-diariamente", image: "/templates/signal/hero-texture.png", title: "Clínica de psicología 21 días", description: "Seguimiento del estado emocional entre paciente y profesional", projectBody: "Aplicación para que los pacientes registren periódicamente cómo se encuentran y los profesionales puedan seguir su evolución desde una única plataforma.", tags: ["HealthTech · Web App · Seguimiento", "Diariamente"] },
    { id: "signal-circulantis-licitaciones", linkType: "internal", projectSlug: "circulantis-licitaciones", image: "/templates/signal/hero-flowers-front.png", title: "Circulantis", description: "Encontrar automáticamente las licitaciones relevantes", projectBody: "Sistema que recopila nuevas licitaciones públicas, extrae su información y filtra aquellas que pueden resultar interesantes para la empresa.", tags: ["Automatización · Datos · Integraciones"] },
    { id: "signal-circulantis-viabilidad", linkType: "internal", projectSlug: "circulantis-viabilidad", image: "/templates/signal/hero-flowers-back.png", title: "Circulantis", description: "Análisis de viabilidad de licitaciones", projectBody: "Herramienta interna en la que el equipo carga la documentación de una licitación y obtiene un análisis estructurado de su viabilidad según los criterios definidos por la empresa.", tags: ["IA · Análisis documental · Software interno"] },
  ],
  team: [{ id: "team-1", name: "Adrián Rocafull", role: "Software · Automatización · IA", bio: "Soy desarrollador de software especializado en crear productos digitales, automatizaciones y soluciones basadas en inteligencia artificial. Me interesa utilizar tecnología para resolver problemas concretos de negocio.", image: "" }],
  serviceMenu: [
    {
      id: "sm-1",
      category: "POSIBILIDAD",
      name: "AUTOMATIZACIÓN",
      description: "Procesos que hoy consumen horas de trabajo manual.",
      price: "",
      duration: "",
    },
    {
      id: "sm-2",
      category: "POSIBILIDAD",
      name: "INTELIGENCIA ARTIFICIAL",
      description: "IA aplicada a una necesidad concreta del negocio.",
      price: "",
      duration: "",
    },
    {
      id: "sm-3",
      category: "POSIBILIDAD",
      name: "HERRAMIENTAS INTERNAS",
      description: "Herramientas que hoy viven en hojas de cálculo o sistemas dispersos.",
      price: "",
      duration: "",
    },
    { id: "sm-4", category: "POSIBILIDAD", name: "WEB Y APPS", description: "Productos digitales que resuelven un problema real.", price: "", duration: "" },
    { id: "sm-5", category: "POSIBILIDAD", name: "INTEGRACIONES", description: "Sistemas que necesitan comunicarse sin tareas intermedias.", price: "", duration: "" },
    { id: "sm-6", category: "POSIBILIDAD", name: "ANÁLISIS DOCUMENTAL", description: "Información compleja convertida en decisiones útiles.", price: "", duration: "" },
  ],
  benefits: [
    { id: "b1", title: "01 — ENTIENDO", description: "Veo cómo trabajáis realmente.", icon: "" },
    { id: "b2", title: "02 — DETECTO", description: "Identifico tareas repetitivas y cuellos de botella.", icon: "" },
    { id: "b3", title: "03 — PROPONGO", description: "Ordeno soluciones por impacto, complejidad y coste.", icon: "" },
    { id: "b4", title: "04 — CONSTRUYO", description: "Diseño y desarrollo la solución que merece la pena.", icon: "" },
  ],
  faq: [],
};
