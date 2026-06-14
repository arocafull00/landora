"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { SignInEmailVerificationForm } from "@/components/auth/sign-in-email-verification-form";
import { PasswordInput } from "@/components/ui/password-input";

export function SignInForm() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const isLoading = fetchStatus === "fetching";

  const handleFinalize = () =>
    signIn.finalize({
      navigate: ({ session, decorateUrl }) => {
        const destination = session?.currentTask
          ? `/sign-in/tasks/${session.currentTask.key}`
          : "/editor";
        const url = decorateUrl(destination);
        if (url.startsWith("http")) {
          window.location.href = url;
        } else {
          router.push(url);
        }
      },
    });

  const sendEmailVerificationCode = async () => {
    const emailCodeFactor = signIn.supportedSecondFactors?.find(
      (factor) => factor.strategy === "email_code",
    );

    if (!emailCodeFactor) return;

    await signIn.mfa.sendEmailCode();
  };

  const handlePasswordSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const identifier = formData.get("email") as string;
    const password = formData.get("password") as string;

    await signIn.password({ identifier, password });

    if (signIn.status === "complete") {
      await handleFinalize();
    } else if (signIn.status === "needs_second_factor") {
      await sendEmailVerificationCode();
    }
  };

  const handleVerifyCode = async (code: string) => {
    await signIn.mfa.verifyEmailCode({ code });

    if (signIn.status === "complete") {
      await handleFinalize();
    }
  };

  if (signIn.status === "needs_second_factor") {
    return (
      <SignInEmailVerificationForm
        onVerify={handleVerifyCode}
        onResend={sendEmailVerificationCode}
        onReset={() => signIn.reset()}
        codeError={errors?.fields?.code?.message}
        globalErrors={errors?.global ?? undefined}
        isLoading={isLoading}
      />
    );
  }

  const inputClass =
    "w-full rounded-md border border-outline-variant bg-surface px-3 py-2 text-body-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary";

  return (
    <form onSubmit={handlePasswordSubmit} className="space-y-4">
      <div className="space-y-1">
        <label
          htmlFor="email"
          className="block text-body-sm font-medium text-on-surface-variant"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClass}
        />
        {errors?.fields?.identifier && (
          <p className="text-body-sm text-error">
            {errors.fields.identifier.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label
          htmlFor="password"
          className="block text-body-sm font-medium text-on-surface-variant"
        >
          Password
        </label>
        <PasswordInput
          id="password"
          name="password"
          autoComplete="current-password"
          required
          className={inputClass}
          showLabel="Show password"
          hideLabel="Hide password"
        />
        {errors?.fields?.password && (
          <p className="text-body-sm text-error">
            {errors.fields.password.message}
          </p>
        )}
      </div>

      {errors?.global?.map((err) => (
        <p key={err.message} className="text-body-sm text-error">
          {err.message}
        </p>
      ))}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-md bg-primary px-4 py-2.5 text-body-sm font-medium text-on-primary transition-colors hover:bg-primary-fixed-variant disabled:opacity-50"
      >
        {isLoading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
