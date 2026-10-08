import { PALLET_ROSS_CARD_IMAGES } from "@/lib/pallet-ross-assets";

export const PALLET_ROSS_IMAGE_OPTIONS = PALLET_ROSS_CARD_IMAGES.map((value, index) => ({
  value,
  label: `Card ${index + 1}`,
}));
