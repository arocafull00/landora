import type { GalleryItem } from "@/lib/dashboard-data";

type SignalCaseDefaults = Pick<
  GalleryItem,
  | "linkType"
  | "projectSlug"
  | "caseProblem"
  | "projectBody"
  | "caseImpact"
  | "caseMethod"
>;

export const SIGNAL_CASE_DEFAULTS_BY_ID: Record<string, SignalCaseDefaults> = {
  "signal-docmorris": {
    linkType: "internal",
    projectSlug: "docmorris",
    caseProblem:
      "DocMorris necesitaba llevar capacidades de inteligencia artificial a productos digitales ya en producción, con usuarios reales en web y móvil. El reto no era un prototipo aislado: había que encajar nuevos flujos, servicios externos y experiencias coherentes dentro de una plataforma de salud que ya operaba a escala.",
    projectBody:
      "Desarrollé e integré funcionalidades de IA en las aplicaciones web y móvil, incluyendo un agente conversacional y la integración con CAIRE. Conecté servicios externos, definí los flujos dentro del producto y aseguré que las nuevas piezas encajaran con el resto de la experiencia.",
    caseImpact:
      "Las capacidades de IA pasaron a formar parte del producto que ya usan pacientes y equipos internos, no de un experimento aparte. El trabajo se centró en desplegar valor en entornos reales, con la complejidad que implica una plataforma digital de salud.",
    caseMethod:
      "TypeScript · React · integraciones con servicios de IA · APIs internas y de terceros.\nPrioricé contratos claros entre front y servicios de IA para poder iterar sin romper flujos existentes.",
  },
  "signal-flumotion": {
    linkType: "internal",
    projectSlug: "flumotion",
    caseProblem:
      "Flumotion necesitaba una plataforma OTT para distribuir contenido audiovisual en web y otros dispositivos. El producto tenía que sostener consumo real, gestión de catálogo y una experiencia consistente más allá de una demo técnica.",
    projectBody:
      "Participé en el desarrollo del producto OTT: reproducción, navegación y piezas clave de la plataforma orientadas a usuarios finales y a la operación del contenido en múltiples dispositivos.",
    caseImpact:
      "La empresa contó con una base digital preparada para distribuir y consumir contenido en producción, alineada con un producto de streaming y no con un desarrollo puntual sin continuidad.",
    caseMethod:
      "Stack web orientado a producto digital y streaming.\nTrabajo sobre arquitectura ya existente, priorizando estabilidad en reproducción y despliegues incrementales.",
  },
  "signal-21dias-informes": {
    linkType: "internal",
    projectSlug: "21-dias-informes",
    caseProblem:
      "En la Clínica de psicología 21 días, elaborar un informe clínico implicaba recoger resultados de evaluaciones, ordenarlos y redactarlos a mano. Era un proceso largo, repetitivo y sensible a errores, que restaba tiempo al equipo clínico.",
    projectBody:
      "Construí una herramienta en la que los profesionales introducen los resultados de las evaluaciones y el sistema procesa la información y genera el informe de forma automática, centralizando el flujo en un solo lugar.",
    caseImpact:
      "25h → ~1h\nEl tiempo de elaboración del informe se redujo de forma drástica. El equipo dejó de dedicar jornadas completas a tareas de consolidación y pudo centrarse en el seguimiento clínico.",
    caseMethod:
      "Web app a medida · lógica de negocio en servidor · generación automatizada de documentos.\nModelé el informe como plantilla parametrizable para que los cambios de contenido no obligaran a rehacer el proceso.",
  },
  "signal-21dias-seguimiento": {
    linkType: "internal",
    projectSlug: "21-dias-diariamente",
    caseProblem:
      "Entre consultas, el equipo necesitaba visibilidad sobre cómo evolucionaban los pacientes. Sin un canal estructurado, el seguimiento dependía de conversaciones sueltas y datos dispersos.",
    projectBody:
      "Desarrollé una aplicación para que los pacientes registren periódicamente cómo se encuentran y los profesionales consulten esa evolución desde una única plataforma compartida.",
    caseImpact:
      "Diariamente\nEl seguimiento pasó a ser continuo y consultable en un solo sitio, con menos fricción para el paciente y más contexto para el profesional antes de cada sesión.",
    caseMethod:
      "Web app · formularios periódicos · panel para el equipo clínico.\nSeparé la experiencia paciente y profesional manteniendo un mismo modelo de datos.",
  },
  "signal-circulantis-licitaciones": {
    linkType: "internal",
    projectSlug: "circulantis-licitaciones",
    caseProblem:
      "Circulantis revisaba manualmente nuevas licitaciones públicas cada día. Encontrar las oportunidades relevantes entre el volumen de publicaciones consumía tiempo y dependía de una revisión constante.",
    projectBody:
      "Implementé un sistema que recopila licitaciones nuevas, extrae su información y filtra automáticamente las que encajan con los criterios de la empresa.",
    caseImpact:
      "El equipo deja de depender de una búsqueda manual diaria para detectar oportunidades. Las licitaciones relevantes llegan priorizadas y listas para evaluar.",
    caseMethod:
      "Automatización de recopilación · procesado de datos · reglas de filtrado configurables.\nPrioricé pipelines reproducibles para poder ajustar criterios sin reescribir el sistema.",
  },
  "signal-circulantis-viabilidad": {
    linkType: "internal",
    projectSlug: "circulantis-viabilidad",
    caseProblem:
      "Cuando una licitación parecía interesante, analizar su documentación para decidir si merecía la pena presentarse requería mucho trabajo manual y criterios poco homogéneos entre personas.",
    projectBody:
      "Construí una herramienta interna en la que el equipo carga la documentación de una licitación y obtiene un análisis estructurado de viabilidad según los criterios definidos por la empresa.",
    caseImpact:
      "Las decisiones de presentarse o descartar una licitación se apoyan en un informe consistente, más rápido de producir que un análisis ad hoc en hojas de cálculo y correos.",
    caseMethod:
      "Software interno · análisis documental asistido · criterios de negocio parametrizables.\nCombiné extracción de información con reglas explícitas para que el equipo pudiera confiar en el resultado.",
  },
};

export function enrichSignalGalleryItem(item: GalleryItem): GalleryItem {
  const normalizedItem = /^21 d[ií]as$/i.test(item.title?.trim() ?? "")
    ? { ...item, title: "Clínica de psicología 21 días" }
    : item;
  const defaults = SIGNAL_CASE_DEFAULTS_BY_ID[normalizedItem.id];
  if (!defaults) return normalizedItem;

  return {
    ...normalizedItem,
    linkType: normalizedItem.linkType && normalizedItem.linkType !== "none" ? normalizedItem.linkType : defaults.linkType,
    projectSlug: normalizedItem.projectSlug?.trim() ? normalizedItem.projectSlug : defaults.projectSlug,
    caseProblem: normalizedItem.caseProblem?.trim() ? normalizedItem.caseProblem : defaults.caseProblem,
    projectBody: normalizedItem.projectBody?.trim() ? normalizedItem.projectBody : defaults.projectBody,
    caseImpact: normalizedItem.caseImpact?.trim() ? normalizedItem.caseImpact : defaults.caseImpact,
    caseMethod: normalizedItem.caseMethod?.trim() ? normalizedItem.caseMethod : defaults.caseMethod,
  };
}

export function enrichSignalGallery(gallery: GalleryItem[]) {
  return gallery.map(enrichSignalGalleryItem);
}
