"use client";

import type { BookingSettings } from "@/lib/domain/dtos";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookingSettingsForm } from "@/components/dashboard/booking/booking-settings-form";

export function BookingSettingsModal({
  settings,
  open,
  onOpenChange,
}: {
  settings: BookingSettings;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-[540px]">
        <DialogHeader className="shrink-0 space-y-2 border-b border-outline-variant px-6 pt-6 pb-4">
          <DialogTitle className="font-headline text-headline-sm font-semibold text-on-surface">
            Ajustes de reservas
          </DialogTitle>
          <DialogDescription className="font-body text-body-sm text-on-surface-variant">
            Configura disponibilidad, confirmación y notificaciones.
          </DialogDescription>
        </DialogHeader>
        {open ? (
          <BookingSettingsForm settings={settings} onOpenChange={onOpenChange} />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
