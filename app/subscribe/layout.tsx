import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "@/components/shared/toast-provider";

export default function SubscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ToastProvider>{children}</ToastProvider>
    </ClerkProvider>
  );
}
