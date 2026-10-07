const MARQUEE_COPY = { pizza: "PIZZA", pasta: "PASTA", antipasti: "ANTIPASTI", dolci: "DOLCI", amore: "AMORE", appetite: "BUON APPETITO", family: " · FAMIGLIA · POMODORO · BASILICO · FORNO ·" } as const;

export function RistoranteMarqueeLine({ brand, variant, duplicate = false }: { brand: string; variant: "specialties" | "large" | "reverse"; duplicate?: boolean }) {
  if (variant === "reverse") return <span aria-hidden={duplicate || undefined}><span className="text-ristorante-orange">{MARQUEE_COPY.appetite}</span>{MARQUEE_COPY.family}&nbsp;</span>;
  if (variant === "large") return <span aria-hidden={duplicate || undefined}>{MARQUEE_COPY.pizza} <i className="not-italic text-ristorante-tomato">{MARQUEE_COPY.pasta}</i> {MARQUEE_COPY.dolci} <span className="ristorante-outline">{MARQUEE_COPY.amore}</span> {brand}&nbsp;&nbsp;</span>;
  return <span aria-hidden={duplicate || undefined}>{MARQUEE_COPY.pizza} <b className="text-ristorante-tomato">·</b> {MARQUEE_COPY.pasta} <b className="text-ristorante-orange">·</b> {MARQUEE_COPY.antipasti} <b className="text-ristorante-tomato">·</b> {MARQUEE_COPY.dolci} <b className="text-ristorante-orange">·</b> {brand} <b className="text-ristorante-tomato">·</b>&nbsp;</span>;
}
