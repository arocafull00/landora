import type { LandingContent } from "@/lib/dashboard-data";
import { FooterCopyright } from "@/components/templates/shared/footer-copyright";
import { FooterSocialLinks } from "@/components/templates/shared/footer-social-links";
import { VelarContactInstagram } from "@/components/templates/velar/velar-contact-instagram";
import { VelarMapsEmbed } from "@/components/templates/velar/velar-maps-embed";
import { getSocialUrl } from "@/lib/footer-content";
import { getVelarMapsEmbedSrc, getVelarMapsHref } from "@/lib/velar-links";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

export function VelarContactSection({
  content,
  copyrightYear,
}: {
  content: LandingContent;
  copyrightYear: number;
}) {
  const heading = getSectionHeading(
    content,
    "inquire",
    SECTION_HEADING_DEFAULTS.velar.inquire,
  );
  const instagramHref = getSocialUrl(content.contact, "instagram");
  const mapsHref = getVelarMapsHref(
    content.mapsUrl,
    content.brand,
    content.contact.address,
  );
  const mapsEmbedSrc = getVelarMapsEmbedSrc(mapsHref);

  return (
    <footer
      data-section="inquire"
      data-section-label="Pie de página"
      id="inquire"
      className="relative z-[25] scroll-mt-24 bg-[var(--site-dark)] px-6 py-12 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="space-y-8 text-center">
          <div className="space-y-4">
            <div className="space-y-2">
              <p
                className="font-bold uppercase tracking-widest text-[var(--site-accent)] text-site-content"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {heading.title}
              </p>
              {content.contact.phone ? (
                <a
                  data-editor-id="inquire:phone"
                  href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
                  className="block text-[var(--site-on-dark)]/70 transition-colors hover:text-[var(--site-on-dark)] text-site-content"
                  data-analytics-event="phone_click lead_generated"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {content.contact.phone}
                </a>
              ) : null}
              {content.contact.email ? (
                <a
                  data-editor-id="inquire:email"
                  href={`mailto:${content.contact.email}`}
                  className="block text-[var(--site-on-dark)]/70 transition-colors hover:text-[var(--site-on-dark)] text-site-content"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {content.contact.email}
                </a>
              ) : null}
              {content.contact.address ? (
                <a
                  data-editor-id="inquire:address"
                  href={mapsHref}
                  className="block text-[var(--site-on-dark)]/70 transition-colors hover:text-[var(--site-on-dark)] text-site-content"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-body)" }}
                  target="_blank"
                >
                  {content.contact.address}
                </a>
              ) : null}
            </div>
            <VelarContactInstagram href={instagramHref} />
          </div>
          <VelarMapsEmbed href={mapsHref} src={mapsEmbedSrc} />
          <FooterSocialLinks
            contact={content.contact}
            linkClassName="text-[var(--site-accent)] transition-colors hover:text-[var(--site-on-dark)]"
          />
          <FooterCopyright
            brand={content.brand}
            className="text-[var(--site-accent)] text-site-content"
            contact={content.contact}
            year={copyrightYear}
          />
        </div>
      </div>
    </footer>
  );
}
