import {
  DM_Serif_Display,
  Manrope,
  Cormorant_Garamond,
  DM_Sans,
  Fraunces,
  Gloock,
  Inter_Tight,
  Marcellus,
  Playfair_Display,
  Source_Sans_3,
  Syne,
} from "next/font/google";

const syne = Syne({
  variable: "--font-source-syne",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  preload: false,
});

const marcellus = Marcellus({
  variable: "--font-source-marcellus",
  subsets: ["latin"],
  weight: "400",
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

const interTight = Inter_Tight({
  variable: "--font-source-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  preload: false,
});

const nuvoletsDisplay = DM_Serif_Display({ variable: "--font-source-dm-serif", subsets: ["latin"], weight: "400", preload: false });
const nuvoletsBody = Manrope({ variable: "--font-source-manrope", subsets: ["latin"], weight: ["400", "500", "600"], preload: false });

export const siteFontVariables = [
  nuvoletsDisplay.variable,
  nuvoletsBody.variable,
  syne.variable,
  marcellus.variable,
  playfairDisplay.variable,
  sourceSans.variable,
  dmSans.variable,
  fraunces.variable,
  gloock.variable,
  cormorant.variable,
  interTight.variable,
].join(" ");
