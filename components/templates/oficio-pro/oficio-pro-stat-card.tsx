import { BadgeCheck, Bolt, Gauge, Wrench } from "lucide-react";
import type { StatContent } from "@/lib/dashboard-data";

const icons = [Wrench, BadgeCheck, Gauge, Bolt];

export function OficioProStatCard({
  index,
  stat,
}: {
  index: number;
  stat: StatContent;
}) {
  const Icon = icons[index % icons.length];

  return (
    <article className="rounded-2xl border border-[#1F4E79]/10 bg-white p-5 shadow-[0_10px_28px_rgba(31,78,121,0.08)]">
      <Icon className="mb-6 size-8 text-[#1F4E79]" />
      <p className="text-4xl font-black uppercase leading-none tracking-normal text-[#17212B]">
        {stat.value}
      </p>
      <p className="mt-3 text-sm font-semibold text-[#4A4A4A]">{stat.label}</p>
    </article>
  );
}
