export function PreviewField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="font-label text-label-md text-on-surface-variant">{label}</p>
      <p className="font-body text-body-sm text-on-surface">{value}</p>
    </div>
  );
}
