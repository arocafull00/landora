import type { LandingContent } from "@/lib/dashboard-data";
import { FooterCopyright } from "@/components/templates/shared/footer-copyright";
import { FooterSocialLinks } from "@/components/templates/shared/footer-social-links";

export function PalletRossContactSection({
  content,
  copyrightYear,
}: {
  content: LandingContent;
  copyrightYear: number;
}) {
  return (
    <footer
      id="contacto"
      className="relative z-10 scroll-mt-24 bg-[var(--site-text)] px-16 py-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-heading font-bold text-white text-site-title">
            {content.contact.ctaLabel ?? "Get in touch"}
          </h2>
          {content.contact.phone ? (
            <p className="mt-3 font-body text-white/70">{content.contact.phone}</p>
          ) : null}
          {content.contact.email ? (
            <p className="mt-1 font-body text-white/70">{content.contact.email}</p>
          ) : null}
        </div>
        <div className="flex flex-col items-start gap-4 md:items-end">
          <FooterSocialLinks
            contact={content.contact}
            linkClassName="text-white/40 transition-colors hover:text-white"
          />
          <FooterCopyright
            brand={content.brand}
            contact={content.contact}
            year={copyrightYear}
          />
        </div>
      </div>
    </footer>
  );
}
