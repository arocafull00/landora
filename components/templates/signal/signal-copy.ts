export const SIGNAL_CHROME = {
  skipLink: "Saltar al contenido",
  scrollCue: "SCROLL PARA ENTRAR",
  tryCtaArrow: "↗",
  progressLabel: "PROGRESO",
  availableNow: "AHORA DISPONIBLE",
} as const;

export function getSignalMark(brand: string) {
  const match = brand.replace(/[^A-Za-zÀ-ÿ0-9]/g, "").charAt(0);
  if (!match) return "N";
  return match.toUpperCase();
}

export function getSignalPortalLines(statement: string) {
  const lines = statement
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length > 0) return lines;
  return ["PENSAR", "EL PROYECTO", "ENTEROS", "SIN ATALAJOS"];
}
