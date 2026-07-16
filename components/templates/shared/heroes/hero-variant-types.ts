import type { RefObject } from "react";
import type { LandingContent } from "@/lib/dashboard-data";

export type HeroNavTone = "dark" | "light";

export type HeroSpecificField = "houseImage" | "fanImages";

export type HeroVariantProps = {
  content: LandingContent;
  heroRef: RefObject<HTMLElement | null>;
  primaryCtaHref: string;
  secondaryCtaHref: string;
};
