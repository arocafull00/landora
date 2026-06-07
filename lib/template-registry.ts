import type { LandingContent } from "@/lib/dashboard-data";
import { VELAR_DEFAULT_CONTENT, TOLL_STORY_DEFAULT_CONTENT } from "@/lib/default-content";

export type TemplateId = "toll-story" | "velar";

export type TemplateDefinition = {
  id: TemplateId;
  label: string;
  description: string;
  demoContent: LandingContent;
};

const tollStoryDemo: LandingContent = {
  ...TOLL_STORY_DEFAULT_CONTENT,
  hero: {
    ...TOLL_STORY_DEFAULT_CONTENT.hero,
    eyebrow: "BIENVENIDOS A",
    title: "VILLA AURORA",
    subtitle: "Finca privada para eventos exclusivos en el corazón de la región.",
    description:
      "Espacios versátiles para bodas, comuniones, eventos corporativos y celebraciones familiares con todo incluido.",
  },
  story: {
    statement:
      "Villa Aurora es un recinto diseñado para que cada detalle de tu celebración quede grabado en la memoria de tus invitados. Tres jardines privados, piscina, y un equipo dedicado a que no te falte nada.",
  },
  stats: [
    { id: "years", value: "10", label: "Años de experiencia" },
    { id: "events", value: "350", label: "Eventos celebrados" },
    { id: "guests", value: "4000", label: "Invitados al año" },
  ],
  contact: {
    phone: "+34 600 123 456",
    email: "hola@villa-aurora.demo",
    address: "Ctra. del Campo, km 12 · Región Central",
  },
};

export const TEMPLATE_REGISTRY: Record<TemplateId, TemplateDefinition> = {
  "toll-story": {
    id: "toll-story",
    label: "Toll Story",
    description:
      "Landing para espacios de eventos: hero, estadísticas, salas, servicios, workflow y testimonios.",
    demoContent: tollStoryDemo,
  },
  velar: {
    id: "velar",
    label: "Velar",
    description:
      "Landing de lujo para real estate: preloader typewriter, house scroll animation, galería de vídeos y sección de contacto exclusiva.",
    demoContent: VELAR_DEFAULT_CONTENT,
  },
};

export function getAllTemplates() {
  return Object.values(TEMPLATE_REGISTRY);
}

export function getTemplate(id: string): TemplateDefinition | undefined {
  if (!isValidTemplateId(id)) return undefined;
  return TEMPLATE_REGISTRY[id];
}

export function isValidTemplateId(id: string): id is TemplateId {
  return id in TEMPLATE_REGISTRY;
}
