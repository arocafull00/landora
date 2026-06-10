type SignInEmailVerificationFormProps = {
  onVerify: (code: string) => Promise<void>;
  onResend: () => Promise<void>;
  onReset: () => void;
  codeError?: string;
  globalErrors?: { message: string }[];
  isLoading: boolean;
};

export function SignInEmailVerificationForm({
  onVerify,
  onResend,
  onReset,
  codeError,
  globalErrors,
  isLoading,
}: SignInEmailVerificationFormProps) {
  const inputClass =
    "w-full rounded-md border border-outline-variant bg-surface px-3 py-2 text-body-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const code = formData.get("code") as string;
    await onVerify(code);
  };

  return (
    <div className="space-y-4">
      <p className="text-body-sm text-on-surface-variant">
        We sent a verification code to your email. Enter it below to continue.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label
            htmlFor="code"
            className="block text-body-sm font-medium text-on-surface-variant"
          >
            Verification code
          </label>
          <input
            id="code"
            name="code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            autoFocus
            required
            className={inputClass}
          />
          {codeError && (
            <p className="text-body-sm text-error">{codeError}</p>
          )}
        </div>

        {globalErrors?.map((err, i) => (
          <p key={i} className="text-body-sm text-error">
            {err.message}
          </p>
        ))}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-primary px-4 py-2.5 text-body-sm font-medium text-on-primary transition-colors hover:bg-primary-fixed-variant disabled:opacity-50"
        >
          {isLoading ? "Verifying…" : "Verify"}
        </button>
      </form>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => onResend()}
          disabled={isLoading}
          className="text-body-sm text-primary transition-colors hover:text-primary-fixed-variant disabled:opacity-50"
        >
          Send a new code
        </button>
        <button
          type="button"
          onClick={onReset}
          disabled={isLoading}
          className="text-body-sm text-on-surface-variant transition-colors hover:text-on-surface disabled:opacity-50"
        >
          Start over
        </button>
      </div>
    </div>
  );
}
