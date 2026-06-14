"use client";

import { AssetImage } from "@/components/ui/asset-image";
import type { TeamMember } from "@/lib/dashboard-data";

export function RistoranteChefCard({
  member,
  offset = false,
}: {
  member: TeamMember;
  offset?: boolean;
}) {
  return (
    <article
      className={`group shrink-0 snap-start ${offset ? "md:mt-12" : ""}`}
      style={{ width: "min(72vw, 280px)" }}
    >
      <div className="relative mb-5 aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#e5e2dd]">
        {member.image ? (
          <AssetImage
            alt={member.name}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 72vw, 280px"
            src={member.image}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl font-bold text-[#8B2500]/30">
            {member.name.charAt(0)}
          </div>
        )}
      </div>
      <h3
        className="text-lg font-bold text-[#1C1917]"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {member.name}
      </h3>
      {member.role && (
        <p className="mt-1 text-sm font-medium text-[#8B2500]">{member.role}</p>
      )}
      {member.bio && (
        <p className="mt-3 text-sm leading-relaxed text-[#1C1917]/70">{member.bio}</p>
      )}
    </article>
  );
}
