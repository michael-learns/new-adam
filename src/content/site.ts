import type { SiteSettings } from "./types";

// Production URL resolution: explicit env var first, then the domain Vercel
// assigns to the production deployment, then local development.
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const site: SiteSettings = {
  name: "New Adam",
  descriptor: "Transforming lives through values and culture",
  description:
    "New Adam helps people live out the values that shape a good life, through values formation and trainings for companies and weddings for couples in the Philippines.",
  url: resolveSiteUrl(),
  locale: "en-PH",
  areaServed: "Philippines",
  // No public contact email for now. Set contactEmail when there's a real inbox
  // (and un-hide the "Book"/"Begin" sections in the content files).
  nav: [
    { label: "Values Formation", href: "/values-formation" },
    { label: "Weddings", href: "/weddings" },
    { label: "Our story", href: "/our-story" },
  ],
  social: [],
};
