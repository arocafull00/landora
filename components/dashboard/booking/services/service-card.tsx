"use client";

import { useState } from "react";
import type { BookingService } from "@/db/schema";
import { Panel } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { ServiceActiveBadge } from "@/components/dashboard/booking/services/service-active-badge";
import { ServiceActionsMenu } from "@/components/dashboard/booking/services/service-actions-menu";
import { ServiceQuickEdit } from "@/components/dashboard/booking/services/service-quick-edit";
import { formatServicePrice } from "@/lib/service-price";
import { ChevronDown, Scissors } from "lucide-react";
import { cn } from "@/lib/utils";

export function ServiceCard({
  service,
  index,
  total,
  disabled,
  onMoveUp,
  onMoveDown,
}: {
  service: BookingService;
  index: number;
  total: number;
  disabled: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Panel className="overflow-hidden p-0">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-high">
              <Scissors className="h-5 w-5 text-on-surface-variant" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-body text-body-md font-medium text-on-surface">
                {service.name}
              </p>
              <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="font-headline text-headline-sm font-semibold text-on-surface">
                  {formatServicePrice(service.priceCents)}
                </span>
                <span className="font-body text-body-sm text-on-surface-variant">
                  {service.durationMinutes} min
                  {service.bufferAfterMinutes > 0
                    ? ` + ${service.bufferAfterMinutes} min margen`
                    : ""}
                </span>
              </div>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ServiceActiveBadge active={service.isActive} />
            <Button
              variant="ghost"
              size="icon"
              disabled={disabled}
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
              aria-label={expanded ? "Contraer" : "Expandir"}
            >
              <ChevronDown
                className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
              />
            </Button>
          </div>
        </div>

      </div>

      {expanded ? (
        <div className="px-5 pb-5">
          <ServiceQuickEdit
            service={service}
            disabled={disabled}
            onSaved={() => setExpanded(false)}
          />
          <div className="mt-3 flex justify-end">
            <ServiceActionsMenu
              service={service}
              disabled={disabled}
              canMoveUp={index > 0}
              canMoveDown={index < total - 1}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
            />
          </div>
        </div>
      ) : null}
    </Panel>
  );
}
