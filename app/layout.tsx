import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Archivo({ variable: "--f-display", subsets: ["latin"], axes: ["wdth"] });
const serif = Instrument_Serif({ variable: "--f-serif", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const sans = Inter_Tight({ variable: "--f-sans", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--f-mono", subsets: ["latin"] });

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3222";
const TITLE = "Adeeb Shah · Founder & CEO, Pronttera";
const DESC =
  "Adeeb Shah builds big things and ships them. Founder & CEO of Pronttera, maker of Tijarah (10,000+ customers) and Frostique, shipping AI agents in production. Ran a Ragnarok server for 15,000 players at sixteen. Pune · Auckland · Dubai.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: "%s · Adeeb Shah" },
  description: DESC,
  applicationName: "Adeeb Shah",
  authors: [{ name: "Adeeb Shah", url: SITE }],
  creator: "Adeeb Shah",
  keywords: ["Adeeb Shah", "Pronttera", "Tijarah", "Frostique", "FitStack", "founder", "full-stack engineer", "AI agents", "Pune", "Auckland", "Dubai"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Adeeb Shah",
    title: TITLE,
    description: "Tijarah, Frostique, FitStack and AI agents in production. A Ragnarok server for 15,000 players at sixteen. Pune · Auckland · Dubai.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "I build big things, and I ship them. Founder & CEO, Pronttera.",
    creator: "@adeebshah41",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f4f3ef" }, { media: "(prefers-color-scheme: dark)", color: "#0f0f10" }] };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* apply the saved theme before first paint, so there is no flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(!t)t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t;}catch(e){}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
