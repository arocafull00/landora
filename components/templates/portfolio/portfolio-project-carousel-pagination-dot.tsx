export function PortfolioProjectCarouselPaginationDot({
  active,
  index,
  onSelect,
}: {
  active: boolean;
  index: number;
  onSelect: (index: number) => void;
}) {
  return (
    <button
      aria-current={active ? "true" : undefined}
      aria-label={`Imagen ${index + 1}`}
      className={`size-2.5 rounded-full transition-colors ${
        active
          ? "bg-portfolio-accent"
          : "bg-portfolio-ink/45 hover:bg-portfolio-ink/70"
      }`}
      onClick={() => onSelect(index)}
      role="tab"
      type="button"
    />
  );
}
