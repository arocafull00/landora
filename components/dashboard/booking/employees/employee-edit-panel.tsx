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
import { EmployeeActiveBadge } from "@/components/dashboard/booking/employees/employee-active-badge";
import { EmployeeEditForm } from "@/components/dashboard/booking/employees/employee-edit-form";
import { useEmployeeEditorStore } from "@/stores/employee-editor-store";
import { useIsMobile } from "@/hooks/use-mobile";

function getInitial(name: string) {
  const trimmed = name.trim();
  if (!trimmed) {
    return "?";
  }
  return trimmed.charAt(0).toUpperCase();
}

export function EmployeeEditPanel() {
  const isMobile = useIsMobile();
  const open = useEmployeeEditorStore((s) => s.open);
  const employee = useEmployeeEditorStore((s) => s.employee);
  const name = useEmployeeEditorStore((s) => s.name);
  const isActive = useEmployeeEditorStore((s) => s.isActive);
  const closeEdit = useEmployeeEditorStore((s) => s.closeEdit);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      closeEdit();
    }
  };

  if (!employee) {
    return null;
  }

  const summary = (
    <BookingEditEntitySummary
      name={name}
      initial={getInitial(name)}
      badge={<EmployeeActiveBadge active={isActive} />}
    />
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent
          side="bottom"
          className="flex max-h-[90vh] flex-col overflow-hidden rounded-t-xl p-0"
        >
          <SheetHeader className="shrink-0 space-y-4 border-b border-outline-variant px-4 pt-4 pb-4">
            <SheetTitle className="font-headline text-headline-sm font-semibold text-on-surface">
              Editar empleado
            </SheetTitle>
            {summary}
          </SheetHeader>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6">
            <EmployeeEditForm />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-[540px]">
        <DialogHeader className="shrink-0 space-y-4 border-b border-outline-variant px-6 pt-6 pb-4">
          <DialogTitle className="font-headline text-headline-sm font-semibold text-on-surface">
            Editar empleado
          </DialogTitle>
          {summary}
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6">
          <EmployeeEditForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
