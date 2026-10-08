import type { TemplateContentMap } from "@/lib/dashboard-data";
import { DEFAULT_COPYRIGHT_SUFFIX } from "@/lib/copyright-constants";
import { OFICIO_PRO_ASSETS } from "@/lib/oficio-pro-assets";
import { DEFAULT_LANDING_APPEARANCE } from "@/lib/templates/appearance-defaults";
import { OFICIO_PRO_TEMPLATE } from "./definition";

export const OFICIO_PRO_DEFAULT_CONTENT: TemplateContentMap["oficio-pro"] = {
  appearance: DEFAULT_LANDING_APPEARANCE,
  enabledPages: [],
  brand: "Oficio Pro",
  brandLogoType: "text",
  brandLogoImage: "",
  hero: {
    eyebrow: "SERVICIO TÉCNICO PROFESIONAL",
    title: "Fontanería, electricidad, gas y climatización",
    subtitle: "Servicios técnicos para hogares y negocios",
    description:
      "Equipo especializado en urgencias, instalaciones y mantenimiento para viviendas, comunidades y locales. Atención clara, trabajo limpio y soluciones duraderas.",
    image: OFICIO_PRO_ASSETS.hero,
    ctaLabel: "Déjanos ayudarte",
  },
  nav: [
    { id: "nav-servicios", label: "Servicios", href: "#servicios" },
    { id: "nav-instalaciones", label: "Instalaciones", href: "#instalaciones" },
    { id: "nav-opiniones", label: "Opiniones", href: "#testimonios" },
    { id: "nav-experiencia", label: "Experiencia", href: "#experiencia" },
    { id: "nav-contacto", label: "Contacto", href: "#contacto" },
  ],
  sectionHeadings: OFICIO_PRO_TEMPLATE.headings,
  contact: {
    phone: "+34 600 00 00 00",
    email: "hola@oficiopro.es",
    address: "Servicio en ciudad y área metropolitana",
    ctaLabel: "Contactar por WhatsApp",
    copyrightSuffix: DEFAULT_COPYRIGHT_SUFFIX,
    socialLinks: [],
  },
  stats: [
    { id: "installations", value: "5.000+", label: "Instalaciones realizadas" },
    { id: "clients", value: "3.500+", label: "Clientes satisfechos" },
    { id: "projects", value: "7.000+", label: "Proyectos realizados" },
    { id: "repairs", value: "6.000+", label: "Reparaciones realizadas" },
  ],
  testimonials: [
    {
      id: "review-1",
      author: "Javier L.",
      date: "2026-02-12",
      rating: 5,
      comment:
        "Puntuales y muy profesionales. Revisaron la instalación, explicaron cada paso y dejaron todo funcionando a la primera.",
      verified: true,
    },
    {
      id: "review-2",
      author: "Ana P.",
      date: "2026-01-28",
      rating: 5,
      comment:
        "Servicio rápido, atento y muy limpio. Se adaptaron a mi horario y resolvieron la avería sin complicaciones.",
      verified: true,
    },
    {
      id: "review-3",
      author: "Esteban V.",
      date: "2025-12-18",
      rating: 5,
      comment: "Muy buenos profesionales. Repetiría sin dudarlo, muy recomendables.",
      verified: true,
    },
    {
      id: "review-4",
      author: "Marisa M.",
      date: "2025-11-09",
      rating: 5,
      comment:
        "Atendieron una incidencia en la comunidad y quedó resuelta de forma rápida y satisfactoria.",
      verified: true,
    },
    {
      id: "review-5",
      author: "Jesús S.",
      date: "2025-10-22",
      rating: 5,
      comment: "Buen servicio, responsables y claros con el presupuesto.",
      verified: true,
    },
  ],
  about: {
    statement:
      "Trabajamos con una combinación de oficio, diagnóstico técnico y comunicación directa. Cada intervención se planifica para resolver el problema de raíz y evitar visitas innecesarias.",
  },
  gallery: [
    { id: "gas-1", image: OFICIO_PRO_ASSETS.gas1, title: "Servicio técnico 1", tags: ["servicios"] },
    { id: "gas-2", image: OFICIO_PRO_ASSETS.gas2, title: "Servicio técnico 2", tags: ["servicios"] },
    { id: "gas-3", image: OFICIO_PRO_ASSETS.gas3, title: "Servicio técnico 3", tags: ["servicios"] },
    { id: "energy-1", image: OFICIO_PRO_ASSETS.thermal1, title: "Instalación 1", tags: ["instalaciones"] },
    { id: "energy-2", image: OFICIO_PRO_ASSETS.thermal2, title: "Instalación 2", tags: ["instalaciones"] },
    { id: "energy-3", image: OFICIO_PRO_ASSETS.thermal3, title: "Instalación 3", tags: ["instalaciones"] },
  ],
  team: [],
  benefits: [],
  faq: [],
  serviceMenu: [
    {
      id: "service-1",
      category: "Servicios",
      name: "Fontanería y reparación de averías",
      description:
        "Reparación de fugas, sustitución de grifería, sanitarios, bombas de agua y sistemas de presión.",
      price: "Diagnóstico y presupuesto",
      duration: "",
    },
    {
      id: "service-2",
      category: "Servicios",
      name: "Gas y revisiones periódicas",
      description:
        "Instalaciones, controles obligatorios y reparación de fugas en viviendas, comunidades y negocios.",
      price: "Servicio certificado",
      duration: "",
    },
    {
      id: "service-3",
      category: "Servicios",
      name: "Electricidad y mantenimiento",
      description:
        "Cuadros eléctricos, puntos de luz, incidencias, pequeñas instalaciones y mantenimiento preventivo.",
      price: "Atención flexible",
      duration: "",
    },
    {
      id: "service-4",
      category: "Instalaciones",
      name: "Climatización y agua caliente",
      description:
        "Instalación y mantenimiento de equipos térmicos, aerotermia, calderas y sistemas de agua caliente.",
      price: "A medida",
      duration: "",
    },
    {
      id: "service-5",
      category: "Instalaciones",
      name: "Energía y eficiencia",
      description:
        "Soluciones para mejorar consumo, rendimiento y control de instalaciones en comunidades y empresas.",
      price: "Estudio técnico",
      duration: "",
    },
    {
      id: "service-6",
      category: "Instalaciones",
      name: "Telegestión y seguimiento",
      description:
        "Monitorización de instalaciones, informes periódicos y propuestas de mejora para reducir incidencias.",
      price: "Plan trimestral",
      duration: "",
    },
  ],
};
