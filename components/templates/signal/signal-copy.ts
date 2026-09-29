export const SIGNAL_HERO_NOTE = {
  lead: "No necesitas saber qué software necesitas.",
  body: "Analizamos cómo trabaja tu empresa, detectamos dónde se pierde tiempo y proponemos qué merece la pena automatizar.",
} as const;

export const SIGNAL_CHROME = {
  skipLink: "Saltar al contenido",
  scrollCue: "SCROLL PARA ENTRAR",
  tryCtaArrow: "↗",
  progressLabel: "PROGRESO",
  availableNow: "SOBRE MÍ",
  processLabel: "EL PROCESO",
  processIntro: "Estos son los pasos que seguiríamos juntos, desde entender cómo trabajáis hasta poner en marcha una solución útil.",
  casesEyebrow: "RESULTADOS REALES",
  casesClients: "EMPRESAS CON LAS QUE HE TRABAJADO",
  caseClientOrder: ["DocMorris", "Flumotion", "Circulantis", "Clínica de psicología 21 días"],
  casesClosing: "Sectores distintos. El mismo objetivo:",
  casesClosingAccent: "utilizar software para trabajar mejor.",
  caseAction: "VER CASO",
  caseStudyBack: "Volver a casos",
  caseStudyDetail: "EL CASO",
  caseImageAlt: "Imagen del caso",
  caseStudyProblem: "Problema",
  caseStudySolution: "Solución",
  caseStudyImpact: "Impacto",
  caseStudyMethod: "Cómo se hizo",
  caseStudyCtaLead: "¿Tienes un proceso parecido en tu empresa?",
  caseStudyCtaAction: "Cuéntame cómo trabajáis",
} as const;

export const SIGNAL_CONTACT_COPY = {
  name: "Nombre",
  company: "Empresa",
  email: "Email",
  phone: "Teléfono (opcional)",
  message: "¿Qué te gustaría mejorar?",
  submit: "Enviar mi caso",
  preview: "Vista previa: el envío estará disponible al publicar la página.",
  sent: "Mensaje enviado. Te responderé pronto.",
  invalid: "Revisa los campos del formulario.",
} as const;

export function getSignalMark(brand: string) {
  const match = brand.replace(/[^A-Za-zÀ-ÿ0-9]/g, "").charAt(0);
  if (!match) return "S";
  return match.toUpperCase();
}
