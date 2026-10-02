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
    "New Adam helps people live out the values that shape a good life, through values formation training for companies and Kairos Events for couples in the Philippines.",
  url: resolveSiteUrl(),
  locale: "en-PH",
  areaServed: "Philippines",
  // TODO: replace with the real inbox before launch.
  contactEmail: "hello@newadam.org",
  nav: [
    { label: "Values Formation", href: "/values-formation" },
    { label: "Kairos Events", href: "/kairos-events" },
    { label: "Our story", href: "/our-story" },
  ],
  social: [],
};
