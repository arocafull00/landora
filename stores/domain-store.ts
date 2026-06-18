"use client";

import { create } from "zustand";
import { toast } from "react-toastify";
import {
  assignCustomDomain,
  getDomainStatus,
  removeCustomDomain,
  type DomainStatus,
} from "@/app/actions/domains";

type DomainState = {
  status: DomainStatus | null;
  domainInput: string;
  loading: boolean;
  assigning: boolean;
  removing: boolean;
  loaded: boolean;
  ensureLoaded: () => Promise<void>;
  setDomainInput: (domainInput: string) => void;
  assignDomain: (domain: string) => Promise<void>;
  removeDomain: () => Promise<void>;
};

export const useDomainStore = create<DomainState>()((set, get) => ({
  status: null,
  domainInput: "",
  loading: false,
  assigning: false,
  removing: false,
  loaded: false,

  ensureLoaded: async () => {
    if (get().loaded) return;
    if (get().loading) return;

    set({ loading: true });

    const result = await getDomainStatus();

    if ("error" in result) {
      toast.error(result.error);
      set({ loading: false });
      return;
    }

    set({
      status: result,
      domainInput: result.domain ?? "",
      loading: false,
      loaded: true,
    });
  },

  setDomainInput: (domainInput) => set({ domainInput }),

  assignDomain: async (domain) => {
    set({ assigning: true });

    const result = await assignCustomDomain(domain);

    if ("error" in result) {
      toast.error(result.error);
      set({ assigning: false });
      return;
    }

    toast.success("Dominio conectado. Configura los registros DNS en tu proveedor.");

    const refreshed = await getDomainStatus();

    if ("error" in refreshed) {
      toast.error(refreshed.error);
      set({ assigning: false });
      return;
    }

    set({
      status: refreshed,
      domainInput: refreshed.domain ?? "",
      assigning: false,
      loaded: true,
    });
  },

  removeDomain: async () => {
    set({ removing: true });

    const result = await removeCustomDomain();

    if ("error" in result) {
      toast.error(result.error);
      set({ removing: false });
      return;
    }

    set({
      domainInput: "",
      status: {
        domain: null,
        verified: false,
        misconfigured: false,
        records: [],
      },
      removing: false,
      loaded: true,
    });
    toast.success("Dominio eliminado");
  },
}));
