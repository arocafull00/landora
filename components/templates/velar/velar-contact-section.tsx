"use client";

import type { LandingContent } from "@/lib/dashboard-data";

export function VelarContactSection({ content }: { content: LandingContent }) {
  return (
    <footer
      id="inquire"
      className="relative z-[25] bg-[#1a1a1a] px-6 py-12 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="space-y-4 text-center">
          <div className="space-y-2">
            <p
              className="text-sm font-bold uppercase tracking-widest text-[#8a8278]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Contacto:
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
          <p
            className="text-xs text-[#8a8278]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Copyright © {new Date().getFullYear()} {content.brand.replace(".", "")} | Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
