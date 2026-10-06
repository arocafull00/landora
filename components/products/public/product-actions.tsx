import { ArrowRight, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const COPY = { consult: "Consultar por WhatsApp", store: "Ver tienda" } as const;

export function ProductActions({ whatsappHref, hasStore }: { whatsappHref: string | null; hasStore: boolean }) {
  if (!whatsappHref && !hasStore) return null;
  return (
    <div className="mt-5 flex flex-col gap-3">
      {hasStore ? (
        <Button asChild className="h-auto w-full rounded-full px-6 py-4 text-base font-semibold hover:bg-primary-hover">
          <a href="#tienda"><Store aria-hidden className="size-5" />{COPY.store}</a>
        </Button>
      ) : null}
      {whatsappHref ? (
        <Button asChild variant={hasStore ? "outline" : "default"} className={cn("h-auto w-full whitespace-normal rounded-full border-primary px-6 py-4 font-semibold", hasStore ? "text-ink hover:bg-tone-1" : "hover:bg-primary-hover")}>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
            {COPY.consult}
            <ArrowRight aria-hidden />
          </a>
        </Button>
      ) : null}
    </div>
  );
}
