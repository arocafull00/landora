import type { ReactNode } from "react";

export function NuvoletsLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  if (!href) return <span className={className}>{children}</span>;
  return <a href={href} className={className} {...(/^https?:\/\//.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>;
}
