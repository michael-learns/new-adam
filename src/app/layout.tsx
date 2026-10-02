import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Outfit, Schibsted_Grotesk } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// UI and small headings: geometric, round forms with a single-storey "a" that echo the logo wordmark.
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

// Headlines: an editorial serif that gives statements weight and calm.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

// Text: a warm, highly legible grotesk with Scandinavian roots.
const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.descriptor}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_PH",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7f8f4",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior: page changes jump to the top instantly; in-page
    // anchor links keep the smooth scrolling set in globals.css.
    <html lang={site.locale} data-scroll-behavior="smooth" className={`${outfit.variable} ${schibsted.variable} ${instrumentSerif.variable} antialiased`}>
      <body className="min-h-svh">{children}</body>
    </html>
  );
}
