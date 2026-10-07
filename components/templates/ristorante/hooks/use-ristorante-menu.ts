"use client";

import { useEffect, useRef, useState } from "react";
import type { ServiceMenuItem } from "@/lib/dashboard-data";
import { RISTORANTE_COPY } from "@/components/templates/ristorante/ristorante-copy";

export function useRistoranteMenu(items: ServiceMenuItem[]) {
  const [active, setActive] = useState("");
  const [displayed, setDisplayed] = useState("");
  const [hiding, setHiding] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frame = useRef(0);
  const categories = [{ id: "", label: RISTORANTE_COPY.all }, ...Array.from(new Set(items.map((item) => item.category))).map((category) => ({ id: category, label: category }))];

  const onFilter = (category: string) => {
    if (timer.current) clearTimeout(timer.current);
    cancelAnimationFrame(frame.current);
    setActive(category);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayed(category);
      setHiding(false);
      return;
    }
    setHiding(true);
    timer.current = setTimeout(() => {
      setDisplayed(category);
      frame.current = requestAnimationFrame(() => {
        frame.current = requestAnimationFrame(() => setHiding(false));
      });
    }, 180);
  };

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
    cancelAnimationFrame(frame.current);
  }, []);

  const visibleItems = items.map((item, index) => ({ item, index })).filter(({ item }) => !displayed || item.category === displayed);
  return { active, categories, hiding, onFilter, visibleItems };
}
