const LEGACY_TEMPLATE_ASSET_PATH = "/landora/templates/toll-story/";
const TEMPLATE_ASSET_PATH = "/landora/templates/velar/";

export const VELAR_BG_IMG =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260603_073200_7082add5-f1f8-4873-8696-d6f78a44089b.png&w=1920&q=85";

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

export function isVelarHouseAsset(url: string) {
  if (!url) return false;
  return url.includes("/velar/hero.png") || url.endsWith("/hero.png");
}

export function resolveVelarHeroImages(hero: {
  image: string;
  houseImage?: string;
}) {
  let houseImage = hero.houseImage ?? "";
  let backgroundImage = hero.image;

  if (!houseImage) {
    if (isVelarHouseAsset(hero.image)) {
      houseImage = hero.image;
      backgroundImage = VELAR_BG_IMG;
    } else {
      houseImage = VELAR_ASSETS.hero;
    }
  }

  return { backgroundImage, houseImage };
}

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
