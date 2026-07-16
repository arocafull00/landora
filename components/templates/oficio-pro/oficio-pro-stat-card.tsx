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
    <article className="rounded-2xl border border-[var(--site-primary)]/10 bg-[var(--site-surface)] p-5 shadow-[0_10px_28px_rgba(31,78,121,0.08)]">
      <Icon className="mb-6 size-8 text-[var(--site-primary)]" />
      <p className="text-4xl font-black uppercase leading-none tracking-normal text-[var(--site-text)]">
        {stat.value}
      </p>
      <p className="mt-3 text-sm font-semibold text-[var(--site-text-muted)]">{stat.label}</p>
    </article>
  );
}
