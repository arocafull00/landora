import { MapPin } from "lucide-react";

export function VelarMapsEmbed({
  href,
  src,
}: {
  href: string;
  src: string;
}) {
  if (!src) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--site-on-dark)]/15">
      <iframe
        allowFullScreen
        className="h-64 w-full border-0 md:h-80"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={src}
        title="Ubicación en Google Maps"
      />
      <a
        className="inline-flex w-full items-center justify-center gap-2 bg-[var(--site-on-dark)]/5 px-4 py-3 text-[var(--site-on-dark)]/80 transition-colors hover:bg-[var(--site-on-dark)]/10 hover:text-[var(--site-on-dark)] text-site-content"
        href={href}
        rel="noopener noreferrer"
        style={{ fontFamily: "var(--font-body)" }}
        target="_blank"
      >
        <MapPin aria-hidden className="size-4" />
        Ver en Google Maps
      </a>
    </div>
  );
}
