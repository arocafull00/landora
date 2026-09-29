import type { TeamMember } from "@/lib/dashboard-data";
import { SignalMedia } from "@/components/templates/signal/signal-media";

export function SignalProfile({ person }: { person: TeamMember }) {
  return (
    <div className="grid max-w-3xl gap-6 border-t border-[var(--site-on-dark)]/25 pt-6 sm:grid-cols-[auto_1fr]">
      {person.image ? (
        <div className="relative h-40 w-40 overflow-hidden grayscale">
          <SignalMedia alt={person.name} className="object-cover" sizes="160px" src={person.image} />
        </div>
      ) : null}
      <div>
        <p className="mb-3 uppercase tracking-[0.18em] text-[var(--site-accent)] text-site-content-sm">{person.name} · {person.role}</p>
        <p className="leading-relaxed text-[var(--site-on-dark)]/85 text-[clamp(1.125rem,1.8vw,1.5rem)]">{person.bio}</p>
      </div>
    </div>
  );
}
