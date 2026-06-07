import { SignInForm } from "@/components/auth/sign-in-form";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-bg">
      <div className="w-full max-w-sm rounded-lg border border-outline-variant bg-surface-container-lowest p-8 shadow-sm">
        <h1 className="mb-6 text-headline-md text-on-surface">Sign in</h1>
        <SignInForm />
      </div>
    </div>
  );
}
