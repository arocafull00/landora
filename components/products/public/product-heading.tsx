import { ProductTag } from "./product-tag";

export function ProductHeading({ eyebrow, titleLead, titleAccent, subtitle, tags }: { eyebrow: string; titleLead: string; titleAccent: string; subtitle: string; tags: string[] }) {
  return (
    <div>
      {eyebrow ? <p className="mb-3 text-sm font-medium text-ink-secondary">{eyebrow}</p> : null}
      <h1 className="break-words text-balance font-headline text-4xl font-normal leading-[1.08] tracking-[-0.02em] text-ink sm:text-5xl xl:text-6xl">
        {titleLead} {titleAccent ? <em className="italic">{titleAccent}</em> : null}
      </h1>
      {subtitle ? <p className="mt-4 max-w-lg text-pretty text-base leading-7 text-ink-secondary">{subtitle}</p> : null}
      {tags.length ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <ProductTag key={`${tag}:${index}`} label={tag} index={index} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}
