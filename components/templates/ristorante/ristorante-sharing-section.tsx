import type { LandingContent } from "@/lib/dashboard-data";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { AssetImage } from "@/components/ui/asset-image";
import { RISTORANTE_COPY } from "@/components/templates/ristorante/ristorante-copy";

export function RistoranteSharingSection({ content }: { content: LandingContent }) {
  const heading = getSectionHeading(content, "compartir", SECTION_HEADING_DEFAULTS.ristorante.compartir);
  const image = content.gallery?.[0];
  const lines = heading.title.split("\n");
  return (
    <section id="compartir" className="relative overflow-hidden bg-ristorante-paper py-20 md:py-32">
      <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:px-12">
        <div className="relative min-h-[420px] md:min-h-[560px]">
          <div className="ristorante-shadow-14 absolute left-[2%] top-[6%] h-[72%] w-[76%] -rotate-3 overflow-hidden border-[10px] border-ristorante-cream md:border-[14px]" data-parallax="10"><AssetImage src={image?.image ?? ""} alt={image?.title ?? ""} fill sizes="(min-width: 1024px) 38vw, 76vw" className="object-cover" /></div>
          <div className="ristorante-shadow-7 absolute bottom-0 right-[2%] grid h-36 w-36 rotate-6 place-items-center whitespace-pre-line rounded-full bg-ristorante-tomato text-center font-ristorante-display text-lg text-ristorante-cream md:h-48 md:w-48">{RISTORANTE_COPY.sharingStamp}</div>
        </div>
        <div className="ristorante-reveal">
          <p className="mb-5 text-xs font-black uppercase tracking-[.22em] text-ristorante-tomato">{RISTORANTE_COPY.sharingEyebrow}</p>
          <h2 className="ristorante-tight whitespace-pre-line font-ristorante-display text-[clamp(3.4rem,7vw,7.7rem)] leading-[.88]">{lines.slice(0, 2).join("\n")}{lines.length > 2 ? <><br /><span className="text-ristorante-tomato">{lines[2]}</span>{lines.length > 3 ? <><br />{lines.slice(3).join("\n")}</> : null}</> : null}</h2>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-ristorante-olive/70">{content.story?.statement}</p>
        </div>
      </div>
    </section>
  );
}
