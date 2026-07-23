import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { siteFontVariables } from "@/lib/site-fonts";

export const metadata: Metadata = {
  title: "Landora",
  description: "Dashboard para gestionar landings multi-tenant.",
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
  },
  manifest: "/favicon_io/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="es"
        className={`${siteFontVariables} h-full antialiased`}
        suppressHydrationWarning
      >
        <body
          className="min-h-full bg-surface-bg text-on-background"
          suppressHydrationWarning
        >
          <a
            href="#main-content"
            className="sr-only fixed left-4 top-4 z-[100] rounded-md bg-primary px-4 py-2 text-on-primary focus:not-sr-only"
          >
            Saltar al contenido
          </a>
          <Analytics />
          <SpeedInsights />
          <TooltipProvider>
            <Suspense fallback={null}>
              <div id="main-content" tabIndex={-1}>
                {children}
              </div>
            </Suspense>
            <ToastContainer />
          </TooltipProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
