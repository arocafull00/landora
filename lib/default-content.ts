import type { TemplateContentMap, TemplateId } from "@/lib/dashboard-data";
import { VELAR_ASSETS } from "@/lib/velar-assets";
import { STUDIO_ASSETS } from "@/lib/studio-assets";

const BG_IMG =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260603_073200_7082add5-f1f8-4873-8696-d6f78a44089b.png&w=1920&q=85";

export const VELAR_DEFAULT_CONTENT: TemplateContentMap["velar"] = {
  brand: "Toll Story.",
  hero: {
    eyebrow: "CELEBRA EN",
    title: "TOLL STORY",
    subtitle: "Bodas, comuniones y fiestas de todo tipo en un entorno exclusivo.",
    description:
      "Espacio diseñado para la celebración de eventos privados y de empresa en Valencia y área metropolitana.",
    image: BG_IMG,
    houseImage: VELAR_ASSETS.hero,
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
    { id: "nav-residences", label: "Espacios", href: "#residences" },
    { id: "nav-story", label: "Nosotros", href: "#story" },
    { id: "nav-listings", label: "Galería", href: "#listings" },
    { id: "nav-inquire", label: "Contacto", href: "#inquire" },
  ],
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
  },
};

export const STUDIO_DEFAULT_CONTENT: TemplateContentMap["studio"] = {
  brand: "Lumière.",
  hero: {
    eyebrow: "PELUQUERÍA & ESTILISMO",
    title: "Lumière Studio",
    subtitle: "Donde cada corte cuenta una historia. Tu estilo, nuestra pasión.",
    description: "Salón de peluquería y estilismo en el corazón de Madrid.",
    image: STUDIO_ASSETS.hero,
  },
  nav: [
    { id: "nav-servicios", label: "Servicios", href: "#servicios" },
    { id: "nav-equipo", label: "Equipo", href: "#equipo" },
    { id: "nav-galeria", label: "Galería", href: "#galeria" },
    { id: "nav-faq", label: "FAQ", href: "#faq" },
    { id: "nav-contacto", label: "Contacto", href: "#contacto" },
  ],
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

const DEFAULT_CONTENT: Record<TemplateId, TemplateContentMap[TemplateId]> = {
  velar: VELAR_DEFAULT_CONTENT,
  studio: STUDIO_DEFAULT_CONTENT,
};

export function getDefaultContent<T extends TemplateId>(templateId: T): TemplateContentMap[T] {
  return DEFAULT_CONTENT[templateId] as TemplateContentMap[T];
}
