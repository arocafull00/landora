import { AssetImage } from "@/components/ui/asset-image";
import type { PortfolioAboutPageContent } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

export function PortfolioAboutHero({
  about,
}: {
  about: PortfolioAboutPageContent;
}) {
  return (
    <section className="bg-portfolio-canvas px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-36 lg:px-12 lg:pb-28">
      <div
        className={cn(
          "mx-auto grid max-w-7xl items-center gap-12 lg:gap-20",
          about.image
            ? "md:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.75fr)]"
            : "max-w-4xl",
        )}
      >
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-portfolio-accent">
            About me
          </p>
          <h1
            className="mt-5 text-balance text-5xl font-bold leading-[0.96] tracking-[-0.05em] text-portfolio-ink sm:text-6xl lg:text-7xl"
            data-editor-id="about-title"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {about.title}
          </h1>
          <div className="my-8 h-px w-20 bg-portfolio-accent sm:my-10" />
          {about.intro ? (
            <p
              className="max-w-2xl whitespace-pre-line text-pretty text-xl font-light leading-relaxed text-portfolio-ink sm:text-2xl"
              data-editor-id="about-intro"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {about.intro}
            </p>
          ) : null}
        </div>

        {about.image ? (
          <div
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-portfolio-line bg-[var(--site-surface)]"
            data-editor-id="about-image"
          >
            <AssetImage
              alt={about.title}
              className="object-cover"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 40vw"
              src={about.image}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
