"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { BookingEditEntitySummary } from "@/components/dashboard/booking/booking-edit-entity-summary";
import { ServiceActiveBadge } from "@/components/dashboard/booking/services/service-active-badge";
import { ServiceEditForm } from "@/components/dashboard/booking/services/service-edit-form";
import { useBookingServicesStore } from "@/stores/booking-services-store";
import { useIsMobile } from "@/hooks/use-mobile";
import { Scissors } from "lucide-react";

export function ServiceEditPanel() {
  const isMobile = useIsMobile();
  const editOpen = useBookingServicesStore((s) => s.editOpen);
  const editingService = useBookingServicesStore((s) => s.editingService);
  const editName = useBookingServicesStore((s) => s.editName);
  const editIsActive = useBookingServicesStore((s) => s.editIsActive);
  const closeEdit = useBookingServicesStore((s) => s.closeEdit);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      closeEdit();
    }
  };

  if (!editingService) {
    return null;
  }

  const summary = (
    <BookingEditEntitySummary
      name={editName}
      icon={Scissors}
      badge={<ServiceActiveBadge active={editIsActive} />}
    />
  );

  if (isMobile) {
    return (
      <Sheet open={editOpen} onOpenChange={handleOpenChange}>
        <SheetContent
          side="bottom"
          className="flex max-h-[90vh] flex-col overflow-hidden rounded-t-xl p-0"
        >
          <SheetHeader className="shrink-0 space-y-4 border-b border-outline-variant px-4 pt-4 pb-4">
            <SheetTitle className="font-headline text-headline-sm font-semibold text-on-surface">
              Editar servicio
            </SheetTitle>
            {summary}
          </SheetHeader>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6">
            <ServiceEditForm />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={editOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-[540px]">
        <DialogHeader className="shrink-0 space-y-4 border-b border-outline-variant px-6 pt-6 pb-4">
          <DialogTitle className="font-headline text-headline-sm font-semibold text-on-surface">
            Editar servicio
          </DialogTitle>
          {summary}
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6">
          <ServiceEditForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
