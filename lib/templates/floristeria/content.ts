import type { TemplateContentMap } from "@/lib/dashboard-data";
import { DEFAULT_COPYRIGHT_SUFFIX } from "@/lib/copyright-constants";
import { FLORISTERIA_ASSETS, FLORISTERIA_HERO_FAN_DEFAULT_IMAGES } from "@/lib/floristeria-assets";
import { DEFAULT_LANDING_APPEARANCE } from "@/lib/templates/appearance-defaults";
import { FLORISTERIA_TEMPLATE } from "./definition";

export const FLORISTERIA_DEFAULT_CONTENT: TemplateContentMap["floristeria"] = {
  appearance: DEFAULT_LANDING_APPEARANCE,
  enabledPages: [],
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
  sectionHeadings: FLORISTERIA_TEMPLATE.headings,
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
