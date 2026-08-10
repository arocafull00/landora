const BASE = "/templates/pallet-ross";

export const PALLET_ROSS_ASSETS = {
  card1: `${BASE}/card-1.png`,
  card2: `${BASE}/card-2.png`,
  card3: `${BASE}/card-3.png`,
  card4: `${BASE}/card-4.png`,
  card5: `${BASE}/card-5.png`,
  card6: `${BASE}/card-6.png`,
  card7: `${BASE}/card-7.png`,
  banner1: `${BASE}/banner-1.png`,
  banner2: `${BASE}/banner-2.png`,
  banner3: `${BASE}/banner-3.png`,
} as const;

export const PALLET_ROSS_CARD_IMAGES = [
  PALLET_ROSS_ASSETS.card1,
  PALLET_ROSS_ASSETS.card2,
  PALLET_ROSS_ASSETS.card3,
  PALLET_ROSS_ASSETS.card4,
  PALLET_ROSS_ASSETS.card5,
  PALLET_ROSS_ASSETS.card6,
  PALLET_ROSS_ASSETS.card7,
] as const;

export const PALLET_ROSS_BANNER_IMAGES = [
  PALLET_ROSS_ASSETS.banner1,
  PALLET_ROSS_ASSETS.banner2,
  PALLET_ROSS_ASSETS.banner3,
] as const;
