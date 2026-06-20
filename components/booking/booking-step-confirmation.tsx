import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BookingStepConfirmation({ publicToken }: { publicToken: string }) {
  return (
    <output className="block space-y-4 rounded-lg bg-success/5 p-6 text-center">
      <CircleCheck className="mx-auto size-10 text-success" aria-hidden />
      <h3 className="font-body text-body-lg font-semibold text-on-surface">Reserva confirmada</h3>
      <p className="font-body text-body-sm text-on-surface-variant">
        Hemos registrado tu reserva. Puedes gestionarla con el enlace siguiente.
      </p>
      <Button asChild>
        <Link href={`/reservation/${publicToken}`}>Ver o cancelar reserva</Link>
      </Button>
    </output>
  );
}
