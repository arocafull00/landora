import type { ContactContent } from "@/lib/dashboard-data";
import { FooterSocialLink } from "@/components/templates/shared/footer-social-link";

type FooterSocialLinksProps = {
  contact: ContactContent;
  className?: string;
  linkClassName?: string;
};

export function FooterSocialLinks({
  contact,
  className = "flex flex-wrap items-center justify-center gap-4",
  linkClassName = "text-white/40 transition-colors hover:text-white",
}: FooterSocialLinksProps) {
  const links = contact.socialLinks ?? [];
  if (links.length === 0) return null;

  return (
    <div className={className}>
      {links.map((link) => (
        <FooterSocialLink className={linkClassName} key={link.platform} link={link} />
      ))}
    </div>
  );
}
