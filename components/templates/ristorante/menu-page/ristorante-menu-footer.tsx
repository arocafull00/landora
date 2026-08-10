import { Mail, MapPin, Phone, UtensilsCrossed } from "lucide-react";
import type { ContactContent } from "@/lib/dashboard-data";
import { FooterCopyright } from "@/components/templates/shared/footer-copyright";
import { FooterSocialLinks } from "@/components/templates/shared/footer-social-links";

export function RistoranteMenuFooter({
  brand,
  contact,
  copyrightYear,
}: {
  brand: string;
  contact: ContactContent;
  copyrightYear: number;
}) {

  return (
    <footer
      className="m-2 rounded-[1.75rem] bg-[var(--ristorante-secondary)] px-6 py-14 text-center text-[var(--ristorante-foreground)] sm:m-4 sm:rounded-[2rem] sm:px-10"
      id="contacto"
    >
      <div className="mx-auto max-w-4xl">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-[var(--ristorante-foreground)]/25">
          <UtensilsCrossed aria-hidden className="h-5 w-5" />
        </span>
        <h2
          className="mt-5 text-balance font-normal text-site-title"
          style={{ fontFamily: "var(--font-ristorante-display)" }}
        >
          {brand}
        </h2>

        <div
          className="mt-7 flex flex-col items-center justify-center gap-4 text-[var(--ristorante-foreground)]/72 md:flex-row md:flex-wrap md:gap-x-7 text-site-content"
          style={{ fontFamily: "var(--font-ristorante-body)" }}
        >
          {contact.address ? (
            <p className="inline-flex items-center gap-2">
              <MapPin aria-hidden className="h-4 w-4 text-[var(--ristorante-accent)]" />
              {contact.address}
            </p>
          ) : null}
          {contact.phone ? (
            <a
              className="inline-flex items-center gap-2 transition-colors hover:text-[var(--ristorante-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ristorante-accent)]"
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              data-analytics-event="phone_click"
            >
              <Phone aria-hidden className="h-4 w-4 text-[var(--ristorante-accent)]" />
              {contact.phone}
            </a>
          ) : null}
          {contact.email ? (
            <a
              className="inline-flex items-center gap-2 transition-colors hover:text-[var(--ristorante-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ristorante-accent)]"
              href={`mailto:${contact.email}`}
            >
              <Mail aria-hidden className="h-4 w-4 text-[var(--ristorante-accent)]" />
              {contact.email}
            </a>
          ) : null}
        </div>

        <p
          className="mt-8 leading-relaxed text-[var(--ristorante-foreground)]/50 text-site-content"
          style={{ fontFamily: "var(--font-ristorante-body)" }}
        >
          Consulta al equipo sobre alérgenos e intolerancias antes de realizar
          tu pedido.
        </p>

        <div className="mt-8 space-y-5 border-t border-[var(--ristorante-foreground)]/15 pt-7">
          <FooterSocialLinks
            contact={contact}
            linkClassName="text-[var(--ristorante-foreground)]/45 transition-colors hover:text-[var(--ristorante-foreground)]"
          />
          <FooterCopyright
            brand={brand}
            className="text-[var(--ristorante-foreground)]/35 text-site-content"
            contact={contact}
            year={copyrightYear}
          />
        </div>
      </div>
    </footer>
  );
}
