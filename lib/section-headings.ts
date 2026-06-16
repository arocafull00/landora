import type { LandingContent, SectionHeading, TemplateId } from "@/lib/dashboard-data";

export const SECTION_HEADING_DEFAULTS: Record<
  TemplateId,
  Record<string, SectionHeading>
> = {
  velar: {
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
  },
  studio: {
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
  },
  portfolio: {
    experiencia: {
      title: "Experiencia laboral",
      subtitle: "",
    },
    proyectos: {
      title: "Proyectos seleccionados",
      subtitle: "",
    },
    servicios: {
      title: "Servicios",
      subtitle: "",
    },
    faq: {
      title: "Preguntas frecuentes",
      subtitle: "Todo lo que necesitas saber antes de empezar un proyecto juntos.",
    },
    contacto: {
      title: "Hablemos de tu proyecto",
      subtitle: "Cuéntame tu idea y diseñemos juntos algo memorable.",
    },
  },
  ristorante: {
    carta: {
      title: "Nuestra carta",
      subtitle: "Platos elaborados con ingredientes frescos importados de Italia",
    },
    galeria: {
      title: "Nuestro espacio",
      subtitle: "",
    },
    equipo: {
      title: "Nuestro equipo",
      subtitle: "",
    },
    horarios: {
      title: "Horarios",
      subtitle: "",
    },
    contacto: {
      title: "Reserva tu mesa",
      subtitle: "Reserva tu próxima visita y disfruta de la auténtica cocina italiana.",
    },
  },
  floristeria: {
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
  },
  "oficio-pro": {
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
  },
  "coffee-shop": {
    carta: {
      title: "Nuestra carta",
      subtitle: "Café de origen, repostería artesanal y bebidas de temporada",
    },
    galeria: {
      title: "El espacio",
      subtitle: "",
    },
    horarios: {
      title: "Horarios",
      subtitle: "",
    },
    faq: {
      title: "Preguntas frecuentes",
      subtitle: "Todo lo que necesitas saber antes de tu visita.",
    },
    contacto: {
      title: "Visítanos",
      subtitle: "Pasa por la cafetería o escríbenos para reservar mesa o pedir para llevar.",
    },
  },
};

export const NAV_ONLY_HEADING_ANCHORS: Record<TemplateId, string[]> = {
  velar: [],
  studio: [],
  portfolio: [],
  ristorante: [],
  floristeria: [],
  "oficio-pro": [],
  "coffee-shop": [],
};

export function getSectionHeading(
  content: LandingContent,
  anchor: string,
  fallback: SectionHeading,
): SectionHeading {
  const stored = content.sectionHeadings?.[anchor];
  return {
    title: stored?.title?.trim() ? stored.title : fallback.title,
    subtitle: stored?.subtitle?.trim() ? stored.subtitle : fallback.subtitle,
  };
}

export function hasSectionSubtitle(fallback: SectionHeading): boolean {
  return fallback.subtitle.length > 0;
}
