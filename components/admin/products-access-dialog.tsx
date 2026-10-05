"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductsAccessSwitch } from "./products-access-switch";

const COPY = { title: "Acceso a Productos", description: "Este permiso es independiente de la suscripción, del acceso general y de Reservas." } as const;
export function ProductsAccessDialog({ userId, enabled, open, onOpenChange }: { userId: string; enabled: boolean; open: boolean; onOpenChange: (open: boolean) => void }) {
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent><DialogHeader><DialogTitle>{COPY.title}</DialogTitle><DialogDescription>{COPY.description}</DialogDescription></DialogHeader><ProductsAccessSwitch userId={userId} enabled={enabled} /></DialogContent></Dialog>;
}
