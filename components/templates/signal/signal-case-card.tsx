import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { GalleryItem } from "@/lib/dashboard-data";
import { getSignalCaseHref, hasSignalCaseStudy } from "@/lib/signal-cases";
import { SignalMedia } from "@/components/templates/signal/signal-media";
import { SIGNAL_CHROME } from "@/components/templates/signal/signal-copy";

const CARD_SPANS = [
  "lg:col-span-6",
  "lg:col-span-6",
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
] as const;

export function SignalCaseCard({
  item,
  index,
  previewLandingId,
  demoMode = false,
}: {
  item: GalleryItem;
  index: number;
  previewLandingId?: string;
  demoMode?: boolean;
}) {
  const caseHref = item.projectSlug && hasSignalCaseStudy(item)
    ? getSignalCaseHref({ previewLandingId, projectSlug: item.projectSlug, demoMode })
    : null;
  const highlight = item.tags?.[1]?.trim();
  const hasLargeResult = index === 2 && Boolean(highlight);

  return (
    <article
      className={`group relative isolate flex min-h-[23rem] flex-col justify-between overflow-hidden border border-[var(--site-on-dark)]/20 bg-[var(--site-dark)] p-6 transition-colors duration-500 ease-out hover:border-[var(--site-on-dark)]/45 motion-reduce:transition-none sm:p-8 lg:p-9 ${CARD_SPANS[index] ?? "lg:col-span-6"} ${hasLargeResult ? "lg:min-h-[27rem]" : ""}`}
    >
      {item.image ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 opacity-60 transition-opacity duration-500 ease-out group-hover:opacity-80 motion-reduce:transition-none">
          <SignalMedia
            alt=""
            className="object-cover object-right grayscale transform-[scale(1)] transition-transform duration-700 ease-out motion-safe:group-hover:transform-[scale(1.05)] motion-reduce:transition-none"
            sizes="(max-width: 768px) 100vw, 50vw"
            src={item.image}
          />
        </div>
      ) : null}
      {!item.image && index === 1 ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden transition-[scale] duration-500 ease-out motion-safe:group-hover:scale-105 motion-reduce:transition-none">
          {[0, 1, 2, 3, 4].map((ring) => (
            <span
              key={ring}
              className="absolute left-[72%] top-1/2 aspect-square rounded-full border border-[var(--site-on-dark)]/45"
              style={{ width: `${15 + ring * 7}rem`, transform: "translate(-50%, -50%)" }}
            />
          ))}
        </div>
      ) : null}
      {!item.image && index === 2 ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden bg-gradient-to-l from-[var(--site-on-dark)]/35 via-[var(--site-on-dark)]/5 to-transparent transition-[scale] duration-500 ease-out motion-safe:group-hover:scale-105 motion-reduce:transition-none">
          <span className="absolute -bottom-28 right-[10%] size-72 rounded-full bg-[var(--site-on-dark)]/80" />
          <span className="absolute right-[40%] top-10 size-5 rounded-full bg-[var(--site-on-dark)]/70" />
        </div>
      ) : null}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[var(--site-dark)] via-[var(--site-dark)]/85 to-[var(--site-dark)]/45" />

      <div className="relative max-w-[28rem]">
        <p className="flex items-center gap-5 text-xs font-semibold tracking-[0.08em] text-[var(--site-accent)]">
          {String(index + 1).padStart(2, "0")}
          <span aria-hidden className="h-px w-9 bg-[var(--site-on-dark)]/35 transition-[width,background-color] duration-300 group-hover:w-14 group-hover:bg-[var(--site-accent)] motion-reduce:transition-none" />
        </p>
        {item.title ? (
          <p className="mt-5 text-[0.65rem] uppercase tracking-[0.2em] text-[var(--site-on-dark)]/55">
            {item.title}
          </p>
        ) : null}
        <h3
          className="mt-2 text-[clamp(1.7rem,2.3vw,2.2rem)] font-medium leading-tight tracking-[-0.035em]"
          style={{ fontFamily: "var(--site-font-display)" }}
        >
          {item.description}
        </h3>
        {item.projectBody ? (
          <p className="mt-4 max-w-[36rem] text-sm leading-relaxed text-[var(--site-on-dark)]/75 sm:text-base">
            {item.projectBody}
          </p>
        ) : null}
        {highlight ? (
          <p
            className={`mt-5 font-semibold leading-none tracking-[-0.05em] text-[var(--site-accent)] ${hasLargeResult ? "text-[clamp(2.3rem,4.4vw,4.5rem)]" : "text-[clamp(1.2rem,1.8vw,1.65rem)]"}`}
            style={{ fontFamily: "var(--site-font-display)" }}
          >
            {highlight}
          </p>
        ) : null}
        {item.tags?.[0] ? (
          <p className="mt-4 text-[0.65rem] uppercase tracking-[0.2em] text-[var(--site-on-dark)]/55">
            {item.tags[0]}
          </p>
        ) : null}
      </div>

      {caseHref ? (
        <Link
          className="relative mt-8 flex w-fit items-center gap-3 text-[0.7rem] uppercase tracking-[0.2em] text-[var(--site-on-dark)] underline decoration-[var(--site-on-dark)]/60 underline-offset-[6px] transition-colors hover:text-[var(--site-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)]"
          href={caseHref}
        >
          {SIGNAL_CHROME.caseAction}
          <ArrowRight aria-hidden className="size-4 transition-[translate] duration-300 motion-safe:group-hover:translate-x-1 motion-reduce:transition-none" />
        </Link>
      ) : null}
    </article>
  );
}
