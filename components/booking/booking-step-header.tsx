export function BookingStepHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <header className="space-y-1">
      <h3 className="font-body text-body-md font-semibold text-on-surface">{title}</h3>
      {description ? (
        <p className="font-body text-body-sm text-on-surface-variant">{description}</p>
      ) : null}
    </header>
  );
}
