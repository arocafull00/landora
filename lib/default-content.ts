import type { LandingContent } from "@/lib/dashboard-data";
import type { TemplateId } from "@/lib/template-registry";

const HOUSE_IMG =
  "https://res.cloudinary.com/dsdhxhhqh/image/upload/v1780471903/building_bzziky.png";
const BG_IMG =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260603_073200_7082add5-f1f8-4873-8696-d6f78a44089b.png&w=1920&q=85";

export const VELAR_DEFAULT_CONTENT: LandingContent = {
  brand: "Velar.",
  hero: {
    eyebrow: "LIVE IN",
    title: "IRREPLACEABLE",
    subtitle: "Stately homes built with vision, scope, and architectural finesse.",
    description: "",
    image: BG_IMG,
    houseImage: HOUSE_IMG,
  },
  story: {
    statement:
      "Every estate we present is hand-chosen\nthrough a frame of permanence, refinement,\nand timeless detail. Standards are not\na flourish. It is our discipline.",
  },
  stats: [
    { id: "portfolio", value: "120+", label: "Portfolio Holdings", countTo: 120, suffix: "+" },
    { id: "locations", value: "12", label: "Global Locations", countTo: 12, suffix: "" },
    { id: "loyalty", value: "98%", label: "Patron Loyalty Rate", countTo: 98, suffix: "%" },
  ],
  gallery: [
    {
      id: "gallery-1",
      video:
        "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260528_154759_4cdc8175-8261-497c-b688-9477c76545d4.mp4",
    },
    {
      id: "gallery-2",
      video:
        "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260528_154751_39b1b9bb-2708-4211-b6a2-d39f93309e52.mp4",
    },
    {
      id: "gallery-3",
      video:
        "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260528_154737_eba7900c-0313-483c-a30a-632c747ccc42.mp4",
    },
    {
      id: "gallery-4",
      video:
        "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260602_144009_4348fe33-f885-4345-8e92-3fe1c2625d32.mp4",
    },
    {
      id: "gallery-5",
      video:
        "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260602_145337_e44eaa8c-6bb1-4a6e-a70f-ed0231cbaccb.mp4",
    },
  ],
  nav: [
    { id: "nav-residences", label: "Residences", href: "#residences" },
    { id: "nav-story", label: "Story", href: "#story" },
    { id: "nav-listings", label: "Listings", href: "#listings" },
    { id: "nav-inquire", label: "Inquire", href: "#inquire" },
  ],
  spaces: [],
  services: [],
  workflow: [],
  testimonials: [],
  contact: {
    phone: "+1 (212) 555-0148",
    email: "inquire@velar.estate",
    address: "Madison Avenue, New York",
  },
};

export const TOLL_STORY_DEFAULT_CONTENT: LandingContent = {
  brand: "",
  hero: {
    eyebrow: "CELEBRA EN",
    title: "TOLL STORY",
    subtitle: "Bodas, comuniones y fiestas de todo tipo en un entorno exclusivo.",
    description:
      "Espacio diseñado para la celebración de eventos privados y de empresa en Valencia y área metropolitana.",
    image: "/toll-story/hero.png",
    houseImage: "",
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
  gallery: [],
  nav: [],
  spaces: [
    {
      id: "space-1",
      name: "Toll Story 1",
      description: "Un rincón rústico y acogedor ideal para comuniones y celebraciones íntimas.",
      image: "/toll-story/toll7.jpeg",
    },
    {
      id: "space-2",
      name: "Toll Story 2",
      description: "Un espacio tropical perfecto para fiestas familiares y eventos al aire libre.",
      image: "/toll-story/toll6.jpeg",
    },
    {
      id: "space-3",
      name: "Toll Story 3",
      description: "Elegancia y amplitud para bodas, eventos de empresa y grandes celebraciones.",
      image: "/toll-story/toll5.jpeg",
    },
  ],
  services: [
    {
      id: "service-1",
      title: "Jardín con Piscina",
      subtitle: "para todos los invitados",
      label: "ENTORNO PRIVADO",
      image: "/toll-story/toll7.jpeg",
    },
    {
      id: "service-2",
      title: "Parking Privado",
      subtitle: "dentro de la finca",
      label: "PARA TODOS LOS INVITADOS",
      image: "/toll-story/toll6.jpeg",
    },
    {
      id: "service-3",
      title: "Zonas de descanso",
      subtitle: "con mobiliario básico",
      label: "CON MOBILIARIO BÁSICO",
      image: "/toll-story/toll5.jpeg",
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
        "Alquilé este espacio para celebrar mi cumpleaños y quedé encantada. El lugar es espectacular, con una decoración cuidada y un parking dentro de la villa.",
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
  ],
  contact: {
    phone: "+34 670 36 93 68",
    email: "tollstory-reservas@gmail.com",
    address: "Valencia y área metropolitana",
  },
};

export function getDefaultContent(template: TemplateId): LandingContent {
  if (template === "velar") return VELAR_DEFAULT_CONTENT;
  return TOLL_STORY_DEFAULT_CONTENT;
}
