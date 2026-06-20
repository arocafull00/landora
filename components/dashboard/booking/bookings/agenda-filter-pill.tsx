export function AgendaFilterPill({
  label,
  active,
  color,
  onClick,
}: {
  label: string;
  active: boolean;
  color?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-body text-body-sm transition-colors ${
        active
          ? "border-primary bg-primary-container text-on-primary-container"
          : "border-outline-variant bg-surface text-on-surface hover:bg-surface-container-high"
      }`}
    >
      {color && (
        <span
          className="size-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      )}
      {label}
    </button>
  );
}
