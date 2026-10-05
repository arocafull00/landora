import Link from "next/link";
import { getLandoraSiteUrl } from "@/lib/landora-site-url";
import { cn } from "@/lib/utils";

type FooterLandoraAttributionProps = {
  className?: string;
};

export function FooterLandoraAttribution({ className }: FooterLandoraAttributionProps) {
  return (
    <Link
      href={getLandoraSiteUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-block transition-[color,opacity] hover:opacity-100 hover:underline underline-offset-2",
        className,
      )}
    >
      Created at Landora
    </Link>
  );
}
