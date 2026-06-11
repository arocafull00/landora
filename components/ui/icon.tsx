import type { LucideIcon } from "lucide-react";
import {
  Bell,
  Check,
  ChevronRight,
  CircleHelp,
  Copy,
  Download,
  FileText,
  Folder,
  Globe,
  GraduationCap,
  GripVertical,
  Image,
  Info,
  LayoutGrid,
  Link,
  MoreHorizontal,
  Palette,
  Plus,
  Rocket,
  Save,
  Search,
  Settings,
  Trash2,
  Upload,
  User,
  X,
} from "lucide-react";
import type { IconName } from "@/lib/dashboard-data";

const icons: Record<IconName, LucideIcon> = {
  web: Globe,
  folder: Folder,
  settings: Settings,
  profile: User,
  bell: Bell,
  help: CircleHelp,
  search: Search,
  add: Plus,
  more: MoreHorizontal,
  document: FileText,
  drag: GripVertical,
  link: Link,
  image: Image,
  grid: LayoutGrid,
  upload: Upload,
  copy: Copy,
  download: Download,
  trash: Trash2,
  chevron: ChevronRight,
  palette: Palette,
  save: Save,
  publish: Rocket,
  check: Check,
  close: X,
  info: Info,
  tutorial: GraduationCap,
};

export function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName;
  className?: string;
}) {
  const LucideIconComponent = icons[name];

  return <LucideIconComponent aria-hidden className={className} />;
}
