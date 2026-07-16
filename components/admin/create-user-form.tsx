"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { ActionButton } from "@/components/ui/primitives";
import { PasswordInput } from "@/components/ui/password-input";
import { createUser } from "@/app/actions/admin";
import {
  createUserSchema,
  type CreateUserValues,
} from "@/lib/schemas/admin";
import { PasswordRequirement } from "@/components/admin/password-requirement";

const inputClass =
  "w-full rounded-md border border-outline-variant bg-surface-bg px-3 py-2 text-body-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary";

function getPasswordRequirements(password: string) {
  return [
    { label: "Mínimo 8 caracteres", met: password.length >= 8 },
    { label: "Al menos una mayúscula", met: /[A-Z]/.test(password) },
    { label: "Al menos una minúscula", met: /[a-z]/.test(password) },
    {
      label: "Al menos un número o símbolo",
      met: /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(password),
    },
  ];
}

export function CreateUserForm({ onSuccess }: { onSuccess: () => void }) {
  const {
    control,
    formState: { errors, isSubmitting, touchedFields },
    handleSubmit,
    register,
  } = useForm<CreateUserValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { name: "", email: "", password: "" },
  });
  const password = useWatch({ control, name: "password" });

  const requirements = getPasswordRequirements(password);
  const passwordValid = requirements.every((r) => r.met);

  const submit = async (values: CreateUserValues) => {
    const result = await createUser(values);
    if ("error" in result) {
      toast.error(result.error);
      return;
    }
    toast.success("Usuario creado correctamente");
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-label text-label-md text-on-surface-variant">
            Nombre
          </span>
          <input
            type="text"
            autoComplete="off"
            placeholder="Ana García"
            className={inputClass}
            {...register("name")}
          />
          {errors.name ? <span className="mt-1 text-body-sm text-danger">{errors.name.message}</span> : null}
        </label>
        <label className="block">
          <span className="mb-1.5 block font-label text-label-md text-on-surface-variant">
            Email
          </span>
          <input
            type="email"
            autoComplete="off"
            placeholder="ana@ejemplo.com"
            className={inputClass}
            {...register("email")}
          />
          {errors.email ? <span className="mt-1 text-body-sm text-danger">{errors.email.message}</span> : null}
        </label>
      </div>
      <div className="space-y-2">
        <label className="block" htmlFor="create-user-password">
          <span className="mb-1.5 block font-label text-label-md text-on-surface-variant">
            Contraseña
          </span>
          <PasswordInput
            id="create-user-password"
            autoComplete="new-password"
            placeholder="Mínimo 8 caracteres"
            className={inputClass}
            {...register("password")}
          />
        </label>
        {(touchedFields.password || password.length > 0) && (
          <ul className="space-y-1">
            {requirements.map((req) => (
              <PasswordRequirement key={req.label} label={req.label} met={req.met} />
            ))}
          </ul>
        )}
      </div>
      <div className="flex justify-end gap-2">
        <ActionButton
          variant="secondary"
          type="button"
          onClick={onSuccess}
          disabled={isSubmitting}
        >
          Cancelar
        </ActionButton>
        <ActionButton
          variant="primary"
          type="submit"
          disabled={isSubmitting || !passwordValid}
        >
          {isSubmitting ? "Creando…" : "Crear usuario"}
        </ActionButton>
      </div>
    </form>
  );
}
