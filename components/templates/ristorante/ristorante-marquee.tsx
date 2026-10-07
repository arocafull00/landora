import { RistoranteMarqueeLine } from "@/components/templates/ristorante/ristorante-marquee-line";
import { RISTORANTE_COPY } from "@/components/templates/ristorante/ristorante-copy";

export function RistoranteMarquee({ brand, large = false }: { brand: string; large?: boolean }) {
  if (!large) return (
    <section id="franja" className="overflow-hidden bg-ristorante-olive py-4 text-ristorante-cream md:py-5" aria-label={RISTORANTE_COPY.specialties}>
      <div className="ristorante-track flex items-center whitespace-nowrap font-ristorante-display text-2xl md:text-4xl"><RistoranteMarqueeLine brand={brand} variant="specialties" /><RistoranteMarqueeLine brand={brand} variant="specialties" duplicate /></div>
    </section>
  );
  return (
    <section id="marquee" className="overflow-hidden bg-ristorante-olive py-8 text-ristorante-cream md:py-12">
      <div className="ristorante-track flex items-center whitespace-nowrap font-ristorante-display text-[clamp(3rem,7vw,8rem)] leading-none"><RistoranteMarqueeLine brand={brand} variant="large" /><RistoranteMarqueeLine brand={brand} variant="large" duplicate /></div>
      <div className="ristorante-track ristorante-reverse mt-5 flex items-center whitespace-nowrap font-ristorante-display text-[clamp(2.4rem,5vw,6rem)] leading-none opacity-80"><RistoranteMarqueeLine brand={brand} variant="reverse" /><RistoranteMarqueeLine brand={brand} variant="reverse" duplicate /></div>
    </section>
  );
}
