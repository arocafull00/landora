export function SignalPortalLine({
  line,
  index,
}: {
  line: string;
  index: number;
}) {
  return (
    <p
      className="overflow-hidden font-bold uppercase leading-[0.9] tracking-[-0.04em] text-[var(--site-on-dark)] text-site-content"
      data-signal-portal-line
      style={{
        fontFamily: "var(--site-font-display)",
        marginLeft: `${(index % 3) * 8}%`,
      }}
    >
      {line}
    </p>
  );
}
