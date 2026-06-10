"use client";

import type { LandingContent } from "@/lib/dashboard-data";
import { FooterCopyright } from "@/components/templates/shared/footer-copyright";
import { FooterSocialLinks } from "@/components/templates/shared/footer-social-links";
import { getSectionHeading, SECTION_HEADING_DEFAULTS } from "@/lib/section-headings";

export function VelarContactSection({ content }: { content: LandingContent }) {
  const heading = getSectionHeading(
    content,
    "inquire",
    SECTION_HEADING_DEFAULTS.velar.inquire,
  );

  return (
    <footer
      id="inquire"
      className="relative z-[25] scroll-mt-24 bg-[#1a1a1a] px-6 py-12 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="space-y-4 text-center">
          <div className="space-y-2">
            <p
              className="text-sm font-bold uppercase tracking-widest text-[#8a8278]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {heading.title}
            </p>
            {content.contact.phone && (
              <a
                href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
                className="block text-sm text-[#e8e4df]/70 transition-colors hover:text-[#e8e4df]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {content.contact.phone}
              </a>
            )}
            {content.contact.email && (
              <a
                href={`mailto:${content.contact.email}`}
                className="block text-sm text-[#e8e4df]/70 transition-colors hover:text-[#e8e4df]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {content.contact.email}
              </a>
            )}
          </div>
          <FooterSocialLinks
            contact={content.contact}
            linkClassName="text-[#8a8278] transition-colors hover:text-[#e8e4df]"
          />
          <FooterCopyright
            brand={content.brand}
            className="text-xs text-[#8a8278]"
            contact={content.contact}
          />
        </div>
      </div>
    </footer>
  );
}
