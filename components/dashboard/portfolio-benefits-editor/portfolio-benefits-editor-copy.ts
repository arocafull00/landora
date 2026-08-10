export const PORTFOLIO_BENEFITS_EDITOR_COPY = {
  title: "Cómo trabajo",
  description: "Edita los principios que explican tu forma de trabajar.",
  addItem: "Añadir elemento",
  addItemAriaLabel: "Añadir elemento",
  untitledItem: "Elemento sin título",
  moveUpAriaLabel: "Subir elemento",
  moveDownAriaLabel: "Bajar elemento",
  deleteItem: "Eliminar elemento",
} as const;

export const PORTFOLIO_BENEFIT_ICON_OPTIONS = [
  { label: "Objetivo", value: "target" },
  { label: "Colaboración", value: "users" },
  { label: "Crecimiento", value: "trending-up" },
  { label: "Tiempo", value: "clock" },
] as const;

export function getPortfolioBenefitIconLabel(icon: string) {
  return (
    PORTFOLIO_BENEFIT_ICON_OPTIONS.find((option) => option.value === icon)?.label ??
    "Objetivo"
  );
}
