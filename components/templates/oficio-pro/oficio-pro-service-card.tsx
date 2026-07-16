import { CalendarCheck, Flame, Lightbulb, Wrench } from "lucide-react";
import type { ServiceMenuItem } from "@/lib/dashboard-data";

function getIconElement(category: string, index: number) {
  if (category === "Instalaciones") {
    return index % 2 === 0 ? (
      <Lightbulb className="size-6" />
    ) : (
      <CalendarCheck className="size-6" />
    );
  }
  return index % 2 === 0 ? <Wrench className="size-6" /> : <Flame className="size-6" />;
}

export function OficioProServiceCard({
  index,
  item,
}: {
  index: number;
  item: ServiceMenuItem;
}) {
  return (
    <article className="group flex gap-4 rounded-2xl border border-[var(--site-primary)]/10 bg-[var(--site-surface)]/90 p-5 shadow-[0_12px_30px_rgba(31,78,121,0.08)] transition-[box-shadow,transform] hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(31,78,121,0.13)]">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--site-primary)]/10 text-[var(--site-primary)] transition-colors group-hover:bg-[var(--site-accent-bright)]/20 group-hover:text-[var(--site-text)]">
        {getIconElement(item.category, index)}
      </div>
      <div className="min-w-0">
        <h3 className="text-lg font-black uppercase leading-tight tracking-normal text-[var(--site-text)]">
          {item.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--site-text-muted)]">
          {item.description}
        </p>
        {item.price ? (
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--site-primary)]">
            {item.price}
          </p>
        ) : null}
      </div>
    </article>
  );
}
