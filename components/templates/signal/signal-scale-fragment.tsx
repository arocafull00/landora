import { SignalMedia } from "@/components/templates/signal/signal-media";

export function SignalScaleFragment({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) {
  const offsets = [
    "left-[8%] top-[18%] w-[28%] aspect-[4/5]",
    "right-[6%] top-[28%] w-[22%] aspect-square",
    "left-[42%] bottom-[12%] w-[24%] aspect-[5/4]",
  ];
  const position = offsets[index % offsets.length] ?? offsets[0];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute overflow-hidden border border-[var(--site-border)] opacity-70 grayscale ${position}`}
      data-signal-scale-fragment
    >
      <SignalMedia
        alt={alt}
        className="object-cover"
        sizes="30vw"
        src={src}
      />
    </div>
  );
}
