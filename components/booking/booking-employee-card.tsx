export function BookingEmployeeCard({
  employee,
  onSelect,
}: {
  employee: { id: string; name: string };
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full rounded-lg border border-outline-variant px-4 py-3 text-left font-body text-body-md transition hover:bg-surface-container"
    >
      {employee.name}
    </button>
  );
}
