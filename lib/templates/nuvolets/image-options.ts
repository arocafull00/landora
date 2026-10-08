import { NUVOLETS_HERO_IMAGE, NUVOLETS_DEFAULT_CONFIG } from "@/lib/nuvolets-defaults";

export const NUVOLETS_IMAGE_OPTIONS = [{ value: NUVOLETS_HERO_IMAGE, label: "Hero" }, ...NUVOLETS_DEFAULT_CONFIG.products.map((p) => ({ value: p.image, label: p.name }))];
