import { ShieldCheck } from "lucide-react";

export function OficioProTrustCta() {
  return (
    <aside className="flex h-full flex-col justify-between rounded-2xl border border-[#F59E0B]/30 bg-[#FFF7E8] p-6 md:col-span-8">
      <div className="flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-[#F59E0B]/20 text-[#17212B]">
          <ShieldCheck className="size-6" />
        </div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#1F4E79]">
          Atención profesional
        </p>
      </div>
      <p className="mt-8 max-w-2xl text-2xl font-black uppercase leading-tight tracking-normal text-[#17212B]">
        Diagnóstico claro, presupuesto transparente y trabajo ejecutado con oficio.
      </p>
    </aside>
  );
}
