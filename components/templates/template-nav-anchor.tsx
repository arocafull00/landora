import type { ComponentProps } from "react";

type TemplateNavAnchorProps = ComponentProps<"a">;

export function TemplateNavAnchor({
  href,
  children,
  ...props
}: TemplateNavAnchorProps) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
