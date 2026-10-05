"use client";

import type { FormEvent } from "react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { configureManualAccess } from "@/app/actions/admin";

export function useManualAccess({
  bookingManualAccess,
  productsManualAccess,
  onSuccess,
  userId,
}: {
  bookingManualAccess: boolean;
  productsManualAccess: boolean;
  onSuccess: () => void;
  userId: string;
}) {
  const [includeBookings, setIncludeBookings] = useState(
    () => bookingManualAccess,
  );
  const [includeProducts, setIncludeProducts] = useState(
    () => productsManualAccess,
  );
  const [isPending, startTransition] = useTransition();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      const result = await configureManualAccess({
        userId,
        bookingManualAccess: includeBookings,
        productsManualAccess: includeProducts,
      });

      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      toast.success("Acceso manual actualizado");
      onSuccess();
    });
  };

  return {
    includeBookings,
    includeProducts,
    isPending,
    setIncludeBookings,
    setIncludeProducts,
    submit,
  };
}
