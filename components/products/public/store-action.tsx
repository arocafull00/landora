import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STYLES = {
  primary: "bg-surface text-ink hover:bg-surface/80 hover:text-ink",
  secondary: "border border-ink/15 bg-transparent text-ink hover:bg-surface/50 hover:text-ink",
} as const;

export function StoreAction({ href, label, variant }: { href: string; label: string; variant: keyof typeof STYLES }) {
  if (!href || !label) return null;
  const external = /^https?:\/\//.test(href);
  return (
    <Button asChild variant="ghost" className={cn("h-auto rounded-full px-6 py-3.5 font-semibold", STYLES[variant])}>
      <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {label}
      </a>
    </Button>
  );
}
