import type { LandingContent } from "@/lib/dashboard-data";
import { resolveGalleryItems } from "@/lib/gallery-content";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { SIGNAL_CHROME } from "@/components/templates/signal/signal-copy";

const LEGACY_TITLES = new Set([
  "Soluciones reales.",
  "Problemas reales. Soluciones reales.",
]);

export function getSignalCaseContent(content: LandingContent) {
  const gallery = resolveGalleryItems("signal", content.gallery ?? []);
  const cases = gallery.filter((item) => item.title?.trim());
  const fallback = SECTION_HEADING_DEFAULTS.signal.capacidades;
  const storedHeading = getSectionHeading(content, "capacidades", fallback);
  const heading = {
    title: LEGACY_TITLES.has(storedHeading.title) ? fallback.title : storedHeading.title,
    subtitle: storedHeading.subtitle === "Cuatro proyectos, cuatro retos distintos."
      ? fallback.subtitle
      : storedHeading.subtitle,
  };
  const names = new Set(cases.map((item) => item.title?.trim()).filter((name): name is string => Boolean(name)));
  const clients = [
    ...SIGNAL_CHROME.caseClientOrder.filter((name) => names.has(name)),
    ...[...names].filter((name) => !SIGNAL_CHROME.caseClientOrder.some((client) => client === name)),
  ];

  return { gallery, cases, clients, heading };
}
