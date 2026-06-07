import Image from "next/image";
import type { LandingContent } from "@/lib/dashboard-data";

function TollStoryPreview({ content }: { content: LandingContent }) {
  return (
    <div className="overflow-hidden rounded-lg border border-outline-variant bg-[#f5f0ea] text-[#171717] shadow-sm">
      <section className="relative min-h-[420px] overflow-hidden">
        {content.hero.image && (
          <Image
            alt={content.hero.title}
            className="object-cover"
            fill
            priority
            src={content.hero.image}
            sizes="(max-width: 1024px) 100vw, 52vw"
          />
        )}
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

function VelarPreviewCard({ content }: { content: LandingContent }) {
  const lines = content.story.statement.split("\n");

  return (
    <div className="overflow-hidden rounded-lg border border-outline-variant shadow-sm">
      <section
        className="relative min-h-[420px] overflow-hidden"
        style={{ backgroundColor: "#213138" }}
      >
        {content.hero.image && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${content.hero.image})` }}
          />
        )}
        <div className="absolute inset-0 bg-[#213138]/40" />
        <div className="relative z-10 flex min-h-[420px] flex-col justify-end p-8">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-white/60"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {content.hero.eyebrow}
          </p>
          <h2
            className="text-white"
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "clamp(36px, 5vw, 64px)",
              letterSpacing: "-0.03em",
              lineHeight: 0.9,
            }}
          >
            {content.hero.title}
          </h2>
          <p
            className="mt-4 max-w-sm text-white/70"
            style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "14px" }}
          >
            {content.hero.subtitle}
          </p>
        </div>
      </section>

      <section className="bg-[#1a1a1a] p-8 text-[#e8e4df]">
        <p
          className="max-w-2xl leading-snug text-[#e8e4df]"
          style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "18px" }}
        >
          {lines[0]}
        </p>
        <div className="mt-8 flex gap-6">
          {content.stats.map((stat, i) => (
            <div
              key={stat.id}
              className="flex-1"
              style={{
                borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.15)" : "none",
                paddingLeft: i > 0 ? "24px" : "0",
              }}
            >
              <div
                className="text-white"
                style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "28px" }}
              >
                {stat.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.12em] text-[#e8e4df]/60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {content.gallery.length > 0 && (
        <section className="flex h-32 gap-1 bg-[#1a1a1a]">
          {content.gallery.slice(0, 5).map((item) => (
            <div key={item.id} className="relative flex-1 overflow-hidden bg-[#2a2a2a]">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover opacity-70"
                src={item.video}
              />
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export function LandingPreview({
  content,
  template = "toll-story",
}: {
  content: LandingContent;
  template?: "toll-story" | "velar";
}) {
  if (template === "velar") return <VelarPreviewCard content={content} />;
  return <TollStoryPreview content={content} />;
}
