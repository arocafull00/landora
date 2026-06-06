import Image from "next/image";
import type { LandingContent } from "@/lib/dashboard-data";

export function LandingPreview({ content }: { content: LandingContent }) {
  return (
    <div className="overflow-hidden rounded-lg border border-outline-variant bg-[#f5f0ea] text-[#171717] shadow-sm">
      <section className="relative min-h-[420px] overflow-hidden">
        <Image
          alt={content.hero.title}
          className="object-cover"
          fill
          priority
          src={content.hero.image}
          sizes="(max-width: 1024px) 100vw, 52vw"
        />
        <div className="absolute inset-0 bg-[#f5f0ea]/20" />
        <div className="relative z-10 flex min-h-[420px] flex-col justify-end p-8">
          <p className="mb-3 font-label text-xs font-bold uppercase tracking-[0.18em]">
            {content.hero.eyebrow}
          </p>
          <h2 className="max-w-[9ch] font-headline text-[64px] font-bold uppercase leading-[0.9] tracking-normal">
            {content.hero.title}
          </h2>
          <p className="mt-5 max-w-md text-base font-semibold">
            {content.hero.subtitle}
          </p>
        </div>
      </section>
      <section className="bg-[#1a1a1a] p-8 text-[#e8e4df]">
        <p className="max-w-2xl text-2xl leading-snug">{content.story.statement}</p>
        <div className="mt-8 grid grid-cols-3 gap-4">
          {content.stats.map((stat) => (
            <div className="border-l border-[#e8e4df]/20 pl-4" key={stat.id}>
              <div className="font-headline text-3xl font-bold">{stat.value}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.12em] text-[#e8e4df]/70">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="p-8">
        <p className="mb-4 text-center font-label text-xs uppercase tracking-[0.18em] text-[#8a8278]">
          Espacios únicos para momentos especiales
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {content.spaces.map((space) => (
            <article className="overflow-hidden rounded-md bg-white shadow-sm" key={space.id}>
              <div className="relative h-36">
                <Image
                  alt={space.name}
                  className="object-cover"
                  fill
                  src={space.image}
                  sizes="220px"
                />
              </div>
              <div className="p-4">
                <h3 className="font-headline text-lg font-bold">{space.name}</h3>
                <p className="mt-2 text-sm text-[#171717]/70">{space.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="grid border-t border-[#213138]/10 md:grid-cols-3">
        {content.services.map((service) => (
          <article
            className="relative min-h-48 overflow-hidden border-r border-[#f5f0ea]/20 p-5 text-white last:border-r-0"
            key={service.id}
          >
            <Image
              alt={service.title}
              className="object-cover"
              fill
              src={service.image}
              sizes="220px"
            />
            <div className="absolute inset-0 bg-[#213138]/65" />
            <div className="relative z-10">
              <p className="font-label text-xs uppercase tracking-[0.14em]">
                {service.label}
              </p>
              <h3 className="mt-16 font-headline text-xl font-bold">
                {service.title}
              </h3>
              <p className="text-sm opacity-80">{service.subtitle}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
