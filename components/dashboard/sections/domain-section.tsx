"use client";

import { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";
import {
  assignCustomDomain,
  getDomainStatus,
  removeCustomDomain,
  type DomainStatus,
} from "@/app/actions/domains";
import { DomainDnsRecord } from "@/components/dashboard/domain-dns-record";
import { ActionButton, Panel, StatusBadge } from "@/components/ui/primitives";
import { useDashboardStore } from "@/stores/dashboard-store";

export function DomainSection() {
  const landings = useDashboardStore((state) => state.landings);
  const activeLandingId = useDashboardStore((state) => state.activeLandingId);
  const activeLanding =
    landings.find((landing) => landing.id === activeLandingId) ?? landings[0];

  const [domainInput, setDomainInput] = useState("");
  const [status, setStatus] = useState<DomainStatus | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isRemovePending, startRemoveTransition] = useTransition();

  useEffect(() => {
    if (!activeLanding) return;

    startTransition(async () => {
      const result = await getDomainStatus();

      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      setStatus(result);
      if (result.domain) {
        setDomainInput(result.domain);
      }
    });
  }, [activeLanding?.id]);

  if (!activeLanding) return null;

  const handleAssign = () => {
    startTransition(async () => {
      const result = await assignCustomDomain(domainInput);

      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      toast.success("Dominio conectado. Configura los registros DNS en tu proveedor.");

      const refreshed = await getDomainStatus();
      if (!("error" in refreshed)) {
        setStatus(refreshed);
        if (refreshed.domain) {
          setDomainInput(refreshed.domain);
        }
      }
    });
  };

  const handleRemove = () => {
    startRemoveTransition(async () => {
      const result = await removeCustomDomain();

      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      setDomainInput("");
      setStatus({
        domain: null,
        verified: false,
        misconfigured: false,
        records: [],
      });
      toast.success("Dominio eliminado");
    });
  };

  const isPublished = activeLanding.status === "Published";

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <header className="flex items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-6 py-4">
        <div>
          <h2 className="font-headline text-headline-sm font-bold text-on-surface">
            Dominio
          </h2>
          <p className="mt-0.5 font-body text-body-sm text-on-surface-variant">
            Conecta tu dominio comprado para que los visitantes vean solo tu web
          </p>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-3xl space-y-6">
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
                  className="w-full rounded-md border border-outline-variant bg-surface-bg px-3 py-2 font-body text-body-md text-on-surface outline-none focus:border-primary"
                  disabled={!isPublished || isPending || isRemovePending}
                  id="custom-domain"
                  onChange={(event) => setDomainInput(event.target.value)}
                  placeholder="www.tuempresa.com"
                  type="text"
                  value={domainInput}
                />
              </div>

              <div className="flex items-center gap-2">
                <ActionButton
                  disabled={!isPublished || isPending || isRemovePending || !domainInput.trim()}
                  onClick={handleAssign}
                  variant="primary"
                >
                  {isPending ? "Guardando…" : "Conectar dominio"}
                </ActionButton>
                {status?.domain ? (
                  <ActionButton
                    disabled={isPending || isRemovePending}
                    onClick={handleRemove}
                    variant="danger"
                  >
                    {isRemovePending ? "Eliminando…" : "Eliminar dominio"}
                  </ActionButton>
                ) : null}
              </div>
            </Panel>
          </section>

          {status?.domain ? (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="font-headline text-headline-sm text-on-surface">
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
                  <p className="font-body text-body-sm text-warning">
                    El dominio aún no está configurado correctamente en tu proveedor DNS.
                  </p>
                ) : null}
                {status.verified ? (
                  <p className="font-body text-body-sm text-success">
                    Tu dominio está verificado y listo para recibir visitas.
                  </p>
                ) : null}
              </Panel>

              {status.records.length > 0 ? (
                <Panel className="overflow-hidden p-0">
                  <div className="border-b border-outline-variant px-4 py-3">
                    <h4 className="font-headline text-headline-sm text-on-surface">
                      Registros DNS
                    </h4>
                    <p className="mt-1 font-body text-body-sm text-on-surface-variant">
                      Copia estos registros en el panel DNS de tu proveedor de dominio.
                    </p>
                  </div>
                  <table className="w-full text-left">
                    <thead className="bg-surface-container-lowest">
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
