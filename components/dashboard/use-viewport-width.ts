"use client";

import { useEffect, useState } from "react";
import { DESKTOP_WIDTH } from "@/components/dashboard/preview-utils";

export function useViewportWidth() {
  const [width, setWidth] = useState(DESKTOP_WIDTH);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return width;
}
