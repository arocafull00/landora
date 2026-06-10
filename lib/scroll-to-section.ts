import type { MouseEvent } from "react";

export function scrollToSectionId(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (!el) return false;

  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

export function scrollToSectionIdWhenReady(sectionId: string, attemptsLeft = 20) {
  if (scrollToSectionId(sectionId)) return;
  if (attemptsLeft <= 0) return;

  requestAnimationFrame(() => scrollToSectionIdWhenReady(sectionId, attemptsLeft - 1));
}

export function getHashSectionId() {
  const hash = window.location.hash;
  if (!hash || hash === "#") return undefined;
  return decodeURIComponent(hash.slice(1));
}

export function handleSectionNavClick(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
  onNavigate?: () => void,
) {
  if (!href.startsWith("#") || href === "#") return;

  const sectionId = decodeURIComponent(href.slice(1));
  if (!sectionId) return;

  event.preventDefault();
  scrollToSectionIdWhenReady(sectionId);
  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}${window.location.search}${href}`,
  );
  onNavigate?.();
}
