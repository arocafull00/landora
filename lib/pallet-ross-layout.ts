import { getTimeForProgress } from "@/lib/bezier-utils";

export const HERO_ROW_Y = 522;
export const CARD_SIZE = 220;

export const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const hoverEase: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

export type FanSlot = {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  z: number;
};

export const FAN_SLOTS: FanSlot[] = [
  { x: -480, y: 18, rotate: -18, scale: 0.88, z: 1 },
  { x: -310, y: 6, rotate: -10, scale: 0.92, z: 2 },
  { x: -155, y: -2, rotate: -4, scale: 0.96, z: 3 },
  { x: 0, y: -8, rotate: 0, scale: 1, z: 4 },
  { x: 160, y: -2, rotate: 5, scale: 0.96, z: 3 },
  { x: 320, y: 6, rotate: 12, scale: 0.92, z: 2 },
  { x: 480, y: 18, rotate: 20, scale: 0.88, z: 1 },
];

export type CascadeSlot = {
  top: number;
  left: number;
  rotate: number;
  z: number;
};

export const CASCADE_LAYOUT: CascadeSlot[] = Array.from({ length: 7 }, (_, i) => ({
  top: 300 + i * 70,
  left: 20 + i * 150,
  rotate: -3 + i * 3,
  z: 7 - i,
}));

export const INTRO_DELAY = 0.8;
export const INTRO_DURATION = 0.72;
export const TRAVEL_TO_RIGHT_DURATION = 0.6;
export const SWEEP_LEFT_DURATION = 1.6;
export const TOTAL_INTRO_DURATION =
  INTRO_DURATION + TRAVEL_TO_RIGHT_DURATION + SWEEP_LEFT_DURATION;

export const SWEEP_START =
  INTRO_DELAY + INTRO_DURATION + TRAVEL_TO_RIGHT_DURATION;

export function getRevealDuration(slotIndex: number): number {
  if (slotIndex <= 3) return 0.06;
  return 0.18;
}

export function getRevealDelay(slotIndex: number): number {
  const slot = FAN_SLOTS[slotIndex];
  const slot0 = FAN_SLOTS[0];
  const slot6 = FAN_SLOTS[6];
  const progress = (slot.x - slot6.x) / (slot0.x - slot6.x);
  const revealTime = getTimeForProgress(progress, smoothEase);
  return SWEEP_START + revealTime * SWEEP_LEFT_DURATION;
}
