import { AssetImage } from "@/components/ui/asset-image";
import { PortfolioAboutStoryBody } from "@/components/templates/portfolio/portfolio-about-story-body";
import type { PortfolioAboutPageContent } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

export function PortfolioAboutStorySection({
  about,
}: {
  about: PortfolioAboutPageContent;
}) {
  if (!about.storyBody.trim()) return null;

  return (
    <section className="bg-[var(--site-surface)] px-6 py-24 md:px-10 md:py-32 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <h2
          className="mb-12 text-balance text-3xl font-extrabold text-[var(--site-accent)] sm:text-4xl md:mb-16 md:text-[clamp(32px,5vw,48px)]"
          data-editor-id="about-story-title"
          style={{
            fontFamily: "var(--font-syne)",
            letterSpacing: "-0.02em",
          }}
        >
          <span className="relative inline-block">
            {about.storyTitle}
            <span className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-[var(--site-accent)]" />
          </span>
        </h2>

        <div
          className={cn(
            "grid gap-6 lg:gap-8",
            about.storyImage
              ? "lg:grid-cols-[minmax(280px,0.65fr)_minmax(0,1.35fr)] lg:items-stretch"
              : "max-w-4xl",
          )}
        >
          {about.storyImage ? (
            <div
              className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[var(--site-border)] bg-[var(--site-surface)] lg:self-start"
              data-editor-id="about-story-image"
            >
              <AssetImage
                alt={about.storyTitle}
                className="object-cover"
                fill
                sizes="(max-width: 1023px) 100vw, 34vw"
                src={about.storyImage}
              />
            </div>
          ) : null}

          <article className="flex h-full rounded-2xl bg-[var(--site-dark)] p-7 sm:p-10 lg:p-12">
            <PortfolioAboutStoryBody body={about.storyBody} />
          </article>
        </div>
      </div>
    </section>
  );
}
