import type { TemplateContentMap } from "@/lib/dashboard-data";
import { DEFAULT_COPYRIGHT_SUFFIX } from "@/lib/copyright-constants";
import { COFFEE_SHOP_ASSETS } from "@/lib/coffee-shop-assets";
import { DEFAULT_LANDING_APPEARANCE } from "@/lib/templates/appearance-defaults";
import { COFFEE_SHOP_TEMPLATE } from "./definition";

export const COFFEE_SHOP_DEFAULT_CONTENT: TemplateContentMap["coffee-shop"] = {
  appearance: DEFAULT_LANDING_APPEARANCE,
  enabledPages: [],
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
    { id: "nav-reservas", label: "Reservar", href: "#reservas" },
    { id: "nav-contacto", label: "Contacto", href: "#contacto" },
  ],
  sectionHeadings: COFFEE_SHOP_TEMPLATE.headings,
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
