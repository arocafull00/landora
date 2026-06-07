import { PreviewScrollProvider } from "@/lib/preview-scroll-context";

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PreviewScrollProvider>{children}</PreviewScrollProvider>;
}
