import { ClerkProvider } from "@clerk/nextjs";

export default function AccountPendingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
