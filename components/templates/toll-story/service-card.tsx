import Image from "next/image";
import type { ServiceContent } from "@/lib/dashboard-data";

export function ServiceCard({ service }: { service: ServiceContent }) {
  return (
    <article className="relative min-h-64 overflow-hidden">
      <Image
        alt={service.title}
        className="object-cover"
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        src={service.image}
      />
      <div className="absolute inset-0 bg-[#213138]/70 transition-opacity duration-300 hover:bg-[#213138]/55" />
      <div className="relative z-10 flex h-full min-h-64 flex-col justify-between p-6 text-white">
        <p className="font-label text-xs font-bold uppercase tracking-[0.18em] text-white/70">
          {service.label}
        </p>
        <div>
          <h3 className="font-headline text-2xl font-bold uppercase leading-tight">
            {service.title}
          </h3>
          <p className="mt-1 text-sm text-white/75">{service.subtitle}</p>
        </div>
      </div>
    </article>
  );
}
