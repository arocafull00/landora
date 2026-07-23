"use client";

import { useTransition } from "react";
import { toast } from "react-toastify";
import { deleteUser } from "@/app/actions/admin";

export function useDeleteUser({
  onSuccess,
  userId,
}: {
  onSuccess: () => void;
  userId: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteUser({ userId });

      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      toast.success("Usuario y datos eliminados");
      onSuccess();
    });
  };

  return { handleDelete, isPending };
}
