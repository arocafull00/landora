"use client";

import { useEffect, useState } from "react";

export type ViewportSize = {
  w: number;
  h: number;
};

export function useViewportSize(): ViewportSize {
  const [size, setSize] = useState<ViewportSize>({ w: 0, h: 0 });

  useEffect(() => {
    const update = () => {
      setSize({ w: window.innerWidth, h: window.innerHeight });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}
