"use client";

import { Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { OfferCardEditor } from "@/components/dashboard/offer-card-editor";
import type { Offer, OfferCard, PromotionCardsOffer } from "@/lib/dashboard-data";
import { isOfferActive } from "@/lib/offer-utils";

type OfferBlockEditorProps = {
  offer: Offer;
  onChange: (patch: Partial<Offer>) => void;
  onRemove: () => void;
};

function toDateInputValue(date?: Date) {
  if (!date) return "";
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function fromDateInputValue(value: string) {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date;
}

function getOfferTypeLabel(type: Offer["type"]) {
  if (type === "hero_banner") return "Banner promocional";
  return "Promociones";
}

export function OfferBlockEditor({ offer, onChange, onRemove }: OfferBlockEditorProps) {
  const expired = !isOfferActive(offer);

  const updateCards = (cards: OfferCard[]) => {
    if (offer.type !== "promotion_cards") return;
    onChange({ cards } as Partial<PromotionCardsOffer>);
  };

  return (
    <div
      className={`space-y-5 rounded-xl border p-5 ${
        expired
          ? "border-outline-variant/70 bg-surface-container-lowest opacity-70"
          : "border-outline-variant bg-surface"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-body-md font-semibold text-on-surface">{getOfferTypeLabel(offer.type)}</p>
          {expired ? (
            <span className="mt-1 inline-flex rounded-full bg-outline-variant px-2 py-0.5 text-label-sm text-on-surface-variant">
              Expirada
            </span>
          ) : null}
        </div>
        <button
          aria-label="Eliminar oferta"
          className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-error"
          onClick={onRemove}
          type="button"
        >
          <Trash2 className="size-4" />
        </button>
      </div>

      <div className="flex items-start justify-between gap-4 rounded-lg border border-outline-variant bg-surface px-4 py-3">
        <div>
          <p className="text-body-md font-medium text-on-surface">Activa</p>
          <p className="mt-1 text-body-sm text-on-surface-variant">
            Las ofertas desactivadas no se muestran en la landing.
          </p>
        </div>
        <Switch checked={offer.enabled} onCheckedChange={(checked) => onChange({ enabled: checked })} />
      </div>

      <EditorField
        label="Título"
        onChange={(value) => onChange({ title: value })}
        value={offer.title}
      />
      <EditorField
        label="Descripción"
        onChange={(value) => onChange({ description: value })}
        value={offer.description}
      />
      <EditorField
        label="Badge"
        onChange={(value) => onChange({ badge: value || undefined })}
        value={offer.badge ?? ""}
      />
      <EditorField
        label="Texto del CTA"
        onChange={(value) => onChange({ ctaText: value || undefined })}
        value={offer.ctaText ?? ""}
      />
      <label className="block">
        <span className="mb-2 block font-label text-label-md text-on-surface-variant">
          Fecha de expiración
        </span>
        <input
          className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
          onChange={(event) => onChange({ expiresAt: fromDateInputValue(event.target.value) })}
          type="datetime-local"
          value={toDateInputValue(offer.expiresAt)}
        />
      </label>

      {offer.type === "promotion_cards" ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <p className="font-label text-label-md text-on-surface-variant">Tarjetas</p>
            <button
              className="font-label text-label-md text-primary transition-colors hover:text-primary/80"
              onClick={() =>
                updateCards([
                  ...offer.cards,
                  {
                    title: "",
                    description: "",
                  },
                ])
              }
              type="button"
            >
              Añadir tarjeta
            </button>
          </div>
          {offer.cards.map((card, index) => (
            <OfferCardEditor
              card={card}
              index={index}
              key={`${offer.id}-card-${card.title}-${card.ctaText ?? ""}`}
              onChange={(patch) =>
                updateCards(
                  offer.cards.map((currentCard, cardIndex) =>
                    cardIndex === index ? { ...currentCard, ...patch } : currentCard,
                  ),
                )
              }
              onRemove={() => updateCards(offer.cards.filter((_, cardIndex) => cardIndex !== index))}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function EditorField({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-label text-label-md text-on-surface-variant">{label}</span>
      <input
        className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
        onChange={(event) => onChange(event.target.value)}
        type="text"
        value={value}
      />
    </label>
  );
}
