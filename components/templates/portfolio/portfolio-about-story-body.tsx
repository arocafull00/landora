export function PortfolioAboutStoryBody({ body }: { body: string }) {
  return (
    <details className="group flex h-full w-full flex-col justify-center" open>
      <summary className="mb-5 cursor-pointer text-sm font-semibold text-[var(--site-accent)] marker:text-[var(--site-accent)]">
        Historia
      </summary>
      <p
        className="whitespace-pre-line text-pretty text-lg font-light leading-relaxed text-[var(--site-on-dark)]/75 sm:text-xl lg:text-xl"
        data-editor-id="about-story-body"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        {body}
      </p>
    </details>
  );
}
