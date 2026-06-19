export function BookingSlotButton({
  slot,
  onSelect,
}: {
  slot: { startsAt: string; endsAt: string };
  onSelect: () => void;
}) {
  const label = new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(slot.startsAt));

  return (
    <button
      type="button"
      onClick={onSelect}
      className="rounded-lg border border-outline-variant px-3 py-2 font-body text-body-sm transition hover:bg-surface-container"
    >
      {label}
    </button>
  );
}
