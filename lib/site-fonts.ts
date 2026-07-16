import {
  Cormorant_Garamond,
  DM_Sans,
  Fraunces,
  Gloock,
  IBM_Plex_Sans,
  Inter,
  JetBrains_Mono,
  Playfair_Display,
  Source_Sans_3,
  Syne,
} from "next/font/google";

const dashboardHeadline = IBM_Plex_Sans({
  variable: "--font-source-headline",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-source-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dashboardLabel = JetBrains_Mono({
  variable: "--font-source-label",
  subsets: ["latin"],
  weight: ["500"],
});

const syne = Syne({
  variable: "--font-source-syne",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  preload: false,
});

const playfairDisplay = Playfair_Display({
  variable: "--font-source-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  preload: false,
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  preload: false,
});

const dmSans = DM_Sans({
  variable: "--font-source-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  preload: false,
});

const fraunces = Fraunces({
  variable: "--font-source-fraunces",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  preload: false,
});

const gloock = Gloock({
  variable: "--font-source-gloock",
  subsets: ["latin"],
  weight: "400",
  preload: false,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-source-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  preload: false,
});

export const siteFontVariables = [
  dashboardHeadline.variable,
  inter.variable,
  dashboardLabel.variable,
  syne.variable,
  playfairDisplay.variable,
  sourceSans.variable,
  dmSans.variable,
  fraunces.variable,
  gloock.variable,
  cormorant.variable,
].join(" ");
