import Link from "next/link";
import { getImpersonationContext } from "@/lib/auth";

export async function ImpersonationBanner() {
  const ctx = await getImpersonationContext();
  if (!ctx) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-primary px-4 py-2">
      <p className="font-label text-label-md font-medium text-on-primary">
        Editando como{" "}
        <span className="font-bold">{ctx.clientName}</span>
      </p>
      <Link
        href="/admin/impersonate/exit"
        className="rounded-md bg-on-primary/10 px-3 py-1 font-label text-label-sm font-medium text-on-primary transition-colors hover:bg-on-primary/20"
      >
        Salir
      </Link>
    </div>
  );
}
