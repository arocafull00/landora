import { Badge } from "@/components/ui/badge";
import { ProductTag } from "./product-tag";

export function ProductHeading({ eyebrow, titleLead, titleAccent, subtitle, tags }: { eyebrow: string; titleLead: string; titleAccent: string; subtitle: string; tags: string[] }) {
  return (
    <div>
      {eyebrow ? <Badge className="mb-4 bg-tone-4 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-ink/60">{eyebrow}</Badge> : null}
      <h1 className="font-headline text-5xl font-normal leading-[.98] sm:text-6xl">
        {titleLead} {titleAccent ? <em className="italic">{titleAccent}</em> : null}
      </h1>
      {subtitle ? <p className="mt-4 max-w-xl text-base leading-7 text-ink/60">{subtitle}</p> : null}
      {tags.length ? (
        <ul className="mt-7 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <ProductTag key={`${tag}:${index}`} label={tag} index={index} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}
