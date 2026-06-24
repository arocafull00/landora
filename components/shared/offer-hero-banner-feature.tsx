import { Check } from "lucide-react";

type OfferHeroBannerFeatureProps = {
  label: string;
  showDivider: boolean;
};

export function OfferHeroBannerFeature({ label, showDivider }: OfferHeroBannerFeatureProps) {
  return (
    <>
      {showDivider ? (
        <span aria-hidden className="hidden h-4 w-px shrink-0 bg-outline-variant sm:block" />
      ) : null}
      <span className="inline-flex items-center gap-1.5 text-body-sm text-on-surface-variant">
        <Check className="size-3.5 shrink-0 text-primary" />
        {label}
      </span>
    </>
  );
}
