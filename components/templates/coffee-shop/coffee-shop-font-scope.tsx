import { Fraunces, DM_Sans } from "next/font/google";

const fraunces = Fraunces({
  variable: "--font-coffee-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-coffee-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function CoffeeShopFontScope({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${fraunces.variable} ${dmSans.variable}`}>{children}</div>
  );
}
