import type { LandingContent } from "@/lib/dashboard-data";
import { Separator } from "@/components/ui/separator";
import { RISTORANTE_COPY } from "@/components/templates/ristorante/ristorante-copy";

export function RistoranteFooter({ content, copyrightYear }: { content: LandingContent; copyrightYear: number }) {
  return (
    <footer className="bg-ristorante-olive px-5 py-8 text-ristorante-cream md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1600px]"><Separator className="bg-ristorante-cream/20" /><div className="flex flex-col gap-4 pt-7 md:flex-row md:items-end md:justify-between">
        <div><div className="font-ristorante-display text-3xl">{content.brand}</div><p className="mt-2 text-sm text-ristorante-cream/60">{RISTORANTE_COPY.footer}</p></div>
        <div className="text-xs tracking-[.12em] text-ristorante-cream/50"><p>© {copyrightYear} {content.brand}{content.contact.copyrightSuffix ? ` · ${content.contact.copyrightSuffix}` : ""}</p>{content.contact.copyrightExtra ? <p className="mt-2">{content.contact.copyrightExtra}</p> : null}</div>
      </div></div>
    </footer>
  );
}
