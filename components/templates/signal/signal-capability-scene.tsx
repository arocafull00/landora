import type { ServiceMenuItem } from "@/lib/dashboard-data";
import { SignalMedia } from "@/components/templates/signal/signal-media";

export function SignalCapabilityScene({
  item,
  index,
  image,
}: {
  item: ServiceMenuItem;
  index: number;
  image: string;
}) {
  return (
    <article
      className="absolute inset-0 flex flex-col justify-end bg-[var(--site-dark)] px-6 pb-16 pt-28 md:px-12"
      data-signal-capability
      style={{ zIndex: index + 1 }}
    >
      {image ? (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <SignalMedia
            alt=""
            className="object-cover grayscale"
            sizes="100vw"
            src={image}
          />
          <div className="absolute inset-0 bg-[var(--site-dark)]/78" />
          <div className="absolute inset-y-0 right-0 w-1/3 bg-[var(--site-accent)]/10" />
        </div>
      ) : null}
      <div className="relative z-10">
        <p
          className="mb-4 text-[11px] uppercase tracking-[0.24em] text-[var(--site-accent)]"
          style={{ fontFamily: "var(--site-font-body)" }}
        >
          {item.category || String(index + 1).padStart(2, "0")}
        </p>
        <h3
          className="max-w-[12ch] text-[clamp(3.5rem,14vw,10rem)] font-bold uppercase leading-[0.85] tracking-[-0.05em] text-[var(--site-on-dark)]"
          style={{ fontFamily: "var(--site-font-display)" }}
        >
          {item.name}
        </h3>
        <p
          className="mt-6 max-w-md text-base text-[var(--site-on-dark)]/75 md:text-lg"
          style={{ fontFamily: "var(--site-font-body)" }}
        >
          {item.description}
        </p>
      </div>
    </article>
  );
}
