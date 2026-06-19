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
} from "@/components/ui/sheet";
import { ServiceActiveBadge } from "@/components/dashboard/booking/services/service-active-badge";
import { ServiceEditForm } from "@/components/dashboard/booking/services/service-edit-form";
import { useBookingServicesStore } from "@/stores/booking-services-store";
import { useIsMobile } from "@/hooks/use-mobile";

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

  const header = (
    <div className="flex items-center justify-between gap-3">
      <span className="truncate font-headline text-headline-sm font-semibold text-on-surface">
        {editName || "Editar servicio"}
      </span>
      <ServiceActiveBadge active={editIsActive} />
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={editOpen} onOpenChange={handleOpenChange}>
        <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto rounded-t-xl">
          <SheetHeader>{header}</SheetHeader>
          <div className="px-4 pb-6">
            <ServiceEditForm />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={editOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle asChild>
            <div>{header}</div>
          </DialogTitle>
        </DialogHeader>
        <ServiceEditForm />
      </DialogContent>
    </Dialog>
  );
}
