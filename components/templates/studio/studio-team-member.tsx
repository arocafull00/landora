import { AssetImage } from "@/components/ui/asset-image";
import type { TeamMember } from "@/lib/dashboard-data";

export function StudioTeamMember({
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
      <div className="relative mb-5 aspect-[3/4] w-full overflow-hidden rounded-xl bg-[var(--site-surface-alt)]">
        {member.image ? (
          <AssetImage
            alt={member.name}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 72vw, 280px"
            src={member.image}
          />
        ) : (
          <div className="flex h-full items-center justify-center font-bold text-[var(--site-primary)]/30 text-site-title">
            {member.name.charAt(0)}
          </div>
        )}
      </div>
      <h3
        className="font-bold text-[var(--site-text)] text-site-title"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        {member.name}
      </h3>
      {member.role && (
        <p className="mt-1 font-medium text-[var(--site-primary)] text-site-content">{member.role}</p>
      )}
      {member.bio && (
        <p className="mt-3 leading-relaxed text-[var(--site-text-muted)] text-site-content">{member.bio}</p>
      )}
    </article>
  );
}
