import type { ReactNode } from "react";
export function PalletRossNavIconButton({ label, children }: { label: string; children: ReactNode }) {
  return <button type="button" aria-label={label} className="cursor-pointer border-none bg-transparent p-2">{children}</button>;
}
