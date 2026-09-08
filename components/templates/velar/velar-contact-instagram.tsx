import { SocialPlatformIcon } from "@/components/templates/shared/social-platform-icon";

export function VelarContactInstagram({ href }: { href: string }) {
  if (!href) return null;

  return (
    <a
      className="inline-flex items-center justify-center gap-2 text-[var(--site-on-dark)]/70 transition-colors hover:text-[var(--site-on-dark)] text-site-content"
      href={href}
      rel="noopener noreferrer"
      style={{ fontFamily: "var(--font-body)" }}
      target="_blank"
    >
      <SocialPlatformIcon className="size-4" platform="instagram" />
      Instagram
    </a>
  );
}
