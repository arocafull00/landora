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
    <div className="group relative h-[400px] overflow-hidden md:h-[500px] md:min-w-0 md:flex-1 md:transition-[flex-grow] md:duration-500 md:ease-out md:hover:flex-[1.8] motion-reduce:transition-none">
      <AssetImage
        alt={service.title}
        className="object-cover"
        fill
        priority={priority}
        quality={95}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
        src={service.image}
      />
      <div className="absolute inset-0 bg-[var(--site-dark)]/40 transition-colors group-hover:bg-[var(--site-dark)]/50" />
      <VelarServicePanelCopy service={service} />
    </div>
  );
}
