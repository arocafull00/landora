export function PortfolioProjectItemTagChip({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-primary-fixed px-2 py-0.5 font-label text-[0.625rem] font-medium text-primary-fixed-variant">
      {label}
    </span>
  );
}
