import Image from "next/image";
import type { LandingContent } from "@/lib/dashboard-data";
import { TOLL_STORY_ASSETS } from "@/lib/toll-story-assets";
import { SpaceCard } from "@/components/templates/toll-story/space-card";
import { ServiceCard } from "@/components/templates/toll-story/service-card";
import { WorkflowStepCard } from "@/components/templates/toll-story/workflow-step";
import { TestimonialCard } from "@/components/templates/toll-story/testimonial-card";

export function TollStoryTemplate({ content }: { content: LandingContent }) {
  return (
    <div className="bg-[#f5f0ea] text-[#171717]">
      <HeroSection content={content} />
      <StatsSection content={content} />
      {content.story?.statement ? <StorySection content={content} /> : null}
      {content.spaces.length > 0 ? <SpacesSection content={content} /> : null}
      {content.services.length > 0 ? <ServicesSection content={content} /> : null}
      {content.workflow.length > 0 ? <WorkflowSection content={content} /> : null}
      {content.testimonials.length > 0 ? <TestimonialsSection content={content} /> : null}
      <ContactSection content={content} />
    </div>
  );
}

function HeroSection({ content }: { content: LandingContent }) {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {content.hero.image && (
        <Image
          alt={content.hero.title}
          className="object-cover"
          fill
          priority
          sizes="100vw"
          src={content.hero.image}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-[#171717]/20 to-transparent" />
      <nav className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-8 py-6 md:px-16">
        <Image
          alt="Toll Story"
          className="h-10 object-contain brightness-0 invert"
          height={40}
          src={TOLL_STORY_ASSETS.logo}
          style={{ width: "auto" }}
          width={120}
        />
        <a
          className="rounded-sm bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          href={`mailto:${content.contact.email}`}
        >
          Reservar
        </a>
      </nav>
      <div className="absolute bottom-0 left-0 right-0 z-10 px-8 pb-16 md:px-16">
        {content.hero.eyebrow ? (
          <p className="mb-4 font-label text-xs font-bold uppercase tracking-[0.22em] text-white/70">
            {content.hero.eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-[10ch] font-headline text-[clamp(56px,8vw,96px)] font-bold uppercase leading-[0.88] tracking-tight text-white">
          {content.hero.title}
        </h1>
        <p className="mt-6 max-w-md text-lg font-medium leading-snug text-white/85">
          {content.hero.subtitle}
        </p>
        {content.hero.description ? (
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
            {content.hero.description}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            className="inline-flex items-center gap-2 rounded-sm bg-white px-6 py-3 text-sm font-bold uppercase tracking-widest text-[#213138] transition-opacity hover:opacity-90"
            href={`mailto:${content.contact.email}`}
          >
            Solicitar información
          </a>
          {content.contact.phone ? (
            <a
              className="inline-flex items-center gap-2 rounded-sm border border-white/40 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:border-white/80"
              href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
            >
              {content.contact.phone}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function StatsSection({ content }: { content: LandingContent }) {
  if (content.stats.length === 0) return null;

  return (
    <section className="bg-[#1a1a1a] px-8 py-10 md:px-16">
      <div className="mx-auto grid max-w-5xl grid-cols-3 gap-8">
        {content.stats.map((stat) => (
          <div className="border-l border-white/15 pl-6" key={stat.id}>
            <div className="font-headline text-4xl font-bold text-white">
              {stat.value}
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.14em] text-white/50">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StorySection({ content }: { content: LandingContent }) {
  return (
    <section className="bg-[#f5f0ea] px-8 py-20 md:px-16">
      <div className="mx-auto max-w-3xl">
        <p className="font-headline text-2xl font-medium leading-snug text-[#171717] md:text-3xl">
          {content.story.statement}
        </p>
      </div>
    </section>
  );
}

function SpacesSection({ content }: { content: LandingContent }) {
  return (
    <section className="bg-[#f5f0ea] px-8 pb-20 md:px-16">
      <p className="mb-8 text-center font-label text-xs font-bold uppercase tracking-[0.22em] text-[#8a8278]">
        Espacios únicos para momentos especiales
      </p>
      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
        {content.spaces.map((space) => (
          <SpaceCard key={space.id} space={space} />
        ))}
      </div>
    </section>
  );
}

function ServicesSection({ content }: { content: LandingContent }) {
  return (
    <section className="grid md:grid-cols-3">
      {content.services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </section>
  );
}

function WorkflowSection({ content }: { content: LandingContent }) {
  return (
    <section className="bg-[#f5f0ea] px-8 py-20 md:px-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-12 font-label text-xs font-bold uppercase tracking-[0.22em] text-[#8a8278]">
          Cómo funciona
        </p>
        <div className="grid gap-10 md:grid-cols-3">
          {content.workflow.map((step) => (
            <WorkflowStepCard
              key={step.id}
              step={step}
              total={content.workflow.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ content }: { content: LandingContent }) {
  return (
    <section className="bg-[#e8e4df] px-8 py-20 md:px-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-12 font-label text-xs font-bold uppercase tracking-[0.22em] text-[#8a8278]">
          Lo que dicen nuestros clientes
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {content.testimonials.map((item) => (
            <TestimonialCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({ content }: { content: LandingContent }) {
  return (
    <section className="bg-[#213138] px-8 py-20 text-white md:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="font-label text-xs font-bold uppercase tracking-[0.22em] text-white/50">
              Contacto
            </p>
            <h2 className="mt-4 font-headline text-3xl font-bold uppercase leading-tight">
              Reserva tu fecha
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/65">
              Contáctanos para comprobar disponibilidad y visitar los espacios sin compromiso.
            </p>
            <div className="mt-8 space-y-4">
              {content.contact.phone ? (
                <a
                  className="flex items-center gap-3 text-base font-medium text-white transition-opacity hover:opacity-75"
                  href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-sm">
                    ☎
                  </span>
                  {content.contact.phone}
                </a>
              ) : null}
              {content.contact.email ? (
                <a
                  className="flex items-center gap-3 text-base font-medium text-white transition-opacity hover:opacity-75"
                  href={`mailto:${content.contact.email}`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-sm">
                    @
                  </span>
                  {content.contact.email}
                </a>
              ) : null}
              {content.contact.address ? (
                <p className="flex items-center gap-3 text-base text-white/65">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-sm">
                    ⌖
                  </span>
                  {content.contact.address}
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <a
              className="inline-flex items-center gap-2 rounded-sm bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#213138] transition-opacity hover:opacity-90"
              href={`mailto:${content.contact.email}`}
            >
              Solicitar información
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
