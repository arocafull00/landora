"use client";

type OfferHeroBannerFeaturesEditorProps = {
  features: string[];
  onChange: (features: string[]) => void;
};

const MAX_FEATURES = 3;

export function OfferHeroBannerFeaturesEditor({
  features,
  onChange,
}: OfferHeroBannerFeaturesEditorProps) {
  const updateFeature = (index: number, value: string) => {
    onChange(features.map((feature, featureIndex) => (featureIndex === index ? value : feature)));
  };

  const removeFeature = (index: number) => {
    onChange(features.filter((_, featureIndex) => featureIndex !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="font-label text-label-md text-on-surface-variant">Características</p>
        {features.length < MAX_FEATURES ? (
          <button
            className="font-label text-label-md text-primary transition-colors hover:text-primary/80"
            onClick={() => onChange([...features, ""])}
            type="button"
          >
            Añadir
          </button>
        ) : null}
      </div>
      {features.length === 0 ? (
        <p className="text-body-sm text-on-surface-variant">Añade hasta 3 características destacadas.</p>
      ) : null}
      {features.map((feature, index) => (
        <div className="flex items-center gap-2" key={`feature-${index}`}>
          <input
            className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
            onChange={(event) => updateFeature(index, event.target.value)}
            placeholder={`Característica ${index + 1}`}
            type="text"
            value={feature}
          />
          <button
            className="shrink-0 font-label text-label-md text-error transition-colors hover:text-error/80"
            onClick={() => removeFeature(index)}
            type="button"
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}
