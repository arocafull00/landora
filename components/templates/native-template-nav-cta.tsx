export function NativeTemplateNavCta({
  analyticsEvent,
  className,
  href,
  label,
}: {
  analyticsEvent: string;
  className: string;
  href: string;
  label: string;
}) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://");

  if (isExternal) {
    return (
      <a
        className={className}
        data-analytics-event={analyticsEvent}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {label}
      </a>
    );
  }

  return (
    <a
      className={className}
      data-analytics-event={analyticsEvent}
      href={href}
    >
      {label}
    </a>
  );
}
