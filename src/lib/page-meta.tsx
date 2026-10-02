import type { Metadata } from "next";
import type { Page, SiteSettings } from "@/content/types";

/** Title, description, canonical URL and social tags for a content page. */
export function pageMetadata(page: Page): Metadata {
  return {
    title: { absolute: page.seo.title },
    description: page.seo.description,
    alternates: { canonical: page.slug },
    openGraph: { title: page.seo.title, description: page.seo.description, url: page.slug },
  };
}

export function organizationJsonLd(site: SiteSettings) {
  return {
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/logo.png`,
    description: site.description,
    email: site.contactEmail,
    areaServed: { "@type": "Country", name: site.areaServed },
    sameAs: site.social.map((s) => s.href),
  };
}

/** A program page described as a Service offered by New Adam. */
export function serviceJsonLd(site: SiteSettings, page: Page, serviceType: string) {
  return {
    "@type": "Service",
    "@id": `${site.url}${page.slug}#service`,
    name: page.seo.title.split(" | ")[0],
    serviceType,
    description: page.seo.description,
    url: `${site.url}${page.slug}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Country", name: site.areaServed },
  };
}

export function JsonLd({ graph }: { graph: object[] }) {
  const data = { "@context": "https://schema.org", "@graph": graph };
  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
