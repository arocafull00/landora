import { AssetImage } from "@/components/ui/asset-image";

export function SignalMedia({
  alt,
  src,
  className,
  priority = false,
  sizes = "100vw",
}: {
  alt: string;
  src: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (!src) return null;

  return (
    <AssetImage
      alt={alt}
      className={className}
      fill
      priority={priority}
      quality={90}
      sizes={sizes}
      src={src}
    />
  );
}
