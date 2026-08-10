export function SignalNavItem({
  href,
  label,
  scene,
}: {
  href: string;
  label: string;
  scene: string;
}) {
  return (
    <a
      className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--site-on-dark)]/55 transition-colors hover:text-[var(--site-on-dark)] data-[active=true]:text-[var(--site-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)]"
      data-signal-nav-item
      data-scene={scene}
      data-active="false"
      href={href}
      style={{ fontFamily: "var(--site-font-body)" }}
    >
      {label}
    </a>
  );
}
