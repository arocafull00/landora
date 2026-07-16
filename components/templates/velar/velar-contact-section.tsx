"use client";

import type { LandingContent } from "@/lib/dashboard-data";
import { FooterCopyright } from "@/components/templates/shared/footer-copyright";
import { FooterSocialLinks } from "@/components/templates/shared/footer-social-links";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";
import { useEditorHighlight } from "@/lib/use-editor-highlight";
import { cn } from "@/lib/utils";
import { useAnalytics } from "@/hooks/use-analytics";

export function VelarContactSection({ content }: { content: LandingContent }) {
  const { trackPhoneClick, trackLeadGenerated } = useAnalytics();
  const isHighlighted = useEditorHighlight("inquire");
  const heading = getSectionHeading(
    content,
    "inquire",
    SECTION_HEADING_DEFAULTS.velar.inquire,
  );

  return (
    <footer
      data-section="inquire"
      data-section-label="Pie de página"
      id="inquire"
      className={cn(
        "relative z-[25] scroll-mt-24 bg-[var(--site-dark)] px-6 py-12 md:px-10 lg:px-16",
        isHighlighted && "template-section--highlighted",
      )}
    >
      <div className="mx-auto max-w-6xl">
        <div className="space-y-4 text-center">
          <div className="space-y-2">
            <p
              className="text-sm font-bold uppercase tracking-widest text-[var(--site-accent)]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {heading.title}
            </p>
            {content.contact.phone && (
              <a
                data-editor-id="inquire:phone"
                href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
                className="block text-sm text-[var(--site-on-dark)]/70 transition-colors hover:text-[var(--site-on-dark)]"
                style={{ fontFamily: "var(--font-body)" }}
                onClick={() => {
                  trackPhoneClick();
                  trackLeadGenerated();
                }}
              >
                {content.contact.phone}
              </a>
            )}
            {content.contact.email && (
              <a
                data-editor-id="inquire:email"
                href={`mailto:${content.contact.email}`}
                className="block text-sm text-[var(--site-on-dark)]/70 transition-colors hover:text-[var(--site-on-dark)]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {content.contact.email}
              </a>
            )}
            {content.contact.address && (
              <p
                data-editor-id="inquire:address"
                className="text-sm text-[var(--site-on-dark)]/70"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {content.contact.address}
              </p>
            )}
          </div>
          <FooterSocialLinks
            contact={content.contact}
            linkClassName="text-[var(--site-accent)] transition-colors hover:text-[var(--site-on-dark)]"
          />
          <FooterCopyright
            brand={content.brand}
            className="text-xs text-[var(--site-accent)]"
            contact={content.contact}
          />
        </div>
      </div>
    </footer>
  );
}
