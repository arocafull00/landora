import { Mail, MapPin, Phone } from "lucide-react";
import type { LandingContent } from "@/lib/dashboard-data";
import { FooterCopyright } from "@/components/templates/shared/footer-copyright";
import { FooterSocialLinks } from "@/components/templates/shared/footer-social-links";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { SignalCtaButton } from "@/components/templates/signal/signal-cta-button";
import { SignalContactForm } from "@/components/templates/signal/signal-contact-form";

export function SignalContactSection({
  content,
  copyrightYear,
  slug,
  previewMode,
}: {
  content: LandingContent;
  copyrightYear: number;
  slug: string;
  previewMode: boolean;
}) {
  const heading = getSectionHeading(
    content,
    "contacto",
    SECTION_HEADING_DEFAULTS.signal.contacto,
  );
  const email = content.contact.email.trim();

  return (
    <footer
      id="contacto"
      data-signal-scene="contacto"
      className="scroll-mt-24 border-t border-[var(--site-on-dark)]/15 bg-[var(--site-dark)] px-4 py-20 text-[var(--site-on-dark)] md:px-8"
    >
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h2
            className="max-w-xl font-bold uppercase leading-[0.95] tracking-[-0.04em] text-[clamp(2.75rem,6vw,6rem)]"
            style={{ fontFamily: "var(--site-font-display)" }}
          >
            {heading.title}
          </h2>
          {heading.subtitle ? (
            <p
              className="mt-4 max-w-md text-[var(--site-on-dark)]/65 text-site-content"
              style={{ fontFamily: "var(--site-font-body)" }}
            >
              {heading.subtitle}
            </p>
          ) : null}
          {email ? (
            <div className="mt-8">
              <SignalCtaButton href={`mailto:${email}`} label={content.contact.ctaLabel || "Escríbeme"} />
            </div>
          ) : null}
          <div className="mt-10 space-y-5">
            {email ? (
              <div className="flex items-start gap-3">
                <Mail aria-hidden className="mt-0.5 h-4 w-4 text-[var(--site-accent)]" />
                <a className="break-all text-[var(--site-on-dark)]/85 transition-colors hover:text-[var(--site-on-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)] text-site-content" href={`mailto:${email}`}>
                  {email}
                </a>
              </div>
            ) : null}
            {content.contact.phone ? (
            <div className="flex items-start gap-3">
              <Phone aria-hidden className="mt-0.5 h-4 w-4 text-[var(--site-accent)]" />
              <a
                className="text-[var(--site-on-dark)]/85 transition-colors hover:text-[var(--site-on-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)] text-site-content"
                href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
                data-analytics-event="phone_click"
              >
                {content.contact.phone}
              </a>
            </div>
            ) : null}
            {content.contact.address ? (
            <div className="flex items-start gap-3">
              <MapPin aria-hidden className="mt-0.5 h-4 w-4 text-[var(--site-accent)]" />
              <p className="text-[var(--site-on-dark)]/85 text-site-content">{content.contact.address}</p>
            </div>
            ) : null}
            <FooterSocialLinks
              className="flex flex-wrap items-center gap-4 pt-2"
              contact={content.contact}
              linkClassName="text-[var(--site-on-dark)]/40 transition-colors hover:text-[var(--site-on-dark)]"
            />
          </div>
        </div>
        <SignalContactForm slug={slug} enabled={Boolean(slug) && !previewMode} />
      </div>
      <div className="mt-16 border-t border-[var(--site-on-dark)]/15 pt-6">
        <FooterCopyright
          brand={content.brand}
          contact={content.contact}
          year={copyrightYear}
          className="text-[var(--site-on-dark)]/35 text-site-content"
        />
      </div>
    </footer>
  );
}
