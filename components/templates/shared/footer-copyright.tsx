import type { ContactContent } from "@/lib/dashboard-data";
import { getCopyrightLine } from "@/lib/footer-content";

type FooterCopyrightProps = {
  brand: string;
  contact: ContactContent;
  className?: string;
  extraClassName?: string;
};

export function FooterCopyright({
  brand,
  contact,
  className = "text-xs text-white/30",
  extraClassName,
}: FooterCopyrightProps) {
  const extra = contact.copyrightExtra?.trim();

  return (
    <div className="space-y-2">
      <p className={className}>{getCopyrightLine(brand, contact)}</p>
      {extra ? <p className={extraClassName ?? className}>{extra}</p> : null}
    </div>
  );
}
