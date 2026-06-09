"use client";

import { ThemedLottieBackground } from "@/components/ui/themed-lottie-background";
import type { TemplatePalette } from "@/lib/template-palettes";

const SIGN_IN_PALETTE: TemplatePalette = {
  primary: "#0050cb",
  secondary: "#505f76",
  accent: "#0050cb",
  muted: "#0050cb",
  surface: "#f8fafc",
  foreground: "#0050cb",
};

export function SignInBackground() {
  return (
    <ThemedLottieBackground
      palette={SIGN_IN_PALETTE}
      src="/backgrounds/lottie/waves-bottom.json"
    />
  );
}
