import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const COPY = { consult: "Consultar por WhatsApp", store: "Ver tienda" } as const;

export function ProductActions({ whatsappHref, hasStore }: { whatsappHref: string | null; hasStore: boolean }) {
  if (!whatsappHref && !hasStore) return null;
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      {whatsappHref ? (
        <Button asChild className="h-auto rounded-full px-6 py-4 font-semibold hover:bg-primary-hover">
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
            {COPY.consult}
            <ArrowRight aria-hidden />
          </a>
        </Button>
      ) : null}
      {hasStore ? (
        <Button asChild variant="outline" className="h-auto rounded-full border-primary bg-transparent px-6 py-4 font-semibold hover:bg-tone-1">
          <a href="#tienda">{COPY.store}</a>
        </Button>
      ) : null}
    </div>
  );
}
