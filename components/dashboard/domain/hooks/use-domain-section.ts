"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import {
  assignCustomDomain,
  removeCustomDomain,
} from "@/app/actions/domains";
import type { DomainStatusDto } from "@/lib/domain/dtos";

export function useDomainSection(initialStatus: DomainStatusDto) {
  const [status, setStatus] = useState(initialStatus);
  const [domainInput, setDomainInput] = useState(initialStatus.domain ?? "");
  const [assigning, setAssigning] = useState(false);
  const [removing, setRemoving] = useState(false);

  const assignDomain = async (domain: string) => {
    setAssigning(true);
    const result = await assignCustomDomain(domain);
    setAssigning(false);

    if ("error" in result) {
      toast.error(result.error);
      return;
    }

    setStatus(result.data);
    setDomainInput(result.data.domain ?? "");
    toast.success("Dominio conectado. Configura los registros DNS en tu proveedor.");
  };

  const removeDomain = async () => {
    setRemoving(true);
    const result = await removeCustomDomain();
    setRemoving(false);

    if ("error" in result) {
      toast.error(result.error);
      return;
    }

    setStatus(result.data);
    setDomainInput("");
    toast.success("Dominio eliminado");
  };

  return {
    assigning,
    domainInput,
    removeDomain,
    removing,
    setDomainInput,
    status,
    assignDomain,
  };
}
