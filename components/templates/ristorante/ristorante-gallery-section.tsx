import type { LandingContent } from "@/lib/dashboard-data";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { AssetImage } from "@/components/ui/asset-image";
import { RISTORANTE_COPY } from "@/components/templates/ristorante/ristorante-copy";

export function RistoranteGallerySection({ content }: { content: LandingContent }) {
  const heading = getSectionHeading(content, "nosotros", SECTION_HEADING_DEFAULTS.ristorante.nosotros);
  const lines = heading.title.split("\n");
  const interior = content.gallery?.[2];
  const table = content.gallery?.[3];
  const detail = content.gallery?.[4];
  return (
    <section id="nosotros" className="relative overflow-hidden bg-ristorante-cream py-20 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-8 lg:px-12">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_.75fr] lg:items-end"><h2 className="ristorante-tight whitespace-pre-line font-ristorante-display text-[clamp(3.6rem,8vw,8rem)] leading-[.86]">{lines.slice(0, -1).join("\n")}{lines.length > 1 ? <br /> : null}<span className="text-ristorante-tomato">{lines.at(-1)}</span></h2><p className="max-w-xl text-lg leading-relaxed text-ristorante-olive/70">{heading.subtitle}</p></div>
        <div id="galeria" className="relative min-h-[760px] scroll-mt-24 md:min-h-[940px]">
          <div className="ristorante-shadow-12 absolute left-0 top-4 h-[52%] w-[75%] overflow-hidden border-[10px] border-ristorante-paper md:w-[62%] md:border-[14px]" data-parallax="7"><AssetImage src={interior?.image ?? ""} alt={interior?.title ?? ""} fill sizes="(min-width: 768px) 62vw, 75vw" className="object-cover" /></div>
          <div className="ristorante-shadow-tomato absolute right-0 top-[32%] h-[42%] w-[58%] rotate-3 overflow-hidden border-[10px] border-ristorante-cream md:w-[46%] md:border-[14px]" data-parallax="-6"><AssetImage src={table?.image ?? ""} alt={table?.title ?? ""} fill sizes="(min-width: 768px) 46vw, 58vw" className="object-cover" /></div>
          <div className="ristorante-shadow-orange absolute bottom-[4%] left-[8%] h-44 w-44 overflow-hidden rounded-full border-[8px] border-ristorante-cream md:h-64 md:w-64" data-parallax="11"><AssetImage src={detail?.image ?? ""} alt={detail?.title ?? ""} fill sizes="(min-width: 768px) 256px, 176px" className="object-cover" /></div>
          <div className="ristorante-shadow-6 absolute bottom-[9%] right-[5%] -rotate-6 border-2 border-ristorante-olive bg-ristorante-mustard px-5 py-4 font-ristorante-display text-xl md:text-3xl">{RISTORANTE_COPY.galleryStamp}</div>
        </div>
      </div>
    </section>
  );
}
