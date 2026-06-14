"use client";

import { AssetImage } from "@/components/ui/asset-image";
import type { TeamMember } from "@/lib/dashboard-data";

export function RistoranteChefCard({
  member,
  offset = false,
  scale = 1,
}: {
  member: TeamMember;
  offset?: boolean;
  scale?: number;
}) {
  const width = scale < 1 ? "min(64vw, 240px)" : "min(72vw, 280px)";

  return (
    <article
      className={`group shrink-0 snap-start ${offset ? "md:-mt-16" : ""}`}
      style={{ width }}
      tabIndex={member.bio ? 0 : undefined}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md bg-[var(--ristorante-primary)]/20">
        {member.image ? (
          <AssetImage
            alt={member.name}
            className="object-cover transition-transform duration-500 group-hover:scale-105 group-focus-within:scale-105"
            fill
            sizes="(max-width: 768px) 72vw, 280px"
            src={member.image}
          />
        ) : (
          <div
            className="flex h-full items-center justify-center text-4xl font-normal text-[var(--ristorante-accent)]/40"
            style={{ fontFamily: "var(--font-ristorante-display)" }}
          >
            {member.name.charAt(0)}
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--ristorante-secondary)]/95 via-[var(--ristorante-secondary)]/60 to-transparent px-4 pb-4 pt-20 transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0 [@media(hover:none)]:opacity-100">
          <h3
            className="text-lg font-normal text-[var(--ristorante-foreground)]"
            style={{ fontFamily: "var(--font-ristorante-display)" }}
          >
            {member.name}
          </h3>
          {member.role ? (
            <p
              className="mt-1 text-sm font-medium text-[var(--ristorante-accent)]"
              style={{ fontFamily: "var(--font-ristorante-body)" }}
            >
              {member.role}
            </p>
          ) : null}
        </div>
        {member.bio ? (
          <div className="absolute inset-0 flex items-end bg-[var(--ristorante-secondary)]/90 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:hidden">
            <p
              className="text-sm leading-relaxed text-[var(--ristorante-foreground)]/90"
              style={{ fontFamily: "var(--font-ristorante-body)", fontWeight: 300 }}
            >
              {member.bio}
            </p>
          </div>
        ) : null}
      </div>
      {member.bio ? (
        <p
          className="mt-3 text-sm leading-relaxed text-[var(--ristorante-secondary)]/75 [@media(hover:hover)]:hidden"
          style={{ fontFamily: "var(--font-ristorante-body)", fontWeight: 300 }}
        >
          {member.bio}
        </p>
      ) : null}
    </article>
  );
}
