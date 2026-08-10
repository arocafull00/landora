export function PalletRossPrimaryButton({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`cursor-pointer border-none font-heading text-[15px] font-semibold text-white transition-colors hover:bg-[var(--site-primary-hover)] ${className}`}
      style={{
        background: "var(--site-text)",
        padding: "14px 28px",
        borderRadius: 9999,
      }}
    >
      {label}
    </button>
  );
}

export function PalletRossSecondaryButton({
  label,
  outlined = false,
  className = "",
}: {
  label: string;
  outlined?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`cursor-pointer bg-transparent font-heading text-[15px] font-medium text-[var(--site-text)] transition-colors hover:bg-[rgba(0,0,0,0.06)] ${className}`}
      style={{
        padding: outlined ? "14px 20px" : "14px 20px",
        borderRadius: 9999,
        border: outlined ? "1.5px solid rgba(0,0,0,0.15)" : "none",
      }}
    >
      {label}
    </button>
  );
}
