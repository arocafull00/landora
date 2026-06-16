import type { TemplateContentMap, TemplateId } from "@/lib/dashboard-data";
import { DEFAULT_COPYRIGHT_SUFFIX } from "@/lib/copyright-constants";
import { SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { VELAR_ASSETS } from "@/lib/velar-assets";
import { STUDIO_ASSETS } from "@/lib/studio-assets";
import { PORTFOLIO_ASSETS } from "@/lib/portfolio-assets";
import { RISTORANTE_ASSETS } from "@/lib/ristorante-assets";
import { FLORISTERIA_ASSETS, FLORISTERIA_HERO_FAN_DEFAULT_IMAGES } from "@/lib/floristeria-assets";
import { OFICIO_PRO_ASSETS } from "@/lib/oficio-pro-assets";
import { COFFEE_SHOP_ASSETS } from "@/lib/coffee-shop-assets";

const BG_IMG =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260603_073200_7082add5-f1f8-4873-8696-d6f78a44089b.png&w=1920&q=85";

export const VELAR_DEFAULT_CONTENT: TemplateContentMap["velar"] = {
  brand: "Toll Story.",
  brandLogoType: "text",
  brandLogoImage: "",
  hero: {
    eyebrow: "CELEBRA EN",
    title: "TOLL STORY",
    subtitle: "Bodas, comuniones y fiestas de todo tipo en un entorno exclusivo.",
    description:
      "Espacio diseñado para la celebración de eventos privados y de empresa en Valencia y área metropolitana.",
    image: BG_IMG,
    houseImage: VELAR_ASSETS.hero,
    ctaLabel: "",
  },
  story: {
    statement:
      "Cada espacio de Toll Story está pensado para convertir tus celebraciones en momentos inolvidables. Bodas, comuniones, eventos de empresa o fiestas familiares: un entorno privado, versátil y con todo lo necesario.",
  },
  stats: [
    { id: "experience", value: "15", label: "Años de experiencia" },
    { id: "bookings", value: "200", label: "Reservas realizadas" },
    { id: "clients", value: "2500", label: "Clientes satisfechos" },
  ],
  gallery: [
    { id: "gallery-1", image: VELAR_ASSETS.toll7 },
    { id: "gallery-2", image: VELAR_ASSETS.toll6 },
    { id: "gallery-3", image: VELAR_ASSETS.toll5 },
    { id: "gallery-4", image: VELAR_ASSETS.toll4 },
  ],
  nav: [
    { id: "nav-story", label: "Nosotros", href: "#story" },
    { id: "nav-listings", label: "Galería", href: "#listings" },
    { id: "nav-residences", label: "Espacios", href: "#residences" },
    { id: "nav-inquire", label: "Contacto", href: "#inquire" },
  ],
  sectionHeadings: SECTION_HEADING_DEFAULTS.velar,
  mapsUrl: "",
  spaces: [
    {
      id: "space-1",
      name: "Toll Story 1",
      description: "Un rincón rústico y acogedor ideal para comuniones y celebraciones íntimas.",
      image: VELAR_ASSETS.toll7,
    },
    {
      id: "space-2",
      name: "Toll Story 2",
      description: "Un espacio tropical perfecto para fiestas familiares y eventos al aire libre.",
      image: VELAR_ASSETS.toll6,
    },
    {
      id: "space-3",
      name: "Toll Story 3",
      description: "Elegancia y amplitud para bodas, eventos de empresa y grandes celebraciones.",
      image: VELAR_ASSETS.toll5,
    },
  ],
  services: [
    {
      id: "service-1",
      title: "Jardín con Piscina",
      subtitle: "para todos los invitados",
      label: "ENTORNO PRIVADO",
      image: VELAR_ASSETS.toll7,
    },
    {
      id: "service-2",
      title: "Parking Privado",
      subtitle: "dentro de la finca",
      label: "PARA TODOS LOS INVITADOS",
      image: VELAR_ASSETS.toll6,
    },
    {
      id: "service-3",
      title: "Zonas de descanso",
      subtitle: "con mobiliario básico",
      label: "CON MOBILIARIO BÁSICO",
      image: VELAR_ASSETS.toll5,
    },
    {
      id: "service-4",
      title: "Pérgola equipada",
      subtitle: "ventiladores y altavoces",
      label: "VENTILADORES Y ALTAVOCES",
      image: VELAR_ASSETS.toll4,
    },
    {
      id: "service-5",
      title: "Baños y duchas",
      subtitle: "descanso y comodidad",
      label: "DESCANSO Y COMODIDAD",
      image: VELAR_ASSETS.toll2,
    },
  ],
  workflow: [
    {
      id: "step-1",
      number: "1",
      title: "Consulta disponibilidad",
      description: "Comprueba las fechas disponibles en nuestro calendario",
    },
    {
      id: "step-2",
      number: "2",
      title: "Visita los espacios",
      description: "Ven y conoce los jardines antes de decidir",
    },
    {
      id: "step-3",
      number: "3",
      title: "Reserva tu lugar",
      description: "Confirma tu fecha y asegura tu celebración",
    },
  ],
  testimonials: [
    {
      id: "review-1",
      author: "Michelle Jimenez Jimenez",
      date: "2025-01-11",
      rating: 5,
      comment:
        "Alquilé este espacio para celebrar mi cumpleaños y quedé encantada. El lugar es espectacular, con una decoración cuidada y un parking dentro de la villa, lo cual es muy práctico. Aunque mi cumpleaños es en diciembre y no pudimos disfrutar de la piscina, todo estuvo perfecto y lleno de detalles. El espacio cuenta con tres zonas diferentes, lo que lo hace muy versátil y especial para cualquier tipo de evento. Sin duda, le doy un 10/10. Además, los dueños fueron muy amables, flexibles y estuvieron siempre atentos, manteniendo una comunicación excelente. ¡Lo recomiendo totalmente!",
      verified: true,
    },
    {
      id: "review-2",
      author: "Artak Blkyan",
      date: "2024-12-26",
      rating: 5,
      comment: "Un sitio espectacular para pasar eventos y reuniones familiares.",
      verified: true,
    },
    {
      id: "review-3",
      author: "maría molina aracil",
      date: "2024-12-16",
      rating: 5,
      comment:
        "Celebramos allí las bodas de oro de mis padres y fue genial. A todos los invitados les encantó el sitio. Muy recomendable para celebrar eventos familiares o con amigos.",
      verified: true,
    },
    {
      id: "review-4",
      author: "GAZA, un placer",
      date: "2024-10-31",
      rating: 5,
      comment:
        "Alquilamos la finca para un día, fue increíble. La organización fue genial, y nos lo hicieron todo súper fácil. La comida fue espectacular, y el lugar increíble. Estuvimos súper cómodos, como en nuestra casa. Tienen diferentes fincas, y además cuentan con un parking privado dentro de la finca que lo hacía todo aún más cómodo. Pudimos ir a dejar las cosas el día de antes y pasar allí la mañana para prepararlo todo. Sin duda repetiremos en próximas ocasiones.",
      verified: true,
    },
    {
      id: "review-5",
      author: "Christine Hasselhuhn de Patino",
      date: "2024-10-25",
      rating: 5,
      comment:
        "Hemos festejado una fiesta familiar con muchos niños, el sitio muy bonito 😻 barbacoa, neveras, música, piscina, la comunicación muy rápida y transparente con los administradores. Repetiremos seguro",
      verified: true,
    },
    {
      id: "review-6",
      author: "Kike Sanchez",
      date: "2024-10-25",
      rating: 5,
      comment:
        "Celebramos el 50 cumpleaños de mi mujer y fué espectacular. Buen trato, ambiente delicioso y lo mejor de todo: el personal que nos atendió.... amables, solícitos y con una sonrisa en la boca. Alguien dá mas?",
      verified: true,
    },
    {
      id: "review-7",
      author: "Carla Bru",
      date: "2024-10-09",
      rating: 5,
      comment:
        "Espacio grande, agradable y con todo lo necesario para celebrar un evento. Lola fue muy atenta y resolvió todo lo que le pedimos, ¡gracias!",
      verified: true,
    },
    {
      id: "review-8",
      author: "Francisco ORTEGA VALERO",
      date: "2024-10-04",
      rating: 5,
      comment:
        "He celebrado un evento de empresa y todo ha salido genial. El lugar es fantástico y el personal super atento y amable. Super recomendable. Volveremos seguro.",
      verified: true,
    },
    {
      id: "review-9",
      author: "Mariangeles Ramon",
      date: "2024-09-12",
      rating: 5,
      comment:
        "Me prepararon mi fiesta sorpresa y un lugar precioso, privado, con piscina lugares para relax,los dueños atentos para q no faltara nada,lo recomiendo para cualquier evento. Mis invitados encantados con el lugar",
      verified: true,
    },
  ],
  contact: {
    phone: "+34 670 36 93 68",
    email: "tollstory-reservas@gmail.com",
    address: "Valencia y área metropolitana",
    copyrightSuffix: DEFAULT_COPYRIGHT_SUFFIX,
    socialLinks: [],
  },
};

export const STUDIO_DEFAULT_CONTENT: TemplateContentMap["studio"] = {
  brand: "Lumière.",
  brandLogoType: "text",
  brandLogoImage: "",
  hero: {
    eyebrow: "PELUQUERÍA & ESTILISMO",
    title: "Lumière Studio",
    subtitle: "Donde cada corte cuenta una historia. Tu estilo, nuestra pasión.",
    description: "Salón de peluquería y estilismo en el corazón de Madrid.",
    image: STUDIO_ASSETS.hero,
    ctaLabel: "Reservar cita",
  },
  nav: [
    { id: "nav-servicios", label: "Servicios", href: "#servicios" },
    { id: "nav-equipo", label: "Equipo", href: "#equipo" },
    { id: "nav-galeria", label: "Galería", href: "#galeria" },
    { id: "nav-faq", label: "FAQ", href: "#faq" },
    { id: "nav-contacto", label: "Contacto", href: "#contacto" },
  ],
  sectionHeadings: SECTION_HEADING_DEFAULTS.studio,
  contact: {
    phone: "+34 612 34 56 78",
    email: "hola@lumiere-studio.es",
    address: "Calle Gran Vía 42, Madrid",
  },
  stats: [
    { id: "years", value: "12", label: "Años de experiencia" },
    { id: "clients", value: "3500", label: "Clientas satisfechas" },
    { id: "awards", value: "8", label: "Premios del sector" },
  ],
  testimonials: [
    {
      id: "review-1",
      author: "María García",
      date: "2025-03-15",
      rating: 5,
      comment: "El mejor salón al que he ido. El equipo es increíble y siempre salen con el pelo perfecto. Ana es una artista con el color.",
      verified: true,
    },
    {
      id: "review-2",
      author: "Laura Martínez",
      date: "2025-02-20",
      rating: 5,
      comment: "Llevo años buscando un sitio de confianza en Madrid y por fin lo encontré. El ambiente es precioso y el trato inmejorable.",
      verified: true,
    },
    {
      id: "review-3",
      author: "Carmen López",
      date: "2025-01-10",
      rating: 5,
      comment: "Me hicieron un balayage espectacular. Exactamente lo que quería. Volveré seguro.",
      verified: true,
    },
  ],
  about: {
    statement: "Creemos que un buen corte de pelo puede cambiar cómo te ves y cómo te sientes. En Lumière combinamos técnica, creatividad y los mejores productos para que cada visita sea una experiencia.",
  },
  gallery: [
    { id: "g1", image: STUDIO_ASSETS.gallery1 },
    { id: "g2", image: STUDIO_ASSETS.gallery2 },
    { id: "g3", image: STUDIO_ASSETS.gallery3 },
    { id: "g4", image: STUDIO_ASSETS.gallery4 },
    { id: "g5", image: STUDIO_ASSETS.gallery5 },
    { id: "g6", image: STUDIO_ASSETS.gallery6 },
    { id: "g7", image: STUDIO_ASSETS.gallery7 },
  ],
  team: [
    {
      id: "team-1",
      name: "Ana Ruiz",
      role: "Directora creativa",
      bio: "Más de 15 años de experiencia en color y corte. Especialista en balayage y técnicas de vanguardia.",
      image: STUDIO_ASSETS.stylist1,
    },
    {
      id: "team-2",
      name: "Carlos Vega",
      role: "Estilista senior",
      bio: "Experto en cortes masculinos y femeninos. Formación en Londres y París.",
      image: STUDIO_ASSETS.stylist2,
    },
    {
      id: "team-3",
      name: "Lucía Fernández",
      role: "Especialista en color",
      bio: "Certificada en técnicas de coloración orgánica. Apasionada por los tonos naturales.",
      image: STUDIO_ASSETS.stylist3,
    },
  ],
  serviceMenu: [
    { id: "sm-1", category: "Corte", name: "Corte mujer", description: "Incluye lavado y peinado", price: "35€", duration: "45 min" },
    { id: "sm-2", category: "Corte", name: "Corte hombre", description: "Incluye lavado", price: "20€", duration: "30 min" },
    { id: "sm-3", category: "Corte", name: "Corte infantil", description: "Hasta 12 años", price: "15€", duration: "20 min" },
    { id: "sm-4", category: "Color", name: "Tinte completo", description: "Color uniforme con productos premium", price: "55€", duration: "90 min" },
    { id: "sm-5", category: "Color", name: "Mechas / Balayage", description: "Técnicas de iluminación personalizadas", price: "85€", duration: "120 min" },
    { id: "sm-6", category: "Color", name: "Matización", description: "Corrección y brillo del color", price: "30€", duration: "30 min" },
    { id: "sm-7", category: "Tratamientos", name: "Hidratación profunda", description: "Tratamiento reparador con keratina", price: "40€", duration: "45 min" },
    { id: "sm-8", category: "Tratamientos", name: "Botox capilar", description: "Alisado y nutrición intensiva", price: "90€", duration: "90 min" },
    { id: "sm-9", category: "Peinado", name: "Peinado evento", description: "Recogidos y ondas para ocasiones especiales", price: "45€", duration: "60 min" },
    { id: "sm-10", category: "Peinado", name: "Brushing", description: "Secado y modelado profesional", price: "20€", duration: "30 min" },
  ],
  benefits: [
    { id: "b1", title: "Productos premium", description: "Trabajamos exclusivamente con marcas profesionales", icon: "sparkles" },
    { id: "b2", title: "Equipo certificado", description: "Formación continua en las últimas tendencias", icon: "award" },
    { id: "b3", title: "Ambiente exclusivo", description: "Un espacio diseñado para tu comodidad y relax", icon: "star" },
  ],
  faq: [
    { id: "faq-1", question: "¿Necesito pedir cita previa?", answer: "Sí, recomendamos reservar cita para garantizar tu plaza. Puedes hacerlo por WhatsApp, teléfono o a través de nuestra web." },
    { id: "faq-2", question: "¿Qué marcas de productos utilizáis?", answer: "Trabajamos con L'Oréal Professionnel, Kérastase y Olaplex. Todos nuestros productos son de gama profesional." },
    { id: "faq-3", question: "¿Cuánto dura un tratamiento de color?", answer: "Depende del servicio: un tinte completo dura entre 60-90 minutos, mientras que un balayage puede llevar hasta 2-3 horas." },
    { id: "faq-4", question: "¿Tenéis parking cerca?", answer: "Sí, hay un parking público a 50 metros del salón en la misma calle. También hay zona de aparcamiento en las calles adyacentes." },
    { id: "faq-5", question: "¿Puedo cancelar o cambiar mi cita?", answer: "Por supuesto. Solo te pedimos que nos avises con al menos 24 horas de antelación para poder reorganizar la agenda." },
  ],
};

export const PORTFOLIO_DEFAULT_CONTENT: TemplateContentMap["portfolio"] = {
  brand: "Mora.",
  brandLogoType: "text",
  brandLogoImage: "",
  hero: {
    eyebrow: "DISEÑADORA & DIRECTORA CREATIVA",
    title: "Elena Mora",
    subtitle: "Diseño experiencias digitales que conectan marcas con personas.",
    description: "Portfolio de diseño y dirección creativa en Barcelona.",
    image: PORTFOLIO_ASSETS.hero,
    ctaLabel: "Ver proyectos",
  },
  nav: [
    { id: "nav-experiencia", label: "Experiencia", href: "#experiencia" },
    { id: "nav-proyectos", label: "Proyectos", href: "#proyectos" },
    { id: "nav-servicios", label: "Servicios", href: "#servicios" },
    { id: "nav-testimonios", label: "Testimonios", href: "#testimonios" },
    { id: "nav-contacto", label: "Contacto", href: "#contacto" },
  ],
  sectionHeadings: SECTION_HEADING_DEFAULTS.portfolio,
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

export const RISTORANTE_DEFAULT_CONTENT: TemplateContentMap["ristorante"] = {
  brand: "Osteria da Luca.",
  brandLogoType: "text",
  brandLogoImage: "",
  hero: {
    eyebrow: "COCINA ITALIANA AUTÉNTICA",
    title: "Osteria da Luca",
    subtitle: "Tradición, pasión y los mejores ingredientes del Mediterráneo.",
    description: "Restaurante italiano en el corazón de Madrid desde 2008.",
    image: RISTORANTE_ASSETS.hero,
    ctaLabel: "Reservar mesa",
  },
  nav: [
    { id: "nav-carta", label: "Carta", href: "#carta" },
    { id: "nav-galeria", label: "Galería", href: "#galeria" },
    { id: "nav-equipo", label: "Equipo", href: "#equipo" },
    { id: "nav-horarios", label: "Horarios", href: "#horarios" },
    { id: "nav-contacto", label: "Reservar", href: "#contacto" },
  ],
  sectionHeadings: SECTION_HEADING_DEFAULTS.ristorante,
  contact: {
    phone: "+34 912 34 56 78",
    email: "reservas@osteriadaluca.es",
    address: "Calle de la Paz 12, Madrid",
    ctaLabel: "Reservar por WhatsApp",
    copyrightSuffix: DEFAULT_COPYRIGHT_SUFFIX,
    socialLinks: [],
  },
  stats: [
    { id: "years", value: "17", label: "Años de tradición" },
    { id: "dishes", value: "80", label: "Platos en carta" },
    { id: "reviews", value: "4.8", label: "Valoración media" },
  ],
  testimonials: [
    {
      id: "review-1",
      author: "Ana García",
      date: "2025-03-20",
      rating: 5,
      comment: "La mejor pasta que he probado en Madrid. El ambiente es acogedor y el servicio impecable. La carbonara es espectacular, como en Roma.",
      verified: true,
    },
    {
      id: "review-2",
      author: "Roberto Martínez",
      date: "2025-02-28",
      rating: 5,
      comment: "Llevamos años viniendo y nunca decepciona. Los ravioli de trufa son una obra de arte. El personal te hace sentir como en casa.",
      verified: true,
    },
    {
      id: "review-3",
      author: "Carmen López",
      date: "2025-01-15",
      rating: 5,
      comment: "Celebramos nuestro aniversario aquí y fue perfecto. La carta de vinos es excelente y el tiramisú el mejor que he probado fuera de Italia.",
      verified: true,
    },
  ],
  about: {
    statement: "Desde 2008 traemos los sabores auténticos de Italia a Madrid. Cada plato se prepara con ingredientes frescos importados directamente de nuestras regiones: la pasta hecha a mano cada mañana, el aceite de oliva de Puglia y los quesos de Emilia-Romagna.",
  },
  gallery: [
    { id: "g1", image: RISTORANTE_ASSETS.gallery1 },
    { id: "g2", image: RISTORANTE_ASSETS.gallery2 },
    { id: "g3", image: RISTORANTE_ASSETS.gallery3 },
    { id: "g4", image: RISTORANTE_ASSETS.gallery4 },
    { id: "g5", image: RISTORANTE_ASSETS.gallery5 },
    { id: "g6", image: RISTORANTE_ASSETS.gallery6 },
    { id: "g7", image: RISTORANTE_ASSETS.gallery7 },
  ],
  team: [
    {
      id: "chef-1",
      name: "Luca Bianchi",
      role: "Chef ejecutivo",
      bio: "Nacido en Bolonia, formado en las cocinas de Massimo Bottura. 25 años de experiencia en cocina italiana de autor.",
      image: RISTORANTE_ASSETS.chef1,
    },
    {
      id: "chef-2",
      name: "Marco Rossi",
      role: "Chef de pasta",
      bio: "Especialista en pasta fresca artesanal. Cada mañana prepara a mano la pasta del día siguiendo recetas familiares.",
      image: RISTORANTE_ASSETS.chef2,
    },
    {
      id: "chef-3",
      name: "Sofia Conti",
      role: "Chef de postres",
      bio: "Repostera formada en Milán. Sus tiramisú y panna cotta son legendarios entre nuestros clientes habituales.",
      image: RISTORANTE_ASSETS.chef3,
    },
  ],
  serviceMenu: [
    { id: "sm-1", category: "Antipasti", name: "Burrata pugliese", description: "Con tomate cherry, albahaca fresca y aceite de oliva virgen", price: "14€" },
    { id: "sm-2", category: "Antipasti", name: "Carpaccio di manzo", description: "Ternera con rúcula, parmesano y reducción de balsámico", price: "16€" },
    { id: "sm-3", category: "Antipasti", name: "Vitello tonnato", description: "Ternera con salsa de atún, alcaparras y anchoas", price: "15€" },
    { id: "sm-4", category: "Pasta", name: "Tagliatelle al ragù", description: "Pasta fresca con ragú bolognese cocinado 6 horas", price: "18€" },
    { id: "sm-5", category: "Pasta", name: "Cacio e pepe", description: "Tonnarelli con pecorino romano y pimienta negra", price: "16€" },
    { id: "sm-6", category: "Pasta", name: "Ravioli di tartufo", description: "Rellenos de ricotta y trufa negra con mantequilla de salvia", price: "24€" },
    { id: "sm-7", category: "Secondi", name: "Ossobuco alla milanese", description: "Jarrete de ternera estofado con gremolata y risotto", price: "28€" },
    { id: "sm-8", category: "Secondi", name: "Branzino al forno", description: "Lubina al horno con patatas, aceitunas y tomate cherry", price: "26€" },
    { id: "sm-9", category: "Dolci", name: "Tiramisù della casa", description: "Receta tradicional con mascarpone y café espresso", price: "9€" },
    { id: "sm-10", category: "Dolci", name: "Panna cotta", description: "Con coulis de frutos rojos de temporada", price: "8€" },
  ],
  workflow: [
    { id: "h-1", number: "Lun-Jue", title: "13:00 - 16:00 / 20:00 - 23:30", description: "Comida y cena" },
    { id: "h-2", number: "Vie-Sáb", title: "13:00 - 16:30 / 20:00 - 00:30", description: "Horario ampliado" },
    { id: "h-3", number: "Domingo", title: "13:00 - 16:30", description: "Solo comida" },
  ],
  faq: [
    { id: "faq-1", question: "¿Es necesario reservar?", answer: "Recomendamos reservar, especialmente fines de semana y festivos. Puedes hacerlo por teléfono, WhatsApp o a través de nuestra web." },
    { id: "faq-2", question: "¿Tenéis opciones para celíacos?", answer: "Sí, ofrecemos pasta sin gluten bajo petición. Informa al camarero al llegar y adaptaremos los platos que sea posible." },
    { id: "faq-3", question: "¿Hacéis eventos privados?", answer: "Sí, disponemos de un salón privado con capacidad para 30 personas. Contacta con nosotros para menús personalizados y disponibilidad." },
    { id: "faq-4", question: "¿Tenéis terraza?", answer: "Sí, contamos con una terraza interior con capacidad para 24 personas, disponible de abril a octubre." },
    { id: "faq-5", question: "¿Hay parking cerca?", answer: "El parking público más cercano está a 100 metros en la Plaza Mayor. También hay zona SER en las calles adyacentes." },
  ],
};

export const COFFEE_SHOP_DEFAULT_CONTENT: TemplateContentMap["coffee-shop"] = {
  brand: "Grano & Taza.",
  brandLogoType: "text",
  brandLogoImage: "",
  hero: {
    eyebrow: "Café de especialidad",
    title: "Grano & Taza",
    subtitle: "Tostamos en pequeños lotes y servimos cada taza con la misma atención que ponemos en elegir el origen.",
    description: "Cafetería de especialidad en Malasaña, Madrid, desde 2016.",
    image: COFFEE_SHOP_ASSETS.hero,
    ctaLabel: "Ver carta",
  },
  nav: [
    { id: "nav-carta", label: "Carta", href: "#carta" },
    { id: "nav-galeria", label: "Galería", href: "#galeria" },
    { id: "nav-horarios", label: "Horarios", href: "#horarios" },
    { id: "nav-contacto", label: "Contacto", href: "#contacto" },
  ],
  sectionHeadings: SECTION_HEADING_DEFAULTS["coffee-shop"],
  contact: {
    phone: "+34 910 45 67 89",
    email: "hola@granoetaza.es",
    address: "Calle del Pez 14, Madrid",
    ctaLabel: "Escribir por WhatsApp",
    copyrightSuffix: DEFAULT_COPYRIGHT_SUFFIX,
    socialLinks: [],
  },
  stats: [
    { id: "years", value: "9", label: "Años tostando" },
    { id: "origins", value: "12", label: "Orígenes al año" },
    { id: "reviews", value: "4.9", label: "Valoración media" },
  ],
  testimonials: [
    {
      id: "review-1",
      author: "Elena Ruiz",
      date: "2025-03-12",
      rating: 5,
      comment: "El flat white es impecable y el ambiente invita a quedarse horas con un libro. La repostería casera complementa perfectamente el café.",
      verified: true,
    },
    {
      id: "review-2",
      author: "David Chen",
      date: "2025-02-08",
      rating: 5,
      comment: "Probé el filtro de Etiopía y noté la diferencia desde el primer sorbo. El equipo conoce cada origen y te orienta sin pretensiones.",
      verified: true,
    },
    {
      id: "review-3",
      author: "Marta Iglesias",
      date: "2025-01-22",
      rating: 5,
      comment: "Vengo cada sábado por el brunch. Los croissants salen del horno a las 9 y el café nunca decepciona.",
      verified: true,
    },
  ],
  about: {
    statement: "En Grano & Taza trabajamos con microlotes de productores de Colombia, Etiopía y Guatemala. Tostamos en Madrid cada semana para servir café fresco, con perfil claro y dulzor natural.",
  },
  gallery: [
    { id: "g1", image: COFFEE_SHOP_ASSETS.gallery1 },
    { id: "g2", image: COFFEE_SHOP_ASSETS.gallery2 },
    { id: "g3", image: COFFEE_SHOP_ASSETS.gallery3 },
    { id: "g4", image: COFFEE_SHOP_ASSETS.gallery4 },
    { id: "g5", image: COFFEE_SHOP_ASSETS.gallery5 },
    { id: "g6", image: COFFEE_SHOP_ASSETS.gallery6 },
    { id: "g7", image: COFFEE_SHOP_ASSETS.gallery7 },
  ],
  team: [],
  serviceMenu: [
    { id: "sm-1", category: "Espresso", name: "Espresso", description: "Doble de nuestro blend de temporada", price: "2,20€" },
    { id: "sm-2", category: "Espresso", name: "Flat white", description: "Espresso con leche microtexturizada", price: "3,50€" },
    { id: "sm-3", category: "Espresso", name: "Cortado", description: "Espresso con un toque de leche caliente", price: "2,80€" },
    { id: "sm-4", category: "Filter", name: "V60", description: "Pour over con origen rotativo de la semana", price: "4,50€" },
    { id: "sm-5", category: "Filter", name: "Chemex", description: "Para compartir, 2 tazas", price: "7,00€" },
    { id: "sm-6", category: "Filter", name: "Cold brew", description: "Infusión en frío 18 horas", price: "4,00€" },
    { id: "sm-7", category: "Frío", name: "Iced latte", description: "Espresso con leche y hielo", price: "3,80€" },
    { id: "sm-8", category: "Frío", name: "Affogato", description: "Espresso sobre helado de vainilla", price: "4,50€" },
    { id: "sm-9", category: "Repostería", name: "Croissant", description: "Mantequilla francesa, horneado diario", price: "2,80€" },
    { id: "sm-10", category: "Repostería", name: "Banana bread", description: "Receta casera con nueces", price: "3,50€" },
  ],
  workflow: [
    { id: "h-1", number: "Lunes", title: "8:00 - 20:00", description: "Servicio completo" },
    { id: "h-2", number: "Mar-Vie", title: "7:30 - 21:00", description: "Horario ampliado" },
    { id: "h-3", number: "Sábado", title: "9:00 - 21:00", description: "Brunch hasta las 14:00" },
    { id: "h-4", number: "Domingo", title: "9:00 - 18:00", description: "Solo café y repostería" },
  ],
  faq: [
    { id: "faq-1", question: "¿Tenéis opciones sin lactosa?", answer: "Sí, servimos leche de avena, soja y almendra sin coste adicional. También podemos preparar cualquier bebida solo con agua o leche vegetal." },
    { id: "faq-2", question: "¿Se puede trabajar con portátil?", answer: "Sí, tenemos mesas amplias y enchufes en la zona del fondo. Pedimos consumo mínimo de una bebida cada 2 horas en horario punta." },
    { id: "faq-3", question: "¿Vendéis café en grano?", answer: "Sí, vendemos bolsas de 250 g y 1 kg de nuestros orígenes de temporada. También moleremos el grano según tu método en el momento." },
    { id: "faq-4", question: "¿Hacéis pedidos para llevar?", answer: "Puedes pedir por WhatsApp con 15 minutos de antelación. Recogida en barra sin fila." },
    { id: "faq-5", question: "¿Hay wifi?", answer: "Sí, wifi gratuito para clientes. La contraseña está en la pizarra junto a la barra." },
  ],
};

export const FLORISTERIA_DEFAULT_CONTENT: TemplateContentMap["floristeria"] = {
  brand: "Jardín Secreto.",
  brandLogoType: "text",
  brandLogoImage: "",
  hero: {
    eyebrow: "ARTE FLORAL ARTESANAL",
    title: "Jardín Secreto",
    subtitle: "Creamos arreglos florales únicos para cada momento especial de tu vida.",
    description: "Floristería artesanal en el centro de Sevilla desde 2012.",
    image: FLORISTERIA_ASSETS.hero,
    fanImages: [...FLORISTERIA_HERO_FAN_DEFAULT_IMAGES],
    ctaLabel: "Hacer pedido",
  },
  nav: [
    { id: "nav-servicios", label: "Servicios", href: "#servicios" },
    { id: "nav-galeria", label: "Galería", href: "#galeria" },
    { id: "nav-contacto", label: "Contacto", href: "#contacto" },
  ],
  sectionHeadings: SECTION_HEADING_DEFAULTS.floristeria,
  contact: {
    phone: "+34 954 12 34 56",
    email: "hola@jardinsecreto.es",
    address: "Calle Sierpes 45, Sevilla",
    ctaLabel: "Pedir por WhatsApp",
    copyrightSuffix: DEFAULT_COPYRIGHT_SUFFIX,
    socialLinks: [],
  },
  stats: [
    { id: "years", value: "13", label: "Años creando belleza" },
    { id: "bouquets", value: "5000", label: "Ramos entregados" },
    { id: "weddings", value: "320", label: "Bodas decoradas" },
  ],
  testimonials: [
    {
      id: "review-1",
      author: "María del Carmen",
      date: "2025-03-18",
      rating: 5,
      comment: "Los ramos de novia de Jardín Secreto son una obra de arte. El mío fue exactamente lo que soñaba, con peonías y rosas de jardín. Todas las invitadas me preguntaron dónde lo había encargado.",
      verified: true,
    },
    {
      id: "review-2",
      author: "Antonio Ruiz",
      date: "2025-02-14",
      rating: 5,
      comment: "Pedí un ramo para San Valentín y mi mujer se emocionó al verlo. La frescura de las flores y el diseño eran impecables. Repetiré sin duda.",
      verified: true,
    },
    {
      id: "review-3",
      author: "Lucía Fernández",
      date: "2025-01-20",
      rating: 5,
      comment: "Decoraron toda nuestra boda y el resultado fue mágico. Desde el altar hasta las mesas, cada detalle estaba cuidado. Un equipo profesional y con mucho gusto.",
      verified: true,
    },
  ],
  about: {
    statement: "Cada flor cuenta una historia. En Jardín Secreto seleccionamos a mano las mejores variedades de temporada para crear composiciones que transmiten emociones. Trabajamos con productores locales y apostamos por la flor de proximidad.",
  },
  gallery: [
    { id: "g1", image: FLORISTERIA_ASSETS.gallery1 },
    { id: "g2", image: FLORISTERIA_ASSETS.gallery2 },
    { id: "g3", image: FLORISTERIA_ASSETS.gallery3 },
    { id: "g4", image: FLORISTERIA_ASSETS.gallery4 },
    { id: "g5", image: FLORISTERIA_ASSETS.gallery5 },
    { id: "g6", image: FLORISTERIA_ASSETS.gallery6 },
    { id: "g7", image: FLORISTERIA_ASSETS.gallery7 },
  ],
  team: [],
  serviceMenu: [
    { id: "sm-1", category: "Ramos", name: "Ramo de temporada", description: "Composición con flores frescas de temporada", price: "Desde 35€" },
    { id: "sm-2", category: "Ramos", name: "Ramo de rosas", description: "12 rosas de tallo largo con follaje", price: "Desde 45€" },
    { id: "sm-3", category: "Ramos", name: "Ramo de novia", description: "Diseño personalizado con consulta previa", price: "Desde 120€" },
    { id: "sm-4", category: "Plantas", name: "Centro de mesa", description: "Arreglo floral para mesa de comedor", price: "Desde 40€" },
    { id: "sm-5", category: "Plantas", name: "Planta en maceta decorada", description: "Planta de interior con maceta artesanal", price: "Desde 25€" },
    { id: "sm-6", category: "Eventos", name: "Decoración de boda", description: "Altar, mesas y espacios del convite", price: "A consultar" },
    { id: "sm-7", category: "Eventos", name: "Decoración corporativa", description: "Eventos de empresa y presentaciones", price: "A consultar" },
    { id: "sm-8", category: "Suscripciones", name: "Ramo semanal", description: "Entrega semanal de flores frescas", price: "Desde 28€/semana" },
    { id: "sm-9", category: "Suscripciones", name: "Ramo mensual", description: "Un ramo especial cada mes", price: "Desde 95€/mes" },
  ],
  benefits: [
    { id: "b1", title: "Flor de proximidad", description: "Trabajamos con productores locales para garantizar frescura y sostenibilidad", icon: "leaf" },
    { id: "b2", title: "Diseño artesanal", description: "Cada arreglo se crea a mano con atención al detalle", icon: "palette" },
    { id: "b3", title: "Entrega el mismo día", description: "Pedidos antes de las 14h se entregan el mismo día en Sevilla", icon: "truck" },
    { id: "b4", title: "Asesoramiento personalizado", description: "Te ayudamos a elegir las flores perfectas para cada ocasión", icon: "message-circle" },
  ],
  faq: [
    { id: "faq-1", question: "¿Hacéis envíos a domicilio?", answer: "Sí, realizamos entregas en Sevilla capital y área metropolitana. Los pedidos realizados antes de las 14h se entregan el mismo día." },
    { id: "faq-2", question: "¿Cuánto dura un ramo fresco?", answer: "Con los cuidados adecuados, nuestros ramos duran entre 7 y 10 días. Incluimos una tarjeta con consejos de conservación." },
    { id: "faq-3", question: "¿Puedo personalizar mi ramo?", answer: "Por supuesto. Puedes elegir las flores, colores y estilo. También ofrecemos consulta gratuita para ramos de novia y eventos." },
    { id: "faq-4", question: "¿Trabajáis con flores de temporada?", answer: "Sí, priorizamos las flores de temporada por su frescura, calidad y menor impacto ambiental. Cada estación tiene sus variedades estrella." },
    { id: "faq-5", question: "¿Con cuánta antelación debo encargar la decoración de boda?", answer: "Recomendamos contactar con al menos 3-6 meses de antelación para bodas. Para eventos más pequeños, con 2-3 semanas es suficiente." },
  ],
};

export const OFICIO_PRO_DEFAULT_CONTENT: TemplateContentMap["oficio-pro"] = {
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
  sectionHeadings: SECTION_HEADING_DEFAULTS["oficio-pro"],
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

const DEFAULT_CONTENT: Record<TemplateId, TemplateContentMap[TemplateId]> = {
  velar: VELAR_DEFAULT_CONTENT,
  studio: STUDIO_DEFAULT_CONTENT,
  portfolio: PORTFOLIO_DEFAULT_CONTENT,
  ristorante: RISTORANTE_DEFAULT_CONTENT,
  floristeria: FLORISTERIA_DEFAULT_CONTENT,
  "oficio-pro": OFICIO_PRO_DEFAULT_CONTENT,
  "coffee-shop": COFFEE_SHOP_DEFAULT_CONTENT,
};

export function getDefaultContent<T extends TemplateId>(templateId: T): TemplateContentMap[T] {
  return DEFAULT_CONTENT[templateId] as TemplateContentMap[T];
}
