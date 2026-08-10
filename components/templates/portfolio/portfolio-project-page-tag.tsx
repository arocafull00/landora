export function PortfolioProjectPageTag({ label }: { label: string }) {
  return (
    <li className="rounded-full border border-portfolio-line px-3 py-1.5 font-semibold uppercase tracking-[0.16em] text-portfolio-ink-muted text-site-chip">
      {label}
    </li>
  );
}
