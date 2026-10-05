"use client";

import { useEffect, useRef, useState } from "react";

export function useNuvoletsCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    for (const child of el.children) observer.observe(child);
    const changes = new MutationObserver(() => { for (const child of el.children) observer.observe(child); update(); });
    changes.observe(el, { childList: true });
    el.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); changes.disconnect(); el.removeEventListener("scroll", update); };
  }, []);
  const scroll = (direction: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("article");
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: direction * ((card?.getBoundingClientRect().width ?? 300) + gap), behavior: "auto" });
  };
  return { ref, edges, scroll };
}
