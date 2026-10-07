import type { RistoranteEditorValues } from "@/lib/schemas/ristorante-editor";
import { RistoranteContentForm } from "@/components/dashboard/ristorante/components/ristorante-content-form";
import { EMPTY_RISTORANTE_EDITOR_VALUES } from "@/components/dashboard/ristorante/ristorante-editor-copy";
import { Separator } from "@/components/ui/separator";

export function RistoranteLabelEditorItem({ item, section, onApply }: { item: { id: string; title: string }; section: string; onApply: (section: string, id: string, values: RistoranteEditorValues) => void }) {
  return <div className="space-y-5"><Separator /><RistoranteContentForm values={{ ...EMPTY_RISTORANTE_EDITOR_VALUES, title: item.title }} fields={["title"]} onApply={(values) => onApply(section, item.id, values)} /></div>;
}
