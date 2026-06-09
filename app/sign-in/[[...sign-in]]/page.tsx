import { SignInBackground } from "@/components/auth/sign-in-background";
import { SignInForm } from "@/components/auth/sign-in-form";

export default function SignInPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <SignInBackground />
      <div className="relative z-10 w-full max-w-sm rounded-lg border border-outline-variant bg-surface-container-lowest p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="font-headline text-headline-md font-bold text-on-surface">
            Landora
          </h1>
          <p className="mt-1 font-label text-label-md text-on-surface-variant">
            CMS Dashboard
          </p>
        </div>
        <h2 className="mb-6 text-headline-md text-on-surface">Sign in</h2>
        <SignInForm />
      </div>
    </div>
  );
}
