import Link from "next/link";
import { DashboardThemeScope } from "@/components/dashboard/dashboard-theme-scope";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardThemeScope />
      <div className="min-h-screen overflow-y-auto bg-surface-bg">
        <header className="border-b border-outline-variant bg-surface-container-lowest">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
            <Link
              href="/sign-in"
              className="font-headline text-headline-sm font-semibold text-on-surface"
            >
              Landora
            </Link>
            <Link
              href="/sign-in"
              className="font-body text-body-sm text-primary hover:underline"
            >
              Volver al inicio
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-6 py-10">{children}</main>
      </div>
    </>
  );
}
