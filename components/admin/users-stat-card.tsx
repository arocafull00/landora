export function UsersStatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: number;
  detail?: string;
}) {
  return (
    <div className="rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3">
      <p className="font-body text-body-sm text-on-surface-variant">{label}</p>
      <p className="mt-1 font-headline text-headline-md font-semibold text-on-surface">
        {value}
      </p>
      {detail ? (
        <p className="mt-0.5 font-body text-body-sm text-on-surface-variant">
          {detail}
        </p>
      ) : null}
    </div>
  );
}
