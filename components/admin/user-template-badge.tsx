export function UserTemplateBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-md border border-outline-variant bg-surface px-2 py-0.5 font-label text-label-md text-on-surface">
      {label}
    </span>
  );
}
