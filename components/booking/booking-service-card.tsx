"use client";

export function BookingServiceCard({
  service,
  onSelect,
}: {
  service: { id: string; name: string; durationMinutes: number };
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-center justify-between rounded-lg border border-outline-variant px-4 py-3 text-left transition hover:bg-surface-container"
    >
      <span className="font-body text-body-md">{service.name}</span>
      <span className="font-body text-body-sm text-on-surface-variant">
        {service.durationMinutes} min
      </span>
    </button>
  );
}
