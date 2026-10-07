import type { LandingContent } from "@/lib/dashboard-data";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { RistoranteMenuGrid } from "@/components/templates/ristorante/ristorante-menu-grid";
import { RISTORANTE_COPY } from "@/components/templates/ristorante/ristorante-copy";

export function RistoranteMenuSection({ content }: { content: LandingContent }) {
  const heading = getSectionHeading(content, "carta", SECTION_HEADING_DEFAULTS.ristorante.carta);
  return (
    <section id="carta" className="relative bg-ristorante-cream py-16 md:py-24">
      <div className="mx-auto max-w-[1600px] px-5 md:px-8 lg:px-12"><div className="grid items-end gap-7 lg:grid-cols-[1fr_.65fr]">
        <div><p className="mb-3 text-xs font-black uppercase tracking-[.22em] text-ristorante-tomato">{RISTORANTE_COPY.menuEyebrow}</p><h2 className="ristorante-tight whitespace-pre-line font-ristorante-display text-[clamp(3.5rem,8vw,8.5rem)] leading-[.84]">{heading.title}</h2></div>
        <p className="max-w-xl pb-2 text-base leading-relaxed text-ristorante-olive/70 md:text-lg">{heading.subtitle}</p>
      </div></div>
      <RistoranteMenuGrid items={content.serviceMenu ?? []} />
    </section>
  );
}
