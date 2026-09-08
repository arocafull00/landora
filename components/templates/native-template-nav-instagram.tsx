import type { HeroNavTone } from "@/components/templates/shared/heroes/hero-variant-types";
import { SocialPlatformIcon } from "@/components/templates/shared/social-platform-icon";
import { cn } from "@/lib/utils";

export function NativeTemplateNavInstagram({
  className,
  href,
  overlay,
  showLabel = false,
  tone,
}: {
  className?: string;
  href: string;
  overlay: boolean;
  showLabel?: boolean;
  tone: HeroNavTone;
}) {
  return (
    <a
      aria-label="Instagram"
      className={cn(
        "inline-flex items-center gap-2 transition-colors",
        overlay && tone === "light"
          ? "text-[var(--site-on-dark)]/80 hover:text-[var(--site-on-dark)]"
          : overlay
            ? "text-[var(--site-primary)]/75 hover:text-[var(--site-primary)]"
            : "text-[var(--site-text-muted)] hover:text-[var(--site-text)]",
        className,
      )}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <SocialPlatformIcon className="size-5" platform="instagram" />
      {showLabel ? <span className="font-semibold text-site-content">Instagram</span> : null}
    </a>
  );
}
