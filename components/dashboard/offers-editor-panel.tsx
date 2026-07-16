"use client";

import { Plus } from "lucide-react";
import { OfferBlockEditor } from "@/components/dashboard/offer-block-editor";
import {
  createEmptyHeroBannerOffer,
  createEmptyPromotionCardsOffer,
} from "@/components/dashboard/create-empty-offer";
import { useDashboardStore } from "@/stores/dashboard-store";
import { useShallow } from "zustand/react/shallow";
import type { Landing } from "@/lib/dashboard-data";

type OffersEditorPanelProps = {
  activeLanding: Landing;
};

export function OffersEditorPanel({ activeLanding }: OffersEditorPanelProps) {
  const { addOffer, removeOffer, updateOffer } = useDashboardStore(
    useShallow((state) => ({
      addOffer: state.addOffer,
      removeOffer: state.removeOffer,
      updateOffer: state.updateOffer,
    })),
  );
  const offers = activeLanding.content.offers ?? [];

  return (
    <section className="space-y-8 py-unit-lg">
      <div>
        <h3 className="text-body-lg font-semibold text-on-surface">Ofertas</h3>
        <p className="mt-1 text-body-sm text-on-surface-variant">
          Añade bloques promocionales independientes para mostrar en la landing.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          className="inline-flex items-center gap-2 rounded-lg border border-outline-variant bg-surface px-4 py-2 text-body-sm font-medium text-on-surface transition-colors hover:bg-surface-container-low"
          onClick={() => addOffer(activeLanding.id, createEmptyHeroBannerOffer())}
          type="button"
        >
          <Plus className="size-4" />
          Banner promocional
        </button>
        <button
          className="inline-flex items-center gap-2 rounded-lg border border-outline-variant bg-surface px-4 py-2 text-body-sm font-medium text-on-surface transition-colors hover:bg-surface-container-low"
          onClick={() => addOffer(activeLanding.id, createEmptyPromotionCardsOffer())}
          type="button"
        >
          <Plus className="size-4" />
          Promociones
        </button>
      </div>

      {offers.length === 0 ? (
        <p className="rounded-lg border border-dashed border-outline-variant px-4 py-6 text-center text-body-sm text-on-surface-variant">
          No hay ofertas configuradas. Añade un bloque para empezar.
        </p>
      ) : (
        <div className="space-y-5">
          {offers.map((offer) => (
            <OfferBlockEditor
              key={offer.id}
              offer={offer}
              onChange={(patch) => updateOffer(activeLanding.id, offer.id, patch)}
              onRemove={() => removeOffer(activeLanding.id, offer.id)}
              templateId={activeLanding.template}
            />
          ))}
        </div>
      )}
    </section>
  );
}
