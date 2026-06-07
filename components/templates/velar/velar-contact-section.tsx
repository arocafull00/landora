"use client";

import type { LandingContent } from "@/lib/dashboard-data";

export function VelarContactSection({ content }: { content: LandingContent }) {
  return (
    <section
      id="inquire"
      className="relative z-[25] bg-[#213138] px-6 py-20 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <p
              className="uppercase text-white/40"
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 700,
                fontSize: "clamp(10px, 0.9vw, 13px)",
                letterSpacing: "0.18em",
              }}
            >
              Inquire
            </p>
            <h2
              className="mt-4 uppercase text-white"
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 800,
                fontSize: "clamp(32px, 4vw, 60px)",
                letterSpacing: "-0.03em",
                lineHeight: 0.92,
              }}
            >
              Let&apos;s find your
              <br />
              residence.
            </h2>
            <p
              className="mt-6 max-w-sm text-white/50"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "clamp(13px, 1.1vw, 16px)",
                lineHeight: 1.7,
                letterSpacing: "0.01em",
              }}
            >
              Contact our advisory team to explore available estates, arrange a
              private viewing, or discuss your acquisition brief.
            </p>

            {content.contact.email && (
              <a
                href={`mailto:${content.contact.email}`}
                className="mt-8 inline-flex items-center gap-3 border border-white/20 px-7 py-3.5 uppercase text-white transition-all hover:border-white/60 hover:bg-white/5"
                style={{
                  fontFamily: "var(--font-syne)",
                  fontWeight: 700,
                  fontSize: "clamp(10px, 0.9vw, 12px)",
                  letterSpacing: "0.14em",
                }}
              >
                Begin your inquiry
              </a>
            )}
          </div>

          <div className="flex flex-col justify-center gap-8 lg:border-l lg:border-white/10 lg:pl-16">
            {content.contact.phone && (
              <div>
                <p
                  className="uppercase text-white/30"
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 700,
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                  }}
                >
                  Phone
                </p>
                <a
                  href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
                  className="mt-1 text-white transition-opacity hover:opacity-60"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: "clamp(18px, 2vw, 28px)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {content.contact.phone}
                </a>
              </div>
            )}

            {content.contact.email && (
              <div>
                <p
                  className="uppercase text-white/30"
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 700,
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                  }}
                >
                  Email
                </p>
                <a
                  href={`mailto:${content.contact.email}`}
                  className="mt-1 text-white transition-opacity hover:opacity-60"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: "clamp(14px, 1.4vw, 20px)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {content.contact.email}
                </a>
              </div>
            )}

            {content.contact.address && (
              <div>
                <p
                  className="uppercase text-white/30"
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 700,
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                  }}
                >
                  Address
                </p>
                <p
                  className="mt-1 text-white/60"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: "clamp(13px, 1.2vw, 17px)",
                    letterSpacing: "0.01em",
                  }}
                >
                  {content.contact.address}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 flex items-center justify-between border-t border-white/10 pt-8">
          <span
            className="text-white/20"
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              fontSize: "clamp(11px, 1vw, 14px)",
              letterSpacing: "-0.01em",
            }}
          >
            {content.brand}
          </span>
          <span
            className="text-white/20"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "11px",
              letterSpacing: "0.06em",
            }}
          >
            © {new Date().getFullYear()} — All rights reserved
          </span>
        </div>
      </div>
    </section>
  );
}
