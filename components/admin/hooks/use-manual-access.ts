"use client";

import type { FormEvent } from "react";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";
import { configureManualAccess } from "@/app/actions/admin";

export function useManualAccess({
  bookingManualAccess,
  onSuccess,
  userId,
}: {
  bookingManualAccess: boolean;
  onSuccess: () => void;
  userId: string;
}) {
  const [includeBookings, setIncludeBookings] = useState(
    () => bookingManualAccess,
  );
  const [isPending, startTransition] = useTransition();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      const result = await configureManualAccess({
        userId,
        bookingManualAccess: includeBookings,
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
    isPending,
    setIncludeBookings,
    submit,
  };
}
