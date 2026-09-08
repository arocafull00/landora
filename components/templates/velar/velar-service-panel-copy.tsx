import type { ServiceContent } from "@/lib/dashboard-data";

export function VelarServicePanelCopy({ service }: { service: ServiceContent }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <div className="flex w-full flex-col items-center px-6 py-6 text-center text-[var(--site-on-dark)]">
        {service.label ? (
          <p
            data-editor-id={`servicios:service:${service.id}:label`}
            className="mb-3 font-medium uppercase tracking-widest text-[var(--site-on-dark)]/90 text-site-content"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {service.label}
          </p>
        ) : null}
        <h3
          data-editor-id={`servicios:service:${service.id}:title`}
          className="mb-2 max-w-[16ch] font-bold leading-tight drop-shadow-lg text-site-title-sm"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {service.title}
        </h3>
        {service.subtitle ? (
          <p
            data-editor-id={`servicios:service:${service.id}:subtitle`}
            className="font-medium uppercase tracking-wide text-[var(--site-on-dark)]/95 drop-shadow-md text-site-content"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {service.subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}
