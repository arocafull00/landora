"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { HeroVariantId } from "@/lib/dashboard-data";
import {
  getHeroVariant,
  getHeroVariants,
} from "@/components/templates/shared/heroes/hero-variant-registry";
import { HeroVariantCard } from "@/components/dashboard/hero-editor/components/hero-variant-card";
import { AssetImage } from "@/components/ui/asset-image";
import { Button } from "@/components/ui/button";
import { Collapsible } from "@/components/ui/collapsible";
import { CollapsibleContent } from "@/components/ui/collapsible-content";
import { CollapsibleTrigger } from "@/components/ui/collapsible-trigger";
import { cn } from "@/lib/utils";

const HERO_VARIANTS = getHeroVariants();

export function HeroVariantSelector({
  onChange,
  value,
}: {
  onChange: (variantId: HeroVariantId) => void;
  value: HeroVariantId;
}) {
  const [open, setOpen] = useState(false);
  const selectedVariant = getHeroVariant(value);

  const handleChange = (variantId: HeroVariantId) => {
    onChange(variantId);
    setOpen(false);
  };

  return (
    <Collapsible className="space-y-3" onOpenChange={setOpen} open={open}>
      <CollapsibleTrigger asChild>
        <Button
          className="h-auto w-full justify-between gap-3 rounded-xl p-2 text-left"
          variant="outline"
        >
          <span className="flex min-w-0 items-center gap-3">
            <span className="relative block size-10 shrink-0 overflow-hidden rounded-lg bg-surface-variant">
              <AssetImage
                alt=""
                className="object-cover"
                fill
                sizes="40px"
                src={selectedVariant.thumbnail}
              />
            </span>
            <span className="block min-w-0 truncate text-body-md font-medium text-on-surface">
              {selectedVariant.label}
            </span>
          </span>
          <ChevronDown
            className={cn(
              "mr-1 size-4 shrink-0 text-on-surface-variant transition-transform duration-200",
              open && "rotate-180",
            )}
            aria-hidden
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div
          aria-label="Tipo de hero"
          className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2"
          role="radiogroup"
        >
          {HERO_VARIANTS.map((definition) => (
            <HeroVariantCard
              definition={definition}
              key={definition.id}
              onSelect={handleChange}
              selected={definition.id === value}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
