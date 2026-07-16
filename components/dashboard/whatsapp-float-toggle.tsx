"use client";

import { Switch } from "@/components/ui/switch";
import { useDashboardStore } from "@/stores/dashboard-store";
import type { Landing } from "@/lib/dashboard-data";

export function WhatsappFloatToggle({ activeLanding }: { activeLanding: Landing }) {
  const updateContact = useDashboardStore((state) => state.updateContact);
  const contact = activeLanding.content.contact;
  const enabled = contact.whatsappEnabled ?? false;

  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-outline-variant bg-surface px-4 py-3">
      <div>
        <p className="text-body-md font-medium text-on-surface">Botón de WhatsApp flotante</p>
        <p className="mt-1 text-body-sm text-on-surface-variant">
          Muestra un botón fijo en la esquina inferior derecha de la landing.
        </p>
      </div>
      <Switch
        checked={enabled}
        onCheckedChange={(checked) =>
          updateContact(activeLanding.id, { whatsappEnabled: checked })
        }
      />
    </div>
  );
}
