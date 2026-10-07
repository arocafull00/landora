import type { GalleryItem } from "@/lib/dashboard-data";
import type { RistoranteEditorValues } from "@/lib/schemas/ristorante-editor";
import { RistoranteContentForm } from "@/components/dashboard/ristorante/components/ristorante-content-form";
import { EMPTY_RISTORANTE_EDITOR_VALUES } from "@/components/dashboard/ristorante/ristorante-editor-copy";
import { Separator } from "@/components/ui/separator";

export function RistoranteGalleryEditorItem({ item, onApply, monthly }: { item: GalleryItem; onApply: (section: string, id: string, values: RistoranteEditorValues) => void; monthly: boolean }) {
  return <div className="space-y-5"><Separator /><RistoranteContentForm values={{ ...EMPTY_RISTORANTE_EDITOR_VALUES, title: item.title ?? "", description: item.description ?? "", image: item.image ?? "" }} fields={monthly ? ["title", "description", "image"] : ["title", "image"]} onApply={(values) => onApply("gallery", item.id, values)} /></div>;
}
