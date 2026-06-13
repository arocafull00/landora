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
    <article className="group flex gap-4 rounded-2xl border border-[#1F4E79]/10 bg-white/90 p-5 shadow-[0_12px_30px_rgba(31,78,121,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(31,78,121,0.13)]">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#1F4E79]/10 text-[#1F4E79] transition-colors group-hover:bg-[#F59E0B]/20 group-hover:text-[#17212B]">
        {getIconElement(item.category, index)}
      </div>
      <div className="min-w-0">
        <h3 className="text-lg font-black uppercase leading-tight tracking-normal text-[#17212B]">
          {item.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#4A4A4A]">
          {item.description}
        </p>
        {item.price ? (
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-[#1F4E79]">
            {item.price}
          </p>
        ) : null}
      </div>
    </article>
  );
}
