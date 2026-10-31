import {
  Bellefair,
  Bodoni_Moda,
  Cormorant_Garamond,
  DM_Sans,
  Figtree,
  Gilda_Display,
  Instrument_Serif,
  Italiana,
  Jost,
  Libre_Caslon_Text,
  Manrope,
  Marcellus,
  Mulish,
  Playfair_Display,
  Tenor_Sans,
} from "next/font/google";

// The fonts for the themes under review (see PaletteSwitch.tsx): a subtle headline
// face, a quiet text face and an italic accent for each. A file is only fetched
// when a theme uses it. Once a theme is chosen, keep its three fonts in layout.tsx
// and delete this file. next/font needs each call's options written out in full.
const marcellus = Marcellus({ subsets: ["latin"], display: "swap", preload: false, weight: "400", variable: "--font-marcellus" });
const italiana = Italiana({ subsets: ["latin"], display: "swap", preload: false, weight: "400", variable: "--font-italiana" });
const gilda = Gilda_Display({ subsets: ["latin"], display: "swap", preload: false, weight: "400", variable: "--font-gilda" });
const bellefair = Bellefair({ subsets: ["latin"], display: "swap", preload: false, weight: "400", variable: "--font-bellefair" });
const tenor = Tenor_Sans({ subsets: ["latin"], display: "swap", preload: false, weight: "400", variable: "--font-tenor" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], display: "swap", preload: false, weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-cormorant" });

const mulish = Mulish({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-mulish" });
const jost = Jost({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-jost" });
const dmSans = DM_Sans({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-dm-sans" });
const figtree = Figtree({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-figtree" });
const manrope = Manrope({ subsets: ["latin"], display: "swap", preload: false, variable: "--font-manrope" });

const bodoni = Bodoni_Moda({ subsets: ["latin"], display: "swap", preload: false, style: "italic", variable: "--font-bodoni" });
const caslon = Libre_Caslon_Text({ subsets: ["latin"], display: "swap", preload: false, weight: "400", style: "italic", variable: "--font-caslon" });
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", preload: false, style: "italic", variable: "--font-playfair" });
const instrument = Instrument_Serif({ subsets: ["latin"], display: "swap", preload: false, weight: "400", style: "italic", variable: "--font-instrument" });

export const reviewFontVariables = [
  marcellus,
  italiana,
  gilda,
  bellefair,
  tenor,
  cormorant,
  mulish,
  jost,
  dmSans,
  figtree,
  manrope,
  bodoni,
  caslon,
  playfair,
  instrument,
]
  .map((font) => font.variable)
  .join(" ");
