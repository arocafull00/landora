import Link from "next/link";

export function BookingStepConfirmation({ publicToken }: { publicToken: string }) {
  return (
    <div className="space-y-4 text-center">
      <h3 className="font-body text-body-lg font-semibold">Reserva confirmada</h3>
      <p className="font-body text-body-sm text-on-surface-variant">
        Hemos registrado tu reserva. Puedes gestionarla con el enlace siguiente.
      </p>
      <Link
        href={`/reservation/${publicToken}`}
        className="inline-block font-body text-body-sm underline"
      >
        Ver o cancelar reserva
      </Link>
    </div>
  );
}
