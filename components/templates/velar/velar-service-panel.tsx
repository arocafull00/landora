import { AssetImage } from "@/components/ui/asset-image";
import type { ServiceContent } from "@/lib/dashboard-data";
import { VelarServicePanelCopy } from "@/components/templates/velar/velar-service-panel-copy";

export function VelarServicePanel({
  service,
  priority = false,
}: {
  service: ServiceContent;
  priority?: boolean;
}) {
  return (
    <div className="group relative aspect-[4/5] overflow-hidden rounded-xl">
      <AssetImage
        alt={service.title}
        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
        fill
        priority={priority}
        quality={95}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        src={service.image}
      />
      <div className="absolute inset-0 bg-[var(--site-dark)]/40 transition-colors group-hover:bg-[var(--site-dark)]/50" />
      <VelarServicePanelCopy service={service} />
    </div>
  );
}
