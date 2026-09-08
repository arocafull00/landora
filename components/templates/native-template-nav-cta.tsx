import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function NativeTemplateNavCta({
  analyticsEvent,
  className,
  href,
  icon,
  label,
  labelClassName,
}: {
  analyticsEvent: string;
  className: string;
  href: string;
  icon?: ReactNode;
  label: string;
  labelClassName?: string;
}) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://");
  const classes = cn(className);
  const labelClasses = cn(labelClassName);

  if (isExternal) {
    return (
      <a
        className={classes}
        data-analytics-event={analyticsEvent}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {icon}
        <span className={labelClasses}>{label}</span>
      </a>
    );
  }

  return (
    <a className={classes} data-analytics-event={analyticsEvent} href={href}>
      {icon}
      <span className={labelClasses}>{label}</span>
    </a>
  );
}
