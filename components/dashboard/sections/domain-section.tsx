"use client";

import { DomainDnsRecord } from "@/components/dashboard/domain-dns-record";
import { useDomainSection } from "@/components/dashboard/domain/hooks/use-domain-section";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { ActionButton, Panel, StatusBadge } from "@/components/ui/primitives";
import type { DomainStatusDto } from "@/lib/domain/dtos";
import { useDashboardStore } from "@/stores/dashboard-store";

export function DomainSection({
  initialError,
  initialStatus,
}: {
  initialError?: string;
  initialStatus: DomainStatusDto;
}) {
  const landings = useDashboardStore((state) => state.landings);
  const activeLandingId = useDashboardStore((state) => state.activeLandingId);
  const {
    assigning,
    assignDomain,
    domainInput,
    removeDomain,
    removing,
    setDomainInput,
    status,
  } = useDomainSection(initialStatus);

  const activeLanding =
    landings.find((landing) => landing.id === activeLandingId) ?? landings[0];

  if (!activeLanding) return null;

  const isPublished = activeLanding.status === "Published";
  const isBusy = assigning || removing;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <DashboardPageHeader
        description="Conecta tu dominio comprado para que los visitantes vean solo tu web."
        title="Dominio"
      />

      <div className="flex-1 overflow-auto p-unit-lg">
        <div className="mx-auto max-w-3xl space-y-6">
          {initialError ? (
            <Panel className="p-4">
              <p className="font-body text-body-md text-danger">{initialError}</p>
            </Panel>
          ) : null}
          {!isPublished ? (
            <Panel className="p-4">
              <p className="font-body text-body-md text-on-surface">
                Publica tu landing antes de conectar un dominio personalizado.
              </p>
            </Panel>
          ) : null}

          <section className="space-y-4">
            <Panel className="space-y-4 p-4">
              <div>
                <label
                  className="mb-2 block font-label text-label-md text-on-surface-variant"
                  htmlFor="custom-domain"
                >
                  Dominio personalizado
                </label>
                <input
                  className="w-full rounded-md border border-outline-variant bg-surface-bg px-3 py-2 font-body text-body-md text-on-surface outline-none transition-colors duration-150 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  disabled={!isPublished || isBusy}
                  id="custom-domain"
                  onChange={(event) => setDomainInput(event.target.value)}
                  placeholder="www.tuempresa.com"
                  type="text"
                  value={domainInput}
                />
              </div>

              <div className="flex items-center gap-2">
                <ActionButton
                  disabled={!isPublished || isBusy || !domainInput.trim()}
                  onClick={() => assignDomain(domainInput)}
                  variant="primary"
                >
                  {assigning ? "Guardando…" : "Conectar dominio"}
                </ActionButton>
                {status?.domain ? (
                  <ActionButton
                    disabled={isBusy}
                    onClick={() => removeDomain()}
                    variant="danger"
                  >
                    {removing ? "Eliminando…" : "Eliminar dominio"}
                  </ActionButton>
                ) : null}
              </div>
            </Panel>
          </section>

          {status?.domain ? (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="font-body text-body-lg font-semibold text-on-surface">
                  Estado del dominio
                </h3>
                <StatusBadge status={status.verified ? "Live" : "Draft"} />
              </div>

              <Panel className="space-y-2 p-4">
                <p className="font-body text-body-sm text-on-surface-variant">
                  Dominio:{" "}
                  <span className="font-mono text-on-surface">{status.domain}</span>
                </p>
                {status.misconfigured ? (
                  <p className="rounded-md bg-warning/8 px-3 py-2 font-body text-body-sm text-warning">
                    El dominio aún no está configurado correctamente en tu proveedor DNS.
                  </p>
                ) : null}
                {status.verified ? (
                  <p className="rounded-md bg-success/8 px-3 py-2 font-body text-body-sm text-success">
                    Tu dominio está verificado y listo para recibir visitas.
                  </p>
                ) : null}
              </Panel>

              {status.records.length > 0 ? (
                <Panel className="overflow-hidden p-0">
                  <div className="border-b border-outline-variant px-4 py-3">
                    <h4 className="font-body text-body-lg font-semibold text-on-surface">
                      Registros DNS
                    </h4>
                    <p className="mt-1 font-body text-body-sm text-on-surface-variant">
                      Copia estos registros en el panel DNS de tu proveedor de dominio.
                    </p>
                  </div>
                  <table className="w-full text-left">
                    <thead className="bg-surface-container-low">
                      <tr>
                        <th className="px-4 py-2 font-label text-label-md text-on-surface-variant">
                          Tipo
                        </th>
                        <th className="px-4 py-2 font-label text-label-md text-on-surface-variant">
                          Nombre
                        </th>
                        <th className="px-4 py-2 font-label text-label-md text-on-surface-variant">
                          Valor
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {status.records.map((record) => (
                        <DomainDnsRecord
                          key={`${record.type}-${record.name}-${record.value}`}
                          record={record}
                        />
                      ))}
                    </tbody>
                  </table>
                </Panel>
              ) : null}
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
