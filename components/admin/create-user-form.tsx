"use client";

import { useTransition, useState } from "react";
import { toast } from "react-toastify";
import { ActionButton } from "@/components/ui/primitives";
import { PasswordInput } from "@/components/ui/password-input";
import { createUser } from "@/app/actions/admin";

const inputClass =
  "w-full rounded-md border border-outline-variant bg-surface-bg px-3 py-2 text-body-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary";

type Requirement = { label: string; met: boolean };

function getPasswordRequirements(password: string): Requirement[] {
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
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

  const requirements = getPasswordRequirements(password);
  const passwordValid = requirements.every((r) => r.met);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!passwordValid) return;
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await createUser(formData);
      if ("error" in result) {
        setError(result.error);
        return;
      }
      toast.success("Usuario creado correctamente");
      onSuccess();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-label text-label-md text-on-surface-variant">
            Nombre
          </span>
          <input
            name="name"
            type="text"
            required
            autoFocus
            autoComplete="off"
            placeholder="Ana García"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-label text-label-md text-on-surface-variant">
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="off"
            placeholder="ana@ejemplo.com"
            className={inputClass}
          />
        </label>
      </div>
      <div className="space-y-2">
        <label className="block">
          <span className="mb-1.5 block font-label text-label-md text-on-surface-variant">
            Contraseña
          </span>
          <PasswordInput
            name="password"
            required
            autoComplete="new-password"
            placeholder="Mínimo 8 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setPasswordTouched(true)}
            className={inputClass}
          />
        </label>
        {(passwordTouched || password.length > 0) && (
          <ul className="space-y-1">
            {requirements.map((req) => (
              <PasswordRequirement key={req.label} requirement={req} />
            ))}
          </ul>
        )}
      </div>
      {error && (
        <p className="font-body text-body-sm text-error">{error}</p>
      )}
      <div className="flex justify-end gap-2">
        <ActionButton
          variant="secondary"
          type="button"
          onClick={onSuccess}
          disabled={isPending}
        >
          Cancelar
        </ActionButton>
        <ActionButton
          variant="primary"
          type="submit"
          disabled={isPending || !passwordValid}
        >
          {isPending ? "Creando…" : "Crear usuario"}
        </ActionButton>
      </div>
    </form>
  );
}

function PasswordRequirement({ requirement }: { requirement: Requirement }) {
  return (
    <li className="flex items-center gap-1.5 font-body text-body-sm">
      <span
        className={
          requirement.met ? "text-success" : "text-on-surface-variant/50"
        }
      >
        {requirement.met ? "✓" : "○"}
      </span>
      <span
        className={
          requirement.met ? "text-on-surface-variant" : "text-on-surface-variant/50"
        }
      >
        {requirement.label}
      </span>
    </li>
  );
}
