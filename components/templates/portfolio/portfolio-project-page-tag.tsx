export function PortfolioProjectPageTag({ label }: { label: string }) {
  return (
    <li className="rounded-full border border-portfolio-line px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-portfolio-ink-muted">
      {label}
    </li>
  );
}
