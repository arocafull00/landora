"use client";

import type { Booking } from "@/db/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export function BookingActionsMenu({
  booking,
  disabled,
  onConfirm,
  onComplete,
  onCancel,
}: {
  booking: Booking;
  disabled: boolean;
  onConfirm: () => void;
  onComplete: () => void;
  onCancel: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" disabled={disabled}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {booking.status === "pending" ? (
          <DropdownMenuItem onClick={onConfirm}>Confirmar</DropdownMenuItem>
        ) : null}
        {booking.status === "confirmed" ? (
          <DropdownMenuItem onClick={onComplete}>Completar</DropdownMenuItem>
        ) : null}
        {booking.status !== "cancelled" && booking.status !== "completed" ? (
          <DropdownMenuItem onClick={onCancel}>Cancelar</DropdownMenuItem>
        ) : null}
        <DropdownMenuItem asChild>
          <a href={`/reservation/${booking.publicToken}`} target="_blank" rel="noreferrer">
            Ver enlace
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
