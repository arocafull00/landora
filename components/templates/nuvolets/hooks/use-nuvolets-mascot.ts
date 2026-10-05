"use client";

import { useState } from "react";
import type { NuvoletsContent } from "@/lib/schemas/nuvolets";

export function useNuvoletsMascot(config: NuvoletsContent["mascot"]) {
  const [index, setIndex] = useState(0);
  return { message: config.messages[index % Math.max(1, config.messages.length)]?.text ?? config.name, next: () => setIndex((value) => value + 1) };
}
