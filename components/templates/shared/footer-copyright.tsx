import type { ContactContent } from "@/lib/dashboard-data";
import { getCopyrightLine } from "@/lib/footer-content";
import { FooterLandoraAttribution } from "@/components/templates/shared/footer-landora-attribution";

type FooterCopyrightProps = {
  brand: string;
  contact: ContactContent;
  year: number;
  className?: string;
  extraClassName?: string;
};

export function FooterCopyright({
  brand,
  contact,
  year,
  className = "text-white/30 text-site-content",
  extraClassName,
}: FooterCopyrightProps) {
  const extra = contact.copyrightExtra?.trim();

  return (
    <div className="space-y-2">
      <p className={className}>{getCopyrightLine(brand, contact, year)}</p>
      <FooterLandoraAttribution className={className} />
      {extra ? <p className={extraClassName ?? className}>{extra}</p> : null}
    </div>
  );
}
