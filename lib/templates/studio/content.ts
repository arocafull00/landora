import type { TemplateContentMap } from "@/lib/dashboard-data";
import { STUDIO_ASSETS } from "@/lib/studio-assets";
import { DEFAULT_LANDING_APPEARANCE } from "@/lib/templates/appearance-defaults";
import { STUDIO_TEMPLATE } from "./definition";

export const STUDIO_DEFAULT_CONTENT: TemplateContentMap["studio"] = {
  appearance: DEFAULT_LANDING_APPEARANCE,
  enabledPages: [],
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
    { id: "nav-reservas", label: "Reservar", href: "#reservas" },
    { id: "nav-contacto", label: "Contacto", href: "#contacto" },
  ],
  sectionHeadings: STUDIO_TEMPLATE.headings,
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
