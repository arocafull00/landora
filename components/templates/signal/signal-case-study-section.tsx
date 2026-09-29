export function SignalCaseStudySection({
  label,
  body,
}: {
  label: string;
  body: string;
}) {
  if (!body.trim()) return null;

  return (
    <section className="border-t border-[var(--site-on-dark)]/20 pt-8 first:border-t-0 first:pt-0">
      <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[var(--site-accent)]">
        {label}
      </h3>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--site-on-dark)]/85 sm:text-lg">
        {body.split(/\n\n+/).map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
