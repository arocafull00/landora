import type { TemplateContentMap } from "@/lib/dashboard-data";
import { DEFAULT_COPYRIGHT_SUFFIX } from "@/lib/copyright-constants";
import { PORTFOLIO_ASSETS } from "@/lib/portfolio-assets";
import { DEFAULT_LANDING_APPEARANCE } from "@/lib/templates/appearance-defaults";
import { PORTFOLIO_TEMPLATE } from "./definition";

export const PORTFOLIO_DEFAULT_CONTENT: TemplateContentMap["portfolio"] = {
  appearance: DEFAULT_LANDING_APPEARANCE,
  enabledPages: [],
  brand: "Mora.",
  brandLogoType: "text",
  brandLogoImage: "",
  hero: {
    eyebrow: "DISEÑADORA & DIRECTORA CREATIVA",
    title: "Elena Mora",
    subtitle: "Diseño experiencias digitales que conectan marcas con personas.",
    description: "Portfolio de diseño y dirección creativa en Barcelona.",
    image: PORTFOLIO_ASSETS.hero,
    houseImage: PORTFOLIO_ASSETS.project1,
    ctaLabel: "Ver proyectos",
  },
  nav: [
    { id: "nav-experiencia", label: "Experiencia", href: "#experiencia" },
    { id: "nav-proyectos", label: "Proyectos", href: "#proyectos" },
    { id: "nav-servicios", label: "Servicios", href: "#servicios" },
    { id: "nav-testimonios", label: "Testimonios", href: "#testimonios" },
    { id: "nav-contacto", label: "Contacto", href: "#contacto" },
  ],
  sectionHeadings: PORTFOLIO_TEMPLATE.headings,
  contact: {
    phone: "+34 612 34 56 78",
    email: "hola@elenamora.design",
    address: "Barcelona, España",
    ctaLabel: "Contactar por WhatsApp",
    copyrightSuffix: DEFAULT_COPYRIGHT_SUFFIX,
    socialLinks: [],
  },
  stats: [],
  testimonials: [
    {
      id: "review-1",
      author: "Carlos Mendoza",
      date: "2025-03-10",
      rating: 5,
      comment: "Elena transformó nuestra identidad de marca por completo. Su visión estratégica y atención al detalle son excepcionales. El resultado superó todas nuestras expectativas.",
      verified: true,
    },
    {
      id: "review-2",
      author: "Laura Fernández",
      date: "2025-02-15",
      rating: 5,
      comment: "Trabajar con Elena fue una experiencia increíble. Entiende perfectamente las necesidades del negocio y las traduce en diseño de forma magistral.",
      verified: true,
    },
    {
      id: "review-3",
      author: "Miguel Torres",
      date: "2025-01-20",
      rating: 5,
      comment: "Profesional, creativa y muy comprometida con cada proyecto. Nuestra web ha pasado de ser invisible a generar conversiones reales.",
      verified: true,
    },
  ],
  about: {
    statement: "Diseño con propósito. Cada proyecto es una oportunidad para crear algo que no solo se vea bien, sino que funcione, comunique y genere resultados medibles.",
  },
  aboutPage: {
    title: "Diseño para conectar ideas con personas",
    intro:
      "Soy Elena Mora, diseñadora y directora creativa. Combino estrategia, narrativa y tecnología para construir experiencias digitales con una identidad clara y resultados medibles.",
    image: PORTFOLIO_ASSETS.hero,
    storyTitle: "Mi historia",
    storyBody:
      "Empecé diseñando identidades para pequeños proyectos culturales y descubrí que lo que más me interesaba no era una pieza aislada, sino todo el sistema que la hacía reconocible.\n\nDesde entonces he trabajado entre marca, producto y dirección creativa, colaborando con equipos que buscan transformar ideas complejas en experiencias sencillas, útiles y memorables.",
    storyImage: PORTFOLIO_ASSETS.project1,
  },
  gallery: [
    { id: "p1", image: PORTFOLIO_ASSETS.project1, title: "Identidad de marca – Nómada Studio", description: "Logotipo, sistema tipográfico y guía de estilo para estudio de arquitectura.", tags: ["Branding", "Figma"] },
    { id: "p2", image: PORTFOLIO_ASSETS.project2, title: "Web corporativa – Arruga Legal", description: "Diseño y desarrollo de landing page orientada a conversión.", tags: ["Web", "Next.js"] },
    { id: "p3", image: PORTFOLIO_ASSETS.project3, title: "Campaña digital – Vinesa", description: "Dirección creativa y piezas gráficas para lanzamiento de producto.", tags: ["Campaña", "Ilustración"] },
    { id: "p4", image: PORTFOLIO_ASSETS.project4, title: "App móvil – Refuel", description: "UI/UX para aplicación de hábitos saludables en iOS y Android.", tags: ["UI/UX", "React Native"] },
    { id: "p5", image: PORTFOLIO_ASSETS.project5, title: "Packaging – Alma Cosmetics", description: "Diseño de envase y material impreso para línea de cosmética natural.", tags: ["Packaging", "Print"] },
    { id: "p6", image: PORTFOLIO_ASSETS.project6, title: "Dashboard – Kairos Analytics", description: "Sistema de visualización de datos para plataforma B2B SaaS.", tags: ["Dashboard", "Tailwind"] },
  ],
  serviceMenu: [
    { id: "sm-1", category: "Branding", name: "Identidad de marca", description: "Logo, paleta, tipografía y guía de estilo completa", price: "Desde 2.500€" },
    { id: "sm-2", category: "Branding", name: "Rebranding", description: "Evolución y modernización de marca existente", price: "Desde 1.800€" },
    { id: "sm-3", category: "Web", name: "Diseño web", description: "Diseño UI/UX completo para sitios web", price: "Desde 3.000€" },
    { id: "sm-4", category: "Web", name: "Landing page", description: "Página de aterrizaje optimizada para conversión", price: "Desde 1.200€" },
    { id: "sm-5", category: "Dirección creativa", name: "Consultoría estratégica", description: "Auditoría y dirección de marca", price: "Desde 800€" },
    { id: "sm-6", category: "Dirección creativa", name: "Dirección de proyecto", description: "Gestión creativa de campañas y lanzamientos", price: "A consultar" },
  ],
  benefits: [
    { id: "b1", title: "Diseño estratégico", description: "Cada decisión visual responde a un objetivo de negocio", icon: "target" },
    { id: "b2", title: "Proceso colaborativo", description: "Trabajo en estrecha colaboración con cada cliente", icon: "users" },
    { id: "b3", title: "Resultados medibles", description: "Diseño orientado a métricas y conversiones", icon: "trending-up" },
    { id: "b4", title: "Entrega puntual", description: "Cumplimiento riguroso de plazos y presupuestos", icon: "clock" },
  ],
  workHistory: [
    {
      id: "wh-1",
      dateRange: "Septiembre 2025 — Presente",
      location: "Remoto",
      company: "DocMorris",
      title: "Full Stack Developer",
      summary: "Farmacia online líder en Alemania con millones de usuarios activos.",
      highlights: [
        "Desarrollo de aplicaciones móviles con React Native para el canal B2C.",
        "Implementación de nuevas funcionalidades en la plataforma web con Next.js.",
        "Diseño e integración de APIs GraphQL y microservicios en Kubernetes.",
        "Colaboración con equipos de producto, QA y DevOps en entornos ágiles.",
      ],
      technologies: ["REACT NATIVE", "NEXT.JS", "NODE.JS", "AI", "KUBERNETES", "GRAPHQL", "TYPESCRIPT", "AWS"],
    },
    {
      id: "wh-2",
      dateRange: "Enero 2024 — Agosto 2025",
      location: "Valencia, España",
      company: "Zity",
      title: "Senior Frontend Developer",
      summary: "Plataforma de movilidad urbana y servicios digitales para ciudades inteligentes.",
      highlights: [
        "Migración progresiva de aplicaciones legacy a una arquitectura basada en React.",
        "Optimización de rendimiento y accesibilidad en interfaces de alto tráfico.",
        "Mentoría técnica del equipo frontend y definición de estándares de código.",
      ],
      technologies: ["REACT", "TYPESCRIPT", "NEXT.JS", "TAILWIND", "CI/CD"],
    },
    {
      id: "wh-3",
      dateRange: "Marzo 2021 — Diciembre 2023",
      location: "Barcelona, España",
      company: "Studio Forma",
      title: "Product Designer",
      summary: "Estudio de diseño digital especializado en productos SaaS y e-commerce.",
      highlights: [
        "Diseño de sistemas de diseño escalables para múltiples productos digitales.",
        "Investigación de usuarios y prototipado de flujos de conversión.",
        "Colaboración directa con equipos de desarrollo en la implementación de UI.",
      ],
      technologies: ["FIGMA", "DESIGN SYSTEMS", "UX RESEARCH", "PROTOTYPING"],
    },
  ],
  faq: [
    { id: "faq-1", question: "¿Cuál es tu proceso de trabajo?", answer: "Comienzo con una fase de descubrimiento donde investigo tu negocio, audiencia y competencia. Luego paso a la fase de diseño con propuestas iterativas, y finalizo con la entrega de archivos y guía de implementación." },
    { id: "faq-2", question: "¿Cuánto tiempo tarda un proyecto?", answer: "Depende del alcance: una identidad de marca completa suele tomar 4-6 semanas, un diseño web 6-8 semanas, y una landing page 2-3 semanas." },
    { id: "faq-3", question: "¿Trabajas con clientes internacionales?", answer: "Sí, trabajo con clientes de toda Europa y Latinoamérica. Las reuniones se hacen por videollamada y la comunicación es fluida independientemente de la zona horaria." },
    { id: "faq-4", question: "¿Qué incluye la entrega final?", answer: "Archivos fuente editables, guía de marca en PDF, assets optimizados para web y print, y una sesión de handoff para tu equipo de desarrollo." },
    { id: "faq-5", question: "¿Ofreces soporte post-entrega?", answer: "Sí, incluyo 30 días de soporte gratuito después de la entrega para resolver dudas y hacer ajustes menores sin coste adicional." },
  ],
};
