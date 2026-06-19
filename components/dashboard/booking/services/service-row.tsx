"use client";

import { useState, useTransition } from "react";
import { toast } from "react-toastify";
import type { BookingService } from "@/db/schema";
import { Panel } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ServiceEditDialog } from "@/components/dashboard/booking/services/service-edit-dialog";
import { ChevronDown, ChevronUp, Pencil } from "lucide-react";

export function ServiceRow({
  service,
  index,
  total,
  disabled,
  onMoveUp,
  onMoveDown,
  onToggleActive,
  onUpdated,
}: {
  service: BookingService;
  index: number;
  total: number;
  disabled: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onToggleActive: (active: boolean) => void;
  onUpdated: (service: BookingService) => void;
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [, startTransition] = useTransition();

  return (
    <>
      <Panel className="flex items-center justify-between gap-4 p-4">
        <div className="min-w-0 flex-1">
          <p className="font-body text-body-md font-medium text-on-surface">{service.name}</p>
          <p className="font-body text-body-sm text-on-surface-variant">
            {service.durationMinutes} min
            {service.bufferAfterMinutes > 0
              ? ` + ${service.bufferAfterMinutes} min buffer`
              : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={service.isActive}
            disabled={disabled}
            onCheckedChange={(checked) => {
              startTransition(() => onToggleActive(checked));
            }}
          />
          <Button variant="ghost" size="icon" disabled={disabled || index === 0} onClick={onMoveUp}>
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            disabled={disabled || index === total - 1}
            onClick={onMoveDown}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" disabled={disabled} onClick={() => setEditOpen(true)}>
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </Panel>
      <ServiceEditDialog
        open={editOpen}
        service={service}
        onOpenChange={setEditOpen}
        onUpdated={onUpdated}
      />
    </>
  );
}
