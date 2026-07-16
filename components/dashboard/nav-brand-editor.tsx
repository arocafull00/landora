"use client";

import { useDashboardStore } from "@/stores/dashboard-store";
import type { BrandLogoType, Landing } from "@/lib/dashboard-data";
import { ImageField } from "@/components/dashboard/image-field";
import { cn } from "@/lib/utils";

type NavBrandEditorProps = {
  activeLanding: Landing;
};

export function NavBrandEditor({ activeLanding }: NavBrandEditorProps) {
  const updateBranding = useDashboardStore((state) => state.updateBranding);
  const { brand, brandLogoImage, brandLogoType } = activeLanding.content;
  const logoType = brandLogoType ?? "text";

  const setLogoType = (type: BrandLogoType) => {
    updateBranding(activeLanding.id, { brandLogoType: type });
  };

  return (
    <div className="space-y-5 border-b border-outline-variant pb-5">
      <div>
        <h3 className="text-body-lg font-semibold text-on-surface">Logo de navegación</h3>
        <p className="mt-1 text-body-sm text-on-surface-variant">
          Elemento que aparece a la izquierda en la barra de navegación.
        </p>
      </div>

      <div className="space-y-2">
        <span className="block font-label text-label-md text-on-surface-variant">Tipo</span>
        <div className="flex gap-2">
          {(["text", "image"] as const).map((type) => (
            <button
              className={cn(
                "rounded-lg border px-4 py-2 text-body-sm transition-colors",
                logoType === type
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-outline-variant bg-surface text-on-surface hover:border-primary hover:text-primary",
              )}
              key={type}
              onClick={() => setLogoType(type)}
              type="button"
            >
              {type === "text" ? "Texto" : "Imagen"}
            </button>
          ))}
        </div>
      </div>

      {logoType === "text" ? (
        <label className="block">
          <span className="mb-2 block font-label text-label-md text-on-surface-variant">
            Texto del logo
          </span>
          <input
            className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
            onChange={(event) =>
              updateBranding(activeLanding.id, { brand: event.target.value })
            }
            type="text"
            value={brand}
          />
        </label>
      ) : (
        <>
          <ImageField
            label="Imagen del logo"
            onChange={(value) => updateBranding(activeLanding.id, { brandLogoImage: value })}
            templateId={activeLanding.template}
            value={brandLogoImage ?? ""}
          />
          <label className="block">
            <span className="mb-2 block font-label text-label-md text-on-surface-variant">
              Nombre de marca
            </span>
            <input
              className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-body-md text-on-surface outline-none transition-shadow focus:border-primary focus:ring-1 focus:ring-primary"
              onChange={(event) =>
                updateBranding(activeLanding.id, { brand: event.target.value })
              }
              type="text"
              value={brand}
            />
          </label>
        </>
      )}
    </div>
  );
}
