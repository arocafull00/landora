"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { saveCatalogAction } from "@/app/actions/products";
import { catalogConfigSchema, type CatalogConfigValues } from "@/lib/schemas/products";
import type { CatalogConfigDto } from "@/lib/domain/dtos";

export function useCatalogConfig(landingId: string, config: CatalogConfigDto) {
  const router = useRouter();
  const form = useForm<CatalogConfigValues>({ resolver: zodResolver(catalogConfigSchema), defaultValues: { enabled: config.enabled, title: config.title, description: config.description } });
  const submit = form.handleSubmit(async (values) => {
    try {
      const result = await saveCatalogAction({ landingId, version: config.version, config: values });
      if ("error" in result) { toast.error(result.error); return; }
      toast.success("Configuración del catálogo guardada");
      form.reset(values);
      router.refresh();
    } catch { toast.error("No se pudo guardar la configuración"); }
  }, () => toast.error("Revisa la configuración del catálogo"));
  return { form, submit };
}
