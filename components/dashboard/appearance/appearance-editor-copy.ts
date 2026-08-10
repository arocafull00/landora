export type AppearanceEditorGroupId = "typography" | "design" | "text-size";

export const APPEARANCE_EDITOR_COPY = {
  title: "Diseño",
  description: "Elige una identidad visual preparada para tu plantilla.",
  groups: {
    typography: "Fuentes",
    design: "Diseño",
    textSize: "Tamaños de texto",
  },
  palettes: "Paleta de colores",
  typography: "Tipografía",
  buttons: "Botones",
  chips: "Chips",
  titles: "Títulos",
  subtitles: "Subtítulos",
  content: "Contenido",
  mixedTextSizes: "Varios tamaños",
} as const;

export const APPEARANCE_EDITOR_GROUP_ORDER: readonly AppearanceEditorGroupId[] = [
  "typography",
  "design",
  "text-size",
];

export const APPEARANCE_EDITOR_GROUP_LABELS: Record<AppearanceEditorGroupId, string> = {
  typography: APPEARANCE_EDITOR_COPY.groups.typography,
  design: APPEARANCE_EDITOR_COPY.groups.design,
  "text-size": APPEARANCE_EDITOR_COPY.groups.textSize,
};
