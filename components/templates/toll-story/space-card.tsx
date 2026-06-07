import Image from "next/image";
import type { SpaceContent } from "@/lib/dashboard-data";

export function SpaceCard({ space }: { space: SpaceContent }) {
  return (
    <article className="group overflow-hidden rounded-sm bg-white shadow-sm">
      <div className="relative h-56 overflow-hidden">
        <Image
          alt={space.name}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          src={space.image}
        />
      </div>
      <div className="p-5">
        <h3 className="font-headline text-lg font-bold uppercase tracking-wide text-[#171717]">
          {space.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#171717]/65">
          {space.description}
        </p>
      </div>
    </article>
  );
}
