import type { RistoranteEditorValues } from "@/lib/schemas/ristorante-editor";

export const RISTORANTE_EDITOR_COPY = {
  title: "Título",
  subtitle: "Texto de la sección",
  description: "Descripción",
  category: "Categoría",
  price: "Precio",
  image: "Imagen",
  apply: "Aplicar cambios",
  applied: "Cambios aplicados a la vista previa",
  invalid: "Revisa los campos del formulario",
  menu: "Carta",
  sharing: "Compartir",
  month: "Pizza del mes",
  gallery: "Nosotros y galería",
  hours: "Horarios",
  menuDescription: "Edita las fotografías, categorías, platos y precios de la carta.",
  sectionDescription: "Edita los textos e imágenes de esta sección.",
} as const satisfies Record<string, string>;

export const EMPTY_RISTORANTE_EDITOR_VALUES: RistoranteEditorValues = { title: "", subtitle: "", description: "", category: "", price: "", image: "" };
