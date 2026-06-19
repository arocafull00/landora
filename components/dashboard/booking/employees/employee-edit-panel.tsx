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
import { EmployeeActiveBadge } from "@/components/dashboard/booking/employees/employee-active-badge";
import { EmployeeEditForm } from "@/components/dashboard/booking/employees/employee-edit-form";
import { useEmployeeEditorStore } from "@/stores/employee-editor-store";
import { useIsMobile } from "@/hooks/use-mobile";

export function EmployeeEditPanel() {
  const isMobile = useIsMobile();
  const open = useEmployeeEditorStore((s) => s.open);
  const employee = useEmployeeEditorStore((s) => s.employee);
  const name = useEmployeeEditorStore((s) => s.name);
  const closeEdit = useEmployeeEditorStore((s) => s.closeEdit);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      closeEdit();
    }
  };

  if (!employee) {
    return null;
  }

  const header = (
    <div className="flex items-center justify-between gap-3">
      <span className="truncate font-headline text-headline-sm font-semibold text-on-surface">
        {name}
      </span>
      <EmployeeActiveBadge active={employee.isActive} />
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto rounded-t-xl">
          <SheetHeader>
            <SheetTitle className="sr-only">{name}</SheetTitle>
            {header}
          </SheetHeader>
          <div className="px-4 pb-6">
            <EmployeeEditForm />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle asChild>
            <div>{header}</div>
          </DialogTitle>
        </DialogHeader>
        <EmployeeEditForm />
      </DialogContent>
    </Dialog>
  );
}
