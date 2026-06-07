const LEGACY_TEMPLATE_ASSET_PATH = "/landora/templates/toll-story/";
const TEMPLATE_ASSET_PATH = "/landora/templates/velar/";

export function remapLegacyTemplateAssetUrl(url: string): string {
  if (!url.includes(LEGACY_TEMPLATE_ASSET_PATH)) return url;
  return url.replaceAll(LEGACY_TEMPLATE_ASSET_PATH, TEMPLATE_ASSET_PATH);
}

export const VELAR_ASSETS = {
  hero: "https://res.cloudinary.com/dqwkkrqal/image/upload/v1780849457/landora/templates/velar/hero.png",
  logo: "https://res.cloudinary.com/dqwkkrqal/image/upload/v1780849458/landora/templates/velar/logo.png",
  toll1: "https://res.cloudinary.com/dqwkkrqal/image/upload/v1780849458/landora/templates/velar/toll1.jpg",
  toll2: "https://res.cloudinary.com/dqwkkrqal/image/upload/v1780849459/landora/templates/velar/toll2.jpg",
  toll3: "https://res.cloudinary.com/dqwkkrqal/image/upload/v1780849460/landora/templates/velar/toll3.jpg",
  toll4: "https://res.cloudinary.com/dqwkkrqal/image/upload/v1780849461/landora/templates/velar/toll4.jpg",
  toll5: "https://res.cloudinary.com/dqwkkrqal/image/upload/v1780849461/landora/templates/velar/toll5.jpg",
  toll6: "https://res.cloudinary.com/dqwkkrqal/image/upload/v1780849462/landora/templates/velar/toll6.jpg",
  toll7: "https://res.cloudinary.com/dqwkkrqal/image/upload/v1780849463/landora/templates/velar/toll7.jpg",
} as const;

export const VELAR_IMAGE_OPTIONS = [
  { value: VELAR_ASSETS.hero, label: "hero.png" },
  { value: VELAR_ASSETS.toll7, label: "toll7.jpeg" },
  { value: VELAR_ASSETS.toll6, label: "toll6.jpeg" },
  { value: VELAR_ASSETS.toll5, label: "toll5.jpeg" },
  { value: VELAR_ASSETS.toll4, label: "toll4.jpeg" },
  { value: VELAR_ASSETS.toll3, label: "toll3.jpeg" },
  { value: VELAR_ASSETS.toll2, label: "toll2.jpeg" },
  { value: VELAR_ASSETS.toll1, label: "toll1.jpg" },
] as const;
