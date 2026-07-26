import type { SocialLink } from "@/lib/dashboard-data";
import { SOCIAL_PLATFORM_LABELS } from "@/lib/footer-content";
import { SocialPlatformIcon } from "@/components/templates/shared/social-platform-icon";

type FooterSocialLinkProps = {
  link: SocialLink;
  className?: string;
};

export function FooterSocialLink({ link, className }: FooterSocialLinkProps) {
  return (
    <a
      aria-label={SOCIAL_PLATFORM_LABELS[link.platform]}
      className={className}
      href={link.url}
      rel="noopener noreferrer"
      target="_blank"
      title={SOCIAL_PLATFORM_LABELS[link.platform]}
    >
      <SocialPlatformIcon platform={link.platform} />
    </a>
  );
}
