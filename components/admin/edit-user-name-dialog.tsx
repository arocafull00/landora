"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updateUserName } from "@/app/actions/admin";
import { ActionButton } from "@/components/ui/primitives";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  updateUserNameSchema,
  type UpdateUserNameValues,
} from "@/lib/schemas/admin";

export function EditUserNameDialog({
  name,
  onOpenChange,
  open,
  userId,
}: {
  name: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  userId: string;
}) {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<UpdateUserNameValues>({
    resolver: zodResolver(updateUserNameSchema),
    defaultValues: { name, userId },
  });

  const submit = async (values: UpdateUserNameValues) => {
    const result = await updateUserName(values);

    if ("error" in result) {
      toast.error(result.error);
      return;
    }

    toast.success("Nombre actualizado");
    onOpenChange(false);
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="bg-surface-container-lowest sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline text-headline-md text-on-surface">
            Editar nombre
          </DialogTitle>
          <DialogDescription className="text-on-surface-variant">
            Este nombre se mostrará en Landora y en la cuenta de Clerk.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-5" onSubmit={handleSubmit(submit)}>
          <label className="block" htmlFor={`user-name-${userId}`}>
            <span className="mb-1.5 block font-label text-label-md text-on-surface-variant">
              Nombre del usuario
            </span>
            <Input
              aria-invalid={Boolean(errors.name)}
              autoComplete="name"
              className="h-10 border-outline-variant bg-surface-bg"
              id={`user-name-${userId}`}
              maxLength={80}
              {...register("name")}
            />
            {errors.name ? (
              <span className="mt-1.5 block text-body-sm text-danger">
                {errors.name.message}
              </span>
            ) : null}
          </label>
          <div className="flex justify-end gap-2">
            <ActionButton
              disabled={isSubmitting}
              onClick={() => onOpenChange(false)}
              type="button"
              variant="secondary"
            >
              Cancelar
            </ActionButton>
            <ActionButton disabled={isSubmitting} type="submit" variant="primary">
              {isSubmitting ? "Guardando…" : "Guardar nombre"}
            </ActionButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
