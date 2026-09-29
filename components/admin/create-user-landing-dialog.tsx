"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createUserLanding } from "@/app/actions/admin";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllTemplates } from "@/lib/template-registry";
import {
  createUserLandingFormSchema,
  type CreateUserLandingFormValues,
} from "@/lib/schemas/admin";

const templates = getAllTemplates();

export function CreateUserLandingDialog({
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
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<CreateUserLandingFormValues>({
    resolver: zodResolver(createUserLandingFormSchema),
    defaultValues: { name, slug: "", template: "velar" },
  });

  const submit = async (values: CreateUserLandingFormValues) => {
    const result = await createUserLanding({ ...values, userId });
    if ("error" in result) {
      toast.error(result.error);
      return;
    }

    toast.success("Landing asignada correctamente");
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="bg-surface-container-lowest sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline text-headline-md text-on-surface">
            Añadir landing
          </DialogTitle>
          <DialogDescription className="text-on-surface-variant">
            Asigna una landing a {name}. Se creará como borrador con el contenido inicial de la plantilla.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(submit)}>
          <label className="block" htmlFor={`landing-name-${userId}`}>
            <span className="mb-1.5 block font-label text-label-md text-on-surface-variant">Nombre</span>
            <Input
              aria-invalid={Boolean(errors.name)}
              className="h-10 border-outline-variant bg-surface-bg"
              id={`landing-name-${userId}`}
              maxLength={100}
              {...register("name")}
            />
            {errors.name ? <span className="mt-1 block text-body-sm text-danger">{errors.name.message}</span> : null}
          </label>
          <label className="block" htmlFor={`landing-slug-${userId}`}>
            <span className="mb-1.5 block font-label text-label-md text-on-surface-variant">Subdominio</span>
            <Input
              aria-invalid={Boolean(errors.slug)}
              autoCapitalize="none"
              autoComplete="off"
              className="h-10 border-outline-variant bg-surface-bg"
              id={`landing-slug-${userId}`}
              maxLength={100}
              placeholder="mi-negocio"
              {...register("slug")}
            />
            {errors.slug ? <span className="mt-1 block text-body-sm text-danger">{errors.slug.message}</span> : null}
          </label>
          <div className="space-y-1.5">
            <span className="block font-label text-label-md text-on-surface-variant">Plantilla</span>
            <Controller
              control={control}
              name="template"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger aria-label="Plantilla" className="w-full border-outline-variant bg-surface-bg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>{template.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.template ? <span className="text-body-sm text-danger">{errors.template.message}</span> : null}
          </div>
          <div className="flex justify-end gap-2">
            <ActionButton disabled={isSubmitting} onClick={() => onOpenChange(false)} type="button" variant="secondary">
              Cancelar
            </ActionButton>
            <ActionButton disabled={isSubmitting} type="submit" variant="primary">
              {isSubmitting ? "Creando…" : "Crear landing"}
            </ActionButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
