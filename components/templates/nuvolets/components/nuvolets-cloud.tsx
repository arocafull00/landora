export function NuvoletsCloud({ face = false, className = "" }: { face?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 120 70" className={className} aria-hidden="true">
      <g fill="currentColor"><rect x="14" y="36" width="92" height="28" rx="14" /><circle cx="42" cy="34" r="20" /><circle cx="72" cy="28" r="26" /><circle cx="94" cy="42" r="16" /></g>
      {face ? <g className="text-nuvolets-text"><circle cx="54" cy="40" r="3" fill="currentColor" /><circle cx="78" cy="40" r="3" fill="currentColor" /><path d="M60 46q6 6 12 0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></g> : null}
    </svg>
  );
}
