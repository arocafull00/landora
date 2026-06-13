export const OFICIO_PRO_ASSETS = {
  hero: "/templates/oficio-pro/hero.webp",
  gas1: "/templates/oficio-pro/service-gas-1.jpg",
  gas2: "/templates/oficio-pro/service-gas-2.jpg",
  gas3: "/templates/oficio-pro/service-gas-3.jpg",
  thermal1: "/templates/oficio-pro/service-energy-1.webp",
  thermal2: "/templates/oficio-pro/service-energy-2.webp",
  thermal3: "/templates/oficio-pro/service-energy-3.webp",
} as const;

export const OFICIO_PRO_IMAGE_OPTIONS = [
  { value: OFICIO_PRO_ASSETS.hero, label: "Portada" },
  { value: OFICIO_PRO_ASSETS.gas1, label: "Gas 1" },
  { value: OFICIO_PRO_ASSETS.gas2, label: "Gas 2" },
  { value: OFICIO_PRO_ASSETS.gas3, label: "Gas 3" },
  { value: OFICIO_PRO_ASSETS.thermal1, label: "Energía 1" },
  { value: OFICIO_PRO_ASSETS.thermal2, label: "Energía 2" },
  { value: OFICIO_PRO_ASSETS.thermal3, label: "Energía 3" },
] as const;
