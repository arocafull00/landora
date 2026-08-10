import { SignalMedia } from "@/components/templates/signal/signal-media";

export function SignalPortalPlane({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  if (!src) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute overflow-hidden border border-[var(--site-on-dark)]/20 ${className}`}
      data-signal-portal-plane
    >
      <SignalMedia
        alt={alt}
        className="object-cover grayscale contrast-125"
        sizes="40vw"
        src={src}
      />
      <div className="absolute inset-0 bg-[var(--site-dark)]/35" />
    </div>
  );
}
