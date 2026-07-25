import { ClerkProvider } from "@clerk/nextjs";

export default function SubscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
