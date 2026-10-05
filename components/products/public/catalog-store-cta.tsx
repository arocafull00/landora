import { Cloud } from "lucide-react";
import type { CatalogStore } from "@/lib/catalog-presentation";
import { CatalogWave } from "./catalog-wave";
import { StoreAction } from "./store-action";

const COPY = { eyebrow: "¿Has visto algo que te gusta?", title: "Ven a verlo en persona", whatsapp: "Consultar por WhatsApp", message: "Hola, me gustaría consultar una prenda del catálogo." } as const;

export function CatalogStoreCta({ store, phone }: { store: CatalogStore; phone: string }) {
  const whatsappHref = phone ? `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(COPY.message)}` : "";
  return (
    <>
      <CatalogWave />
      <section id="tienda" className="relative overflow-hidden bg-tone-1 px-4 pb-20 pt-10 text-center sm:px-6 lg:px-8">
        <Cloud aria-hidden className="pointer-events-none absolute left-[8%] top-8 h-16 w-24 fill-surface text-surface opacity-55" strokeWidth={0} />
        <Cloud aria-hidden className="pointer-events-none absolute bottom-8 right-[10%] h-14 w-20 fill-surface text-surface opacity-50" strokeWidth={0} />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink/55">{COPY.eyebrow}</p>
          <h2 className="mt-4 text-balance font-headline text-4xl font-normal sm:text-5xl">{COPY.title}</h2>
          <p className="mx-auto mt-4 max-w-xl whitespace-pre-line text-pretty leading-7 text-ink/60">{store.text}</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <StoreAction href={whatsappHref} label={COPY.whatsapp} variant="primary" />
            <StoreAction href={store.primaryHref} label={store.primaryLabel} variant="secondary" />
            {whatsappHref ? null : <StoreAction href={store.secondaryHref} label={store.secondaryLabel} variant="secondary" />}
          </div>
        </div>
      </section>
    </>
  );
}
