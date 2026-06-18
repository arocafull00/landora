import { SignInBackground } from "@/components/auth/sign-in-background";
import { SignInForm } from "@/components/auth/sign-in-form";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <SignInBackground />
      <div className="relative z-10 w-full max-w-sm rounded-lg border border-outline-variant bg-surface-container-lowest p-8">
        <div className="mb-8">
          <h1 className="font-headline text-headline-lg font-semibold text-on-surface">
            Landora
          </h1>
          <p className="mt-1 font-body text-body-sm text-on-surface-variant">
            CMS Dashboard
          </p>
        </div>
        <h2 className="mb-6 font-headline text-headline-md font-medium text-on-surface">
          Iniciar sesión
        </h2>
        <SignInForm />
      </div>
      <footer className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-body text-body-sm text-on-surface-variant">
        <Link href="/legal" className="text-primary hover:underline">
          Aviso Legal
        </Link>
        <span aria-hidden="true">·</span>
        <Link href="/privacy" className="text-primary hover:underline">
          Política de Privacidad
        </Link>
        <span aria-hidden="true">·</span>
        <Link href="/terms" className="text-primary hover:underline">
          Términos del Servicio
        </Link>
      </footer>
    </div>
  );
}
