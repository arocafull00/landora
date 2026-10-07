import { ArrowUpRight } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { Separator } from "@/components/ui/separator";
import { RistoranteButton } from "@/components/templates/ristorante/ristorante-button";
import { RISTORANTE_COPY } from "@/components/templates/ristorante/ristorante-copy";

export function RistoranteContactSection({ content }: { content: LandingContent }) {
  const heading = getSectionHeading(content, "contacto", SECTION_HEADING_DEFAULTS.ristorante.contacto);
  const instagram = content.contact.socialLinks?.find((link) => link.platform === "instagram" && link.url);
  const instagramHandle = instagram ? `@${new URL(instagram.url).pathname.split("/").filter(Boolean)[0] ?? ""}` : "";
  const phoneHref = `tel:${content.contact.phone.replace(/[^+\d]/g, "")}`;
  return (
    <section id="contacto" className="bg-ristorante-paper py-20 md:py-28">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 md:px-8 lg:grid-cols-[1fr_.9fr] lg:px-12">
        <div><p className="mb-4 text-xs font-black uppercase tracking-[.22em] text-ristorante-tomato">{RISTORANTE_COPY.contactEyebrow}</p><h2 className="ristorante-tight whitespace-pre-line font-ristorante-display text-[clamp(3.4rem,7vw,7.5rem)] leading-[.86]">{heading.title}</h2></div>
        <div className="lg:mt-4"><Separator className="h-0.5 bg-ristorante-olive" /><div className="pt-7">
          <div className="grid gap-6 sm:grid-cols-2">
            <div><p className="text-xs font-black tracking-[.16em]">{RISTORANTE_COPY.hours}</p><p className="mt-2 text-lg">{content.workflow?.[0]?.title}</p></div>
            <div><p className="text-xs font-black tracking-[.16em]">{RISTORANTE_COPY.bookings}</p><a href={phoneHref} className="mt-2 block text-lg">{content.contact.phone}</a></div>
            <div><p className="text-xs font-black tracking-[.16em]">{RISTORANTE_COPY.address}</p><p className="mt-2 text-lg">{content.contact.address}</p></div>
            {instagram ? <div><p className="text-xs font-black tracking-[.16em]">{RISTORANTE_COPY.instagram}</p><a href={instagram.url} className="mt-2 block text-lg" target="_blank" rel="noreferrer">{instagramHandle}</a></div> : null}
          </div>
          {content.contact.phone ? <RistoranteButton href={phoneHref} className="mt-9 px-7 py-4 tracking-[.14em]">{content.contact.ctaLabel}<ArrowUpRight aria-hidden="true" /></RistoranteButton> : null}
        </div></div>
      </div>
    </section>
  );
}
