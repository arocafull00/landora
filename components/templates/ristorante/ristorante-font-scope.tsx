import { Gloock, Source_Sans_3 } from "next/font/google";

const gloock = Gloock({
  variable: "--font-ristorante-display",
  subsets: ["latin"],
  weight: "400",
});

const sourceSans = Source_Sans_3({
  variable: "--font-ristorante-body",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export function RistoranteFontScope({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${gloock.variable} ${sourceSans.variable}`}>{children}</div>
  );
}
