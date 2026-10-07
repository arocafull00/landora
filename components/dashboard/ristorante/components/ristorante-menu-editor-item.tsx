import type { ServiceMenuItem } from "@/lib/dashboard-data";
import type { RistoranteEditorValues } from "@/lib/schemas/ristorante-editor";
import { RistoranteContentForm } from "@/components/dashboard/ristorante/components/ristorante-content-form";
import { Separator } from "@/components/ui/separator";

export function RistoranteMenuEditorItem({ item, onApply }: { item: ServiceMenuItem; onApply: (section: string, id: string, values: RistoranteEditorValues) => void }) {
  return <div className="space-y-5"><Separator /><RistoranteContentForm values={{ title: item.name, subtitle: "", description: item.description, category: item.category, price: item.price, image: item.image ?? "" }} fields={["title", "category", "description", "price", "image"]} onApply={(values) => onApply("serviceMenu", item.id, values)} /></div>;
}
