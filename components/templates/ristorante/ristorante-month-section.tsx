import type { LandingContent } from "@/lib/dashboard-data";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { AssetImage } from "@/components/ui/asset-image";
import { RistoranteIngredient } from "@/components/templates/ristorante/ristorante-ingredient";
import { RISTORANTE_COPY } from "@/components/templates/ristorante/ristorante-copy";

export function RistoranteMonthSection({ content }: { content: LandingContent }) {
  const heading = getSectionHeading(content, "especial", SECTION_HEADING_DEFAULTS.ristorante.especial);
  const image = content.gallery?.[1];
  return (
    <section id="especial" className="relative overflow-hidden bg-ristorante-tomato py-20 text-ristorante-cream md:py-28">
      <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-5 md:px-8 lg:grid-cols-[.72fr_1.28fr] lg:px-12">
        <div className="ristorante-reveal relative z-20">
          <p className="mb-4 text-xs font-black uppercase tracking-[.22em] text-ristorante-olive">{RISTORANTE_COPY.monthEyebrow}</p>
          <h2 className="whitespace-pre-line font-ristorante-display text-[clamp(3.6rem,7vw,8rem)] leading-[.83] tracking-[-.05em]">{heading.title}</h2>
          <div className="ristorante-shadow-6 mt-7 inline-block -rotate-2 bg-ristorante-cream px-5 py-3 text-ristorante-olive"><span className="font-ristorante-display text-3xl">{image?.description}</span></div>
          <div className="mt-7 grid max-w-sm grid-cols-2 gap-2 text-sm font-bold">{content.benefits?.map((item) => <RistoranteIngredient key={item.id} item={item} />)}</div>
        </div>
        <div className="relative min-h-[460px] md:min-h-[620px]">
          <div className="absolute left-1/2 top-1/2 aspect-square w-[88%] max-w-[710px] -translate-x-1/2 -translate-y-1/2"><div className="ristorante-wiggle ristorante-shadow-18 relative size-full overflow-hidden rounded-full border-[14px] border-ristorante-cream"><AssetImage src={image?.image ?? ""} alt={image?.title ?? ""} fill sizes="(min-width: 1024px) 55vw, 88vw" className="object-cover" /></div></div>
          <span className="absolute left-[5%] top-[10%] -rotate-6 bg-ristorante-mustard px-3 py-2 text-xs font-black text-ristorante-olive">{RISTORANTE_COPY.monthSweet}</span>
          <span className="absolute bottom-[13%] right-[1%] rotate-6 rounded-full border-2 border-ristorante-cream px-4 py-2 text-xs font-black">{RISTORANTE_COPY.monthLimited}</span>
        </div>
      </div>
    </section>
  );
}
