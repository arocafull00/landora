"use client";

import { RecoverableError } from "@/components/errors/recoverable-error";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <RecoverableError
      error={error}
      reset={reset}
      action="admin-segment-error"
    />
  );
}
